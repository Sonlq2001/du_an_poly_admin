import api from './../../../api/api';
const getUser = () => {
  return api.get('/users');
};
export const getApiUser = {
  getUser,
};
