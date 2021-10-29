import React, { memo, useEffect, useState } from 'react';
import Select from 'react-select';
import { ListProduct } from './../../redux/product.slice';
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
import Loading from 'components/Loading/Loading';
import { unwrapResult } from '@reduxjs/toolkit';
import { getSemesters } from '../../../uploadExcel/redux/uploadExcel.slice';
import { MapOptions } from '../../../../helpers/convert/map-options';
const ConfirmScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { listProduct } = useSelector((state) => state.product);
  const { listSemester } = useSelector((state) => state.uploadExcel);
  const listSelectOptionSemester = MapOptions(listSemester);
  useEffect(() => {
    dispatch(getSemesters());
    dispatch(ListProduct())
      .then(unwrapResult)
      .finally(() => setIsLoading(true));
  }, [dispatch]);
  // change kỳ học
  const HandlerSemester = (data) => {
    console.log('data', data);
  };

  if (!isLoading) {
    <Loading />;
  }
  return (
    <>
      <TitleMain> Danh sách sản phẩm </TitleMain>
      <WrapContent>
        <TitleControl>Tìm kiếm</TitleControl>
        <BoxSearchInput>
          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Tên sản phẩm
            </label>
            <InputSearch
              type="text"
              placeholder="Tìm kiếm"
              className="input-filter input-search"
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
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Kì học
            </label>
            <Select
              className="select-option input-search"
              options={
                ({ label: 'All', value: 1 },
                listSelectOptionSemester ? listSelectOptionSemester : [])
              }
              placeholder="Tìm theo kì học"
              onChange={(e) => HandlerSemester(e)}
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
              options={[
                { label: 'Hà Nội ', value: 1 },
                { label: 'Dà Nẵng', value: 2 },
                { label: 'Tây Nguyên', value: 3 },
                { label: 'Hồ Chí Minh ', value: 4 },
                { label: 'cần Thơ  ', value: 5 },
              ]}
              placeholder="Tìm theo Cơ Sở "
            />
          </BoxControl>

          <BoxControl className="box-control">
            <label htmlFor="" className="label-control">
              Kì học
            </label>
            <Select
              className="select-option input-search"
              options={[
                { label: 'Phê duyệt ', value: 1 },
                { label: 'Đang chờ ', value: 2 },
              ]}
              placeholder="Trạng Thái "
            />
          </BoxControl>
        </BoxSearchInput>
      </WrapContent>
      <ConfirmTable data={listProduct ? listProduct : []} />
    </>
  );
};

export default memo(ConfirmScreen);
