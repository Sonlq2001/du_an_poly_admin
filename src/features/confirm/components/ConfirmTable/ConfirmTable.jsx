import React, { memo, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BiExit, BiDotsVerticalRounded } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';
import _get from 'lodash.get';

import { WrapContent, GroupPagination } from 'styles/common/common-styles';
import {
  TableCustom,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from 'components/Table/TableCustom';
import { TablePagination } from 'components/Pagination/Pagination';
import {
  GroupAction,
  BoxMain,
  ListAction,
  GroupStudent,
} from './ConfirmTable.styles';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import ReviewProduct from './../Review/ReviewProduct';
import RemoveProduct from './../RemoveProduct/RemoveProduct';
import { useDispatch, useSelector } from 'react-redux';
import {
  postProductApprove,
  putProductChairmanApproved,
} from '../../redux/product.slice';
import GroupAlert from 'components/AlertMessage/AlertMessage';
import Refuse from '../ActionProduct/refuse/Refuse';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import NotFound from 'components/NotFound/NotFound';
import Loading from 'components/Loading/Loading';
import HightLightText from 'components/HightLightText/HightLightText';
import {
  labelStatusProduct,
  valueStatusProduct,
} from 'constants/app.constants';

const ConfirmTable = ({ result, setPagination, pagination }) => {
  const dispatch = useDispatch();
  const { userLogin, listProductUser, isListProductUser, listSemester } =
    useSelector((state) => ({
      userLogin: state.auth?.userLogin,
      listProductUser: state.product?.listProductUser,
      isListProductUser: state.product?.isListProductUser,
      listSemester: state.semester?.listSemester,
    }));

  const [open, setOpen] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [itemRemove, setItemRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [refuse, setRefuse] = useState(null);
  const [itemRefuse, setItemRefuse] = useState(false);
  const [isShowAction, setIsShowAction] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    subject: '',
    description: '',
  });

  const handlePagination = (dataPagination) => {
    setPagination({
      ...pagination,
      ...dataPagination,
    });
  };

  const handleReviewProduct = (item) => {
    setProduct(item);
    setOpen(!open);
  };

  const handleRemoveProduct = (item) => {
    setOpenRemove(true);
    setItemRemove(item);
    setIsShowAction(null);
  };

  const handleConfirm = async (item) => {
    setIsLoading(true);
    setDisableButton(true);

    const actionDispatch =
      item?.status === 1 ? postProductApprove : putProductChairmanApproved;
    const response = await dispatch(
      actionDispatch({
        id: item?.id,
        status: item?.status + 1,
        message: null,
      })
    );
    if (actionDispatch.fulfilled.match(response)) {
      toast.success('Ch???p nh???n th??nh c??ng !');
    } else {
      toast.error(_get(response.payload, 'status[0]'));
    }
    setIsShowAction(null);
    setIsLoading(false);
    setDisableButton(false);
  };

  const handleRefuse = (item) => {
    setRefuse(item);
    setItemRefuse(true);
  };
  // sort
  const { dataSort, requestSort } = useSortableData(listProductUser ?? []);

  return (
    <WrapContent>
      {isListProductUser && <Loading />}
      <BoxMain>
        {result === 2 && (
          <div className="messengers">
            K???t qu??? t??m ki???m :{/* {listProduct ? listProduct.length : '0'} */}
          </div>
        )}

        {listProductUser && listProductUser.length > 0 ? (
          <>
            <TableCustom className="table-confirm">
              <Thead>
                <Tr>
                  <Th sort onClick={() => requestSort('id')}>
                    #
                  </Th>
                  <Th sort onClick={() => requestSort('name')}>
                    T??n ????? t??i
                  </Th>
                  <Th sort onClick={() => requestSort('class')}>
                    L???p
                  </Th>
                  <Th sort onClick={() => requestSort('subject_id')}>
                    M??n
                  </Th>
                  <Th sort onClick={() => requestSort('semester_id')}>
                    K??? h???c
                  </Th>
                  <Th>Th??nh vi??n</Th>
                  <Th>Chuy??n ng??nh</Th>
                  <Th>C?? s???</Th>
                  <Th>Tr???ng th??i</Th>
                  <Th align="right">Thao t??c</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataSort.map((row) => {
                  let statusProduct = null;
                  switch (row?.status) {
                    case valueStatusProduct.one:
                      statusProduct = labelStatusProduct.confirm1;
                      break;
                    case valueStatusProduct.two:
                      statusProduct = labelStatusProduct.confirm2;
                      break;
                    case valueStatusProduct.three:
                      statusProduct = labelStatusProduct.done;
                      break;
                    default:
                      break;
                  }

                  let nameCampus = null;
                  switch (row?.campus_id) {
                    case 1:
                      nameCampus = 'H?? N???i';
                      break;
                    case 2:
                      nameCampus = '???? n???ng';
                      break;
                    case 3:
                      nameCampus = 'C???n Th??';
                      break;
                    case 4:
                      nameCampus = 'H??? Ch?? Minh';
                      break;
                    case 5:
                      nameCampus = 'T??y Nguy??n';
                      break;
                    default:
                      break;
                  }

                  const isConfirm1 =
                    row?.status === 1 &&
                    row?.teacher_id === userLogin?.id &&
                    userLogin?.teacher &&
                    userLogin?.major_id === row?.major?.id &&
                    userLogin?.campus_id === row?.campus_id;

                  const isConfirm2 =
                    row?.status === 2 &&
                    row?.master_user === userLogin?.id &&
                    userLogin?.facultyChairman &&
                    userLogin?.major_id === row?.major?.id &&
                    userLogin?.campus_id === row?.campus_id;

                  const isEdit =
                    (userLogin?.id === row?.teacher_id ||
                      userLogin?.id === row?.master_user) &&
                    (userLogin?.facultyChairman || userLogin?.teacher) &&
                    userLogin?.major_id === row?.major?.id &&
                    row?.status !== 3 &&
                    userLogin?.campus_id === row?.campus_id;

                  const isRefuse =
                    (userLogin?.id === row?.teacher_id ||
                      userLogin?.id === row?.master_user) &&
                    (userLogin?.teacher || userLogin?.facultyChairman) &&
                    userLogin?.major_id === row?.major?.id &&
                    (row?.status === 1 || row?.status === 2) &&
                    userLogin?.campus_id === row?.campus_id;

                  const isDeleted =
                    (userLogin?.id === row?.teacher_id ||
                      userLogin?.id === row?.master_user) &&
                    (userLogin?.teacher || userLogin?.facultyChairman) &&
                    userLogin?.major_id === row?.major?.id &&
                    userLogin?.campus_id === row?.campus_id;

                  return (
                    <Tr key={row?.id}>
                      <Td> {row?.id}</Td>
                      <Td>{row?.name} </Td>
                      <Td>{row?.class?.toUpperCase()} </Td>
                      <Td>{row?.subject?.name} </Td>
                      <Td>
                        {
                          listSemester?.find(
                            (item) => item?.id === row?.semester_id
                          )?.name
                        }
                      </Td>
                      <Td>
                        <GroupStudent>
                          {row?.students?.map((element, index) => {
                            return (
                              <div key={index}>
                                {element?.name} - {element?.student_code},
                              </div>
                            );
                          })}
                        </GroupStudent>
                      </Td>
                      <Td>{row?.major?.name}</Td>
                      <Td>
                        <span className="nowrap">{nameCampus}</span>
                      </Td>
                      <Td>
                        <HightLightText status={row?.status}>
                          {statusProduct}
                        </HightLightText>
                      </Td>
                      <Td>
                        <GroupAction>
                          <span
                            className="show-action"
                            onClick={() => setIsShowAction(row?.id)}
                          >
                            <BiDotsVerticalRounded />
                          </span>

                          {row?.id === isShowAction && (
                            <OutsideClickHandler
                              onOutsideClick={() => setIsShowAction(null)}
                            >
                              <ListAction>
                                {isConfirm1 && (
                                  <button
                                    disabled={disableButton}
                                    className="item-action"
                                    onClick={() => handleConfirm(row)}
                                  >
                                    {isLoading ? (
                                      <span className="loader" />
                                    ) : (
                                      <span className="icon-action">
                                        <FiCheck />
                                      </span>
                                    )}
                                    Ch???p nh???n l???n 1
                                  </button>
                                )}

                                {isConfirm2 && (
                                  <button
                                    className="item-action"
                                    disabled={disableButton}
                                    onClick={() => handleConfirm(row)}
                                  >
                                    {isLoading ? (
                                      <span className="loader"></span>
                                    ) : (
                                      <span className="icon-action">
                                        <FiCheck />
                                      </span>
                                    )}
                                    Ch???p nh???n l???n 2
                                  </button>
                                )}

                                <div
                                  className="item-action"
                                  onClick={() => {
                                    handleReviewProduct(row);
                                    setOpen(true);
                                    setIsShowAction(null);
                                  }}
                                >
                                  <span className="icon-action">
                                    <AiOutlineEye />
                                  </span>
                                  Xem tr?????c
                                </div>

                                {isEdit && (
                                  <div className="item-action">
                                    <span className="icon-action">
                                      <MdModeEdit />
                                    </span>
                                    <Link to={`/product/update/${row.id}`}>
                                      S???a
                                    </Link>
                                  </div>
                                )}

                                {isRefuse && (
                                  <button
                                    disabled={disableButton}
                                    className="item-action "
                                    onClick={() =>
                                      handleRefuse(row) +
                                      setDisableButton(true) +
                                      setIsShowAction(null)
                                    }
                                  >
                                    <span className="icon-action">
                                      <BiExit />
                                    </span>
                                    T??? ch???i
                                  </button>
                                )}

                                {isDeleted && (
                                  <div
                                    className="item-action"
                                    onClick={() => handleRemoveProduct(row)}
                                  >
                                    <span className="icon-action">
                                      <RiDeleteBinFill />
                                    </span>
                                    X??a
                                  </div>
                                )}
                              </ListAction>
                            </OutsideClickHandler>
                          )}
                        </GroupAction>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </TableCustom>
            <GroupPagination>
              <TablePagination
                pageLengthMenu={[10, 20, 50, 100]}
                page={pagination.page}
                pageLength={pagination.pageLength}
                totalRecords={100}
                onPageChange={handlePagination}
              />
            </GroupPagination>
          </>
        ) : (
          <NotFound />
        )}
      </BoxMain>

      {/* chi ti???t s???n ph???m  */}
      <PopupOverlay
        open={open}
        setOpen={setOpen}
        size="xl"
        title="Chi Ti???t S???n Ph???m "
        scroll
        setDisableButton={setDisableButton}
      >
        <ReviewProduct data={product} setOpen={setOpen} />
      </PopupOverlay>

      {/* x??a s???n ph???m  */}
      <RemoveProduct
        open={openRemove}
        setOpen={setOpenRemove}
        item={itemRemove}
      />
      {/* t??? tr???i s???n ph???m  */}
      <PopupOverlay
        open={itemRefuse}
        setOpen={setItemRefuse}
        size="md"
        title="L?? do"
        setDisableButton={setDisableButton}
      >
        <Refuse
          item={refuse}
          setItemRefuse={setItemRefuse}
          setDisableButton={setDisableButton}
        />
      </PopupOverlay>

      <GroupAlert />
    </WrapContent>
  );
};

export default memo(ConfirmTable);
