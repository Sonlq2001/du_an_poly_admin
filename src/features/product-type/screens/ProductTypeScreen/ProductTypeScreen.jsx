import React, { memo, useEffect, useState, useMemo } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { toast } from 'react-toastify';

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

import { Button } from 'components/Button/Button';
import { TablePagination } from 'components/Pagination/Pagination';
import Loading from 'components/Loading/Loading';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import GroupAlert from 'components/AlertMessage/AlertMessage';
import CheckboxSingle from 'components/FormElements/ElementCheckbox/CheckboxSingle';

import {
  getProductType,
  deleteProductType,
} from './../../redux/product-type.slice';
import EmptyResultImage from 'assets/images/empty-result.gif';
import { initForm } from './../../helpers/product-type.helpers';
import ActionProductType from './../../components/ActionProductType/ActionProductType';
import RemoveProductType from './../../components/RemoveProductType/RemoveProductType';

const ProductTypeScreen = () => {
  const dispatch = useDispatch();
  const [itemProductType, setItemProductType] = useState(initForm);
  const [isDialogProductType, setIsDialogProductType] = useState(false);
  const [isDialogProductTypeRemove, setIsDialogProductTypeRemove] =
    useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getProductType());
  }, [dispatch]);

  const { listProductType, isListProductTypeLoading } = useSelector(
    (state) => state.productType
  );

  const isCheckedAll = useMemo(() => {
    return listProductType && listProductType.every((i) => listChecked.includes(i.id));
  }, [listProductType, listChecked]);

  const handleCheckedAll = (isChecked) => {
    if (isChecked) {
      setListChecked(
        Array.from(
          new Set([...listChecked, ...listProductType.map((i) => i.id)])
        )
      );
    } else {
      setListChecked(
        listChecked.filter((id) => !listProductType.find((i) => i.id === id))
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
      const response = await dispatch(deleteProductType(id));
      if (deleteProductType.fulfilled.match(response)) {
        toast.success('Xóa thành công !');
      } else {
        toast.error('Xóa thất bại !');
      }
      setIsLoading(false);
      setListChecked([]);
    });
  };

  if (isListProductTypeLoading) {
    return <Loading />;
  }

  return (
    <>
      <TitleMain>Danh mục</TitleMain>
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
        <div className="resultSeach">
            {/* {messengerSort && (
              <span>
                Kết quả : &nbsp; {messengerSort} ( {listSubject.length} )
              </span>
            )} */}
          </div>
          <div className="buttonAction">
          <Button
            disabled={!listChecked.length || isLoading}
            onClick={handleRemoveAll}
            Loading={isLoading}
          >
            Xóa tất cả
          </Button>
          <Button
            icon={<IoMdAdd />}
            color="primary"
            onClick={() => {
              setIsDialogProductType(true);
              setItemProductType(initForm);
            }}
          >
            Thêm
          </Button>
          </div>
        </HeaderTable>

        {listProductType && listProductType.length > 0 ? (
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
                  <Th sort>STT</Th>
                  <Th sort>Tên Danh Mục</Th>
                  <Th align="right">Thao tác</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listProductType.map((row, index) => (
                  <Tr key={row.id}>
                    <Td>
                      <CheckboxSingle
                        checked={listChecked.includes(row.id)}
                        onChange={() => handleChangeChecked(row.id)}
                      />
                    </Td>
                    <Td>{index + 1}</Td>
                    <Td>{row.name}</Td>
                    <Td>
                      <BoxActionTable>
                        <Button
                          color="warning"
                          icon={<MdModeEdit />}
                          size="small"
                          onClick={() => {
                            setItemProductType(row);
                            setIsDialogProductType(true);
                          }}
                        />
                        <Button
                          color="danger"
                          size="small"
                          icon={<BsTrash />}
                          onClick={() => {
                            setItemProductType(row);
                            setIsDialogProductTypeRemove(true);
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
                pageLength={10}
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

        {/* Dialog create / edit product type */}
        <PopupOverlay
          open={isDialogProductType}
          setOpen={setIsDialogProductType}
          title={itemProductType?.id ? 'Sửa Danh Mục' : 'Thêm Danh Mục '}
        >
          <ActionProductType
            item={itemProductType}
            setOpen={setIsDialogProductType}
          />
        </PopupOverlay>

        {/* overlay remove */}
        <RemoveProductType
          item={itemProductType}
          open={isDialogProductTypeRemove}
          setOpen={setIsDialogProductTypeRemove}
        />
      </WrapContent>
      <GroupAlert />
    </>
  );
};

export default memo(ProductTypeScreen);
