import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import Select from 'react-select';
import { useParams } from 'react-router';
import { CgSortAz } from 'react-icons/cg';

import {
  getProductType,
  getDetail,
  getListCampuses,
  productUser,
  SearchProduct,
  filterProduct,
  filterStatusProduct,
} from './../../redux/product.slice';

import { useSelector, useDispatch } from 'react-redux';
import {
  WrapContent,
  TitleMain,
  TitleControl,
  BoxControl,
  BoxSearchInput,
  InputSearch,
} from 'styles/common/common-styles';

import ConfirmTable from './../../components/ConfirmTable/ConfirmTable';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import Loading from 'components/Loading/Loading';
import { getSemesters } from '../../../uploadExcel/redux/uploadExcel.slice';
import { MapOptions } from 'helpers/convert/map-options';
import ReviewProduct from 'features/confirm/components/Review/ReviewProduct';
import { defaultPaginationParams } from 'constants/api.constants';

const ConfirmScreen = () => {
  const dispatch = useDispatch();
  const { path } = useParams();

  const {
    listProduct,
    isProductLoading,
    listProductType,
    productDetail,
    loadingDetail,
  } = useSelector((state) => state.product);
  const { useLogin } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);
  const [pagination, setPagination] = useState({
    page: defaultPaginationParams.page,
    pageLength: defaultPaginationParams.pageLength,
  });
  const { listSemester } = useSelector((state) => state.uploadExcel);
  const { listCampuses } = useSelector((state) => state.product);

  const listSelectOptionSemester = MapOptions(listSemester);
  const listSelectOptionCampuses = MapOptions(listCampuses);

  const [SearchName, setName] = useState(null);
  const [result, setResult] = useState(0);
  const [Advanced, SetAdvanced] = useState(false);
  const timeOutString = useRef(null);

  const ProductTypes = useCallback(() => {
    dispatch(getProductType());
  }, [dispatch]);
  const CampusesList = useCallback(() => {
    dispatch(getListCampuses());
  }, [dispatch]);
  const getDataUser = useCallback(() => {
    dispatch(productUser({ user_id: useLogin.id }));
  }, [dispatch, useLogin]);

  useEffect(() => {
    dispatch(getSemesters());
    ProductTypes();
    getDataUser();
    CampusesList();
  }, [dispatch, ProductTypes, CampusesList, getDataUser]);

  useEffect(() => {
    dispatch(getDetail(path));
  }, [dispatch, path]);
  // change trạng thái sp
  const HandlerStatus = async (data) => {
    const response = await dispatch(filterStatusProduct(data.value));
    setResult(1);
    if (filterStatusProduct.fulfilled.match(response)) {
      setResult(2);
    }
  };
  const ChangeSearch = (e) => {
    const value = e.target.value;
    if (!value) {
      setName(value);
      if (timeOutString.current) {
        clearTimeout(timeOutString.current);
      }
      timeOutString.current = setTimeout(async () => {
        const response = await dispatch(productUser({ user_id: useLogin.id }));
        setResult(1);
        if (productUser.fulfilled.match(response)) {
          setResult(2);
        }
      }, 800);
    } else {
      setName(value);
      if (timeOutString.current) {
        clearTimeout(timeOutString.current);
      }
      timeOutString.current = setTimeout(async () => {
        const data = { text: value };
        const response = await dispatch(SearchProduct(data));
        setResult(1);
        if (SearchProduct.fulfilled.match(response)) {
          setResult(2);
        }
      }, 800);
    }
  };
  //
  const Filter = (e, type) => {
    const data = {
      id: e.value,
      type: type,
    };
    dispatch(filterProduct(data));
  };

  return (
    <>
      {/* {isProductLoading && <Loading />} */}
      <TitleMain> Danh sách sản phẩm </TitleMain>
      <WrapContent>
        <div className="titleSearch">
          <TitleControl>Tìm kiếm</TitleControl>
          <span onClick={() => SetAdvanced(!Advanced)}>
            <i className="icon">
              <CgSortAz />
            </i>
            Nâng cao
          </span>
        </div>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Tên sản phẩm
            </label>
            <InputSearch
              type="text"
              placeholder="Tìm kiếm"
              className="input-filter input-search"
              onKeyUp={(e) => ChangeSearch(e)}
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Chủ nhiệm
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Quản trị', value: 1 },
                { label: 'Giáo vụ', value: 2 },
                { label: 'Giảng viên', value: 3 },
                { label: 'Sinh viên', value: 4 },
              ]}
              placeholder="Tìm theo chủ nhiệm"
              onChange={(e) => Filter(e, 'major')}
            />
          </BoxControl>
        </BoxSearchInput>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Bộ môn
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Quản trị', value: 1 },
                { label: 'Giáo vụ', value: 2 },
                { label: 'Giảng viên', value: 3 },
                { label: 'Sinh viên', value: 4 },
              ]}
              placeholder="Tìm theo bộ môn"
              onChange={(e) => Filter(e, 'master_user')}
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Kì học
            </label>
            <Select
              className="select-option input-search"
              options={
                listSelectOptionSemester ? listSelectOptionSemester : []
              }
              placeholder="Tìm theo kì học"
              onChange={(e) => Filter(e, 'semester')}
            />
          </BoxControl>
        </BoxSearchInput>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Cơ sở
            </label>
            <Select
              className="select-option input-search"
              options={listSelectOptionCampuses}
              placeholder="Tìm theo Cơ Sở "
              onChange={(e) => Filter(e, 'campus')}
            />
          </BoxControl>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Trạng thái
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Giảng viên phê duyệt ', value: 1 },
                { label: 'Chủ nhiệm phê duyệt ', value: 2 },
                { label: 'Chưa thêm ', value: 0 },
                { label: 'Phê duyệt ', value: 3 },
              ]}
              placeholder="Trạng Thái "
              onChange={(e) => HandlerStatus(e)}
            />
          </BoxControl>
        </BoxSearchInput>
      </WrapContent>

      <ConfirmTable
        result={result}
        data={listProduct}
        listProductType={listProductType}
        productDetail={productDetail}
        pagination={pagination}
        setPagination={setPagination}
      />
      {loadingDetail ? (
        <>
          {productDetail !== undefined && (
            <PopupOverlay
              open={open}
              setOpen={setOpen}
              size="xl"
              title="Chi Tiết Sản Phẩm "
              scroll
            >
              <ReviewProduct
                data={productDetail && productDetail}
                setOpen={setOpen}
              />
            </PopupOverlay>
          )}
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default memo(ConfirmScreen);
