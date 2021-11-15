import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';

import {
  TableCustom,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from 'components/Table/TableCustom';

import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
  HeaderTable,
  BoxActionTable,
  GroupPagination,
  EmptyResult,
} from 'styles/common/common-styles';
import Loading from 'components/Loading/Loading';
import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';

import GroupAlert from 'components/AlertMessage/AlertMessage';
import ActionMajors from './../components/ActionMajors/ActionMajors';
import RemoveMajors from './../components/RemoveMajors/RemoveMajors';
import { initForm } from './../helpers/majors.helpers';
import { getMajors, removeMajors } from './../redux/majors.slice';
import EmptyResultImage from 'assets/images/empty-result.gif';
import { toast } from 'react-toastify';

const headerCells = [
  { label: 'STT', field: 'id', sort: true },
  { label: 'Tên Chuyên Ngành', field: 'id', sort: true },
  { label: 'Thao tác', field: 'id', sort: false, align: 'right' },
];

const MajorsScreen = () => {
  const dispatch = useDispatch();
  const [isDialogActionMajor, setIsDialogActionMajor] = useState(false);
  const [itemMajors, setItemMajors] = useState(initForm);
  const [isDialogDeleteMajor, setIsDialogDeleteMajor] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(() => {
    dispatch(getMajors());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const { listMajors, isMajorsLoading } = useSelector((state) => state.majors);

  const isCheckedAll = useMemo(() => {
    return listMajors.every((i) => listChecked.includes(i.id));
  }, [listMajors, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(new Set([...listChecked, ...listMajors.map((i) => i.id)]))
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listMajors.find((i) => i.id === id))
      );
    }
  };

  const handleChangeChecked = (itemId) => {
    if (listChecked.includes(itemId)) {
      setListChecked(listChecked.filter((id) => id !== itemId));
    } else {
      setListChecked([...listChecked, itemId]);
    }
  };

  const handleRemoveAll = () => {
    listChecked.forEach(async (id) => {
      setIsLoading(true);
      const response = await dispatch(removeMajors(id));
      if (removeMajors.fulfilled.match(response)) {
        toast.success('Xóa thành công !');
      } else {
        toast.error('Xóa thất bại !');
      }
      setIsLoading(false);
      setListChecked([]);
    });
  };

  if (isMajorsLoading) {
    return <Loading />;
  }
  return (
    <>
      <TitleMain>Chuyên ngành</TitleMain>
      <WrapContent>
        <TitleControl>Tìm kiếm</TitleControl>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Tên
            </label>
            <InputSearch
              type="text"
              placeholder="Tìm kiếm"
              className="input-filter input-search"
            />
          </BoxControl>
        </BoxSearchInput>
      </WrapContent>

      <WrapContent>
        <HeaderTable>
          <Button
            disabled={!listChecked.length || isLoading}
            loading={isLoading}
            onClick={handleRemoveAll}
          >
            Xóa tất cả
          </Button>
          <Button
            icon={<IoMdAdd />}
            color="primary"
            onClick={() => {
              setIsDialogActionMajor(true);
              setItemMajors(initForm);
            }}
          >
            Thêm
          </Button>
        </HeaderTable>

        {listMajors && listMajors.length > 0 ? (
          <>
            <TableCustom>
              <Thead>
                <Tr>
                  <Th>
                    <CheckboxSingle
                      checked={isCheckedAll}
                      onChange={(e) => handleCheckedAll(e.target.checked)}
                    />
                  </Th>
                  {headerCells.map((cell) => (
                    <Th key={cell.label} sort={cell.sort} align={cell.align}>
                      {cell.label}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {listMajors.map((item, index) => (
                  <Tr key={item.id}>
                    <Td>
                      <CheckboxSingle
                        checked={listChecked.includes(item.id)}
                        onChange={() => handleChangeChecked(item.id)}
                      />
                    </Td>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>
                      <BoxActionTable>
                        <Button
                          color="warning"
                          icon={<MdModeEdit />}
                          size="small"
                          onClick={() => {
                            setIsDialogActionMajor(true);
                            setItemMajors(item);
                          }}
                        />
                        <Button
                          color="danger"
                          size="small"
                          icon={<BsTrash />}
                          onClick={() => {
                            setIsDialogDeleteMajor(true);
                            setItemMajors(item);
                          }}
                        />
                      </BoxActionTable>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </TableCustom>
            <GroupPagination>
              <TablePagination
                pageLengthMenu={[20, 50, 100]}
                page={1}
                pageLength={listMajors.length}
                totalRecords={100}
                onPageChange={() => null}
              />
            </GroupPagination>
          </>
        ) : (
          <EmptyResult>
            <div>Không có kết quả nào</div>
            <img src={EmptyResultImage} alt="" />
          </EmptyResult>
        )}
      </WrapContent>

      {/* overlay edit and add */}
      <PopupOverlay
        open={isDialogActionMajor}
        setOpen={setIsDialogActionMajor}
        title={itemMajors?.id ? 'Sửa Chuyên Ngành' : 'Thêm Chuyên Ngành '}
      >
        <ActionMajors item={itemMajors} setOpen={setIsDialogActionMajor} />
      </PopupOverlay>

      {/* overlay remove */}
      <RemoveMajors
        item={itemMajors}
        open={isDialogDeleteMajor}
        setOpen={setIsDialogDeleteMajor}
      />

      {/* alert message */}
      <GroupAlert />
    </>
  );
};
export default memo(MajorsScreen);
