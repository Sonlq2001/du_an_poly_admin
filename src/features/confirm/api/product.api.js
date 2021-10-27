import api from './../../../api/api';
import { PRODUCT_PATH } from './../constants/confirm.paths';
export const getAll = () => {
  return api.get(PRODUCT_PATH.LIST);
};
export const update = (product) => {
  console.log('produc', product);
};
export const products_Approve = (data) => {
  return api.post(
    PRODUCT_PATH.APPROVE.replace(':id', data.id.toString()),
    data
  );
};
