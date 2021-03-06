import React, { memo } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import { TiShoppingCart } from 'react-icons/ti';

import { useSelector } from 'react-redux';
import { ListBoxCard, ItemCard } from './BoxCard.styles';

const BoxCard = () => {
  const {totalProduct,total_product_not_approved_yet, total_product_student_has_not_posted} = useSelector(
    (state) => ({
      dataViewChart: state.dashboard?.dataViewChart,
      totalProduct: state.dashboard?.totalProduct,
      totalComment: state.dashboard?.totalComment,
      total_product_not_approved_yet: state.dashboard?.total_product_not_approved_yet,
      total_product_student_has_not_posted: state.dashboard?.total_product_student_has_not_posted,
    })
  );
  return (
    <ListBoxCard>
      <ItemCard>
        <div className="card-left">
          <div className="card-total">{totalProduct}</div>
          <div className="card-title"> Đã phê duyệt </div>
        </div>
        <div className="card-right ">
          <FaShoppingBag />
        </div>
      </ItemCard>
      <ItemCard>
        <div className="card-left">
          <div className="card-total">{total_product_not_approved_yet}</div>
          <div className="card-title">Đang chờ phê duyệt </div>
        </div>
        <div className="card-right blue">
          <MdAddShoppingCart />
        </div>
      </ItemCard>

      <ItemCard>
        <div className="card-left">
          <div className="card-total">{total_product_student_has_not_posted}</div>
          <div className="card-title"> Chờ sinh viên thêm </div>
          
        </div>
        <div className="card-right student">
          <TiShoppingCart />
        </div>
      </ItemCard>
    </ListBoxCard>
  );
};

export default memo(BoxCard);
