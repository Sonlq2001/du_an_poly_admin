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

import { WrapContent } from 'styles/common/common-styles';
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
  GroupPagination,
  GroupAction,
  BoxMain,
  ListAction,
} from './ConfirmTable.styles';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import ReviewProduct from './../Review/ReviewProduct';
import RemoveProduct from './../RemoveProduct/RemoveProduct';
import { useDispatch, useSelector } from 'react-redux';
import { approveProduct } from '../../redux/product.slice';
import GroupAlert from 'components/AlertMessage/AlertMessage';
import Refuse from '../ActionProduct/refuse/Refuse';
import { useSortableData } from 'helpers/sortingTable/sortingTable';
import NotFound from 'components/NotFound/NotFound';
import Loading from 'components/Loading/Loading';

const ConfirmTable = ({ result, setPagination, pagination }) => {
  const dispatch = useDispatch();
  const { listProduct, isProductLoading, useLogin } = useSelector((state) => ({
    listProduct: state.product?.listProduct,
    isProductLoading: state.product?.isProductLoading,
    useLogin: state.auth?.useLogin,
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

  const review = (item) => {
    setProduct(item);
    setOpen(!open);
  };

  const removeProduct = (item) => {
    setOpenRemove(true);
    setItemRemove(item);
  };

  const handleConfirm = async (item) => {
    setIsLoading(true);
    setDisableButton(true);
    const productUpdateStatus = {
      id: item.id,
      status: item.status + 1,
      message: null,
    };
    const response = await dispatch(approveProduct(productUpdateStatus));
    if (approveProduct.fulfilled.match(response)) {
      toast.success('Chấp nhận thành công !');
    } else {
      toast.error(_get(response.payload, 'name[0]'));
    }
    setIsLoading(false);
    setDisableButton(false);
  };

  const handleRefuse = (item) => {
    setRefuse(item);
    setItemRefuse(true);
  };
  // sort
  const { dataSort, requestSort } = useSortableData(
    listProduct ? listProduct : []
  );
  return (
    <WrapContent>
      {isProductLoading && <Loading />}
      <BoxMain>
        {result === 2 && (
          <div className="messengers">
            Kết quả tìm kiếm : {listProduct ? listProduct.length : '0'}
          </div>
        )}

        {listProduct && dataSort?.length > 0 ? (
          <>
            <TableCustom className="table-confirm">
              <Thead>
                <Tr>
                  <Th sort onClick={() => requestSort('id')}>
                    STT
                  </Th>
                  <Th sort onClick={() => requestSort('name')}>
                    Tên đề tài
                  </Th>
                  <Th sort onClick={() => requestSort('class')}>
                    Lớp
                  </Th>
                  <Th sort onClick={() => requestSort('subject')}>
                    Môn
                  </Th>
                  <Th className="fix-th" sort>
                    Kỳ học
                  </Th>
                  <Th sort onClick={() => requestSort('students')}>
                    Thành viên
                  </Th>
                  <Th align="right">Thao tác</Th>
                </Tr>
              </Thead>

              <Tbody>
                {dataSort.map((item) => {
                  return (
                    <Tr key={item?.id}>
                      <Td> {item?.id}</Td>
                      <Td>{item?.name} </Td>
                      <Td>{item?.class} </Td>
                      <Td>{item?.subject?.name} </Td>
                      <Td> </Td>
                      <Td>
                        {item?.students?.map((element, index) => {
                          return (
                            <li key={index}>
                              {element?.name} - {element?.student_code}
                            </li>
                          );
                        })}
                      </Td>
                      <Td>
                        <GroupAction>
                          <span
                            className="show-action"
                            onClick={() => setIsShowAction(item?.id)}
                          >
                            <BiDotsVerticalRounded />
                          </span>

                          {item?.id === isShowAction && (
                            <OutsideClickHandler
                              onOutsideClick={() => setIsShowAction(null)}
                            >
                              <ListAction>
                                {/* chấp nhận  */}
                                {item.status === 1 && (
                                  // giảng viên phê duyệt
                                  <button
                                    disabled={
                                      useLogin.id === item.teacher_id &&
                                      !disableButton
                                        ? false
                                        : true
                                    }
                                    className="item-action"
                                    onClick={() => handleConfirm(item)}
                                  >
                                    {isLoading ? (
                                      <span className="loader"></span>
                                    ) : (
                                      <span className="icon-action">
                                        <FiCheck />
                                      </span>
                                    )}
                                    Chấp nhận lần 1
                                  </button>
                                )}
                                {item.status === 2 && (
                                  // chủ nhiệm phê duyệt
                                  <button
                                    className="item-action"
                                    disabled={!disableButton ? false : true}
                                    onClick={() => handleConfirm(item)}
                                  >
                                    {isLoading ? (
                                      <span className="loader"></span>
                                    ) : (
                                      <span className="icon-action">
                                        <FiCheck />
                                      </span>
                                    )}
                                    Chấp nhận lần 2
                                  </button>
                                )}

                                {/* xem trươcs */}
                                <div
                                  className="item-action"
                                  onClick={() => {
                                    review(item);
                                    setOpen(true);
                                  }}
                                >
                                  <span className="icon-action">
                                    <AiOutlineEye />
                                  </span>
                                  Xem trước
                                </div>
                                {/* cập nhật  */}
                                <div className="item-action">
                                  <span className="icon-action">
                                    <MdModeEdit />
                                  </span>
                                  <Link to={`/product/update/${item.id}`}>
                                    {' '}
                                    Sửa
                                  </Link>
                                </div>
                                {/* từ trối */}
                                {item.status === 1 && (
                                  <button
                                    disabled={
                                      useLogin.id === item.teacher_id &&
                                      !disableButton
                                        ? false
                                        : true
                                    }
                                    className="item-action "
                                    onClick={() =>
                                      handleRefuse(item) +
                                      setDisableButton(true)
                                    }
                                  >
                                    <span className="icon-action">
                                      <BiExit />
                                    </span>
                                    Từ chối
                                  </button>
                                )}
                                {item.status === 2 && (
                                  <button
                                    disabled={
                                      useLogin.id === item.teacher_id &&
                                      !disableButton
                                        ? false
                                        : false
                                    }
                                    className="item-action "
                                    onClick={() =>
                                      handleRefuse(item) +
                                      setDisableButton(true)
                                    }
                                  >
                                    <span className="icon-action">
                                      <BiExit />
                                    </span>
                                    Từ chối
                                  </button>
                                )}
                                {
                                  item.status === 3 && ''
                                  // <button
                                  //   disabled={!disableButton ? false : true}
                                  //   hidden={true}
                                  //   className="item-action "
                                  //   onClick={() =>
                                  //     handleRefuse(item) + setDisableButton(true)
                                  //   }
                                  // >
                                  //   <span className="icon-action">
                                  //     <BiExit />
                                  //   </span>
                                  //   Từ chối
                                  // </button>
                                }

                                {/* xóa  */}
                                <div
                                  className="item-action"
                                  onClick={() => removeProduct(item)}
                                >
                                  <span className="icon-action">
                                    <RiDeleteBinFill />
                                  </span>
                                  Xóa
                                </div>
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

      {/* chi tiết sản phẩm  */}
      <PopupOverlay
        open={open}
        setOpen={setOpen}
        size="xl"
        title="Chi Tiết Sản Phẩm "
        scroll
        setDisableButton={setDisableButton}
      >
        <ReviewProduct data={product} setOpen={setOpen} />
      </PopupOverlay>

      {/* xóa sản phẩm  */}
      <RemoveProduct
        open={openRemove}
        setOpen={setOpenRemove}
        item={itemRemove}
      />
      {/* từ trối sản phẩm  */}
      <PopupOverlay
        open={itemRefuse}
        setOpen={setItemRefuse}
        size="md"
        title="Lý do ?"
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
