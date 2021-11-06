import React, { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import _get from 'lodash.get';
import * as Yup from 'yup';

import { WrapFrom, GroupButton } from './Refuse.styles';
import { Button } from 'components/Button/Button';
import { approveProduct } from '../../../redux/product.slice';

const Refuse = ({ item, setItemRefuse, setLoadingRefuse }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      enableReinitialize
      initialValues={{ message: '' }}
      validationSchema={Yup.object().shape({
        message: Yup.string()
          .required('Vui lòng điền nội dung !')
          .max(50, 'Số ký tự đã vượt quá !'),
      })}
      onSubmit={async (values, { resetForm }) => {
        setIsLoading(true);
        const detail = {
          id: item.id,
          status: 0,
          message: values.message,
        };

        const response = await dispatch(approveProduct(detail));
        if (approveProduct.fulfilled.match(response)) {
          toast.success('Từ chối thành công !');
        } else {
          toast.error(_get(response.payload, 'name[0]'));
        }
        setIsLoading(false);
        setItemRefuse(false);
        resetForm({ message: '' });
      }}
    >
      {({ handleChange, handleBlur, values }) => {
        return (
          <Form>
            <WrapFrom>
              <textarea
                name="message"
                className="form-control"
                placeholder="Nội dung..."
                onChange={handleChange}
                onBlur={handleBlur}
                maxlength="51"
                rows="3"
                value={values.message}
              ></textarea>
              <ErrorMessage
                name="message"
                className="error-message"
                component="div"
              />
              <GroupButton>
                <label onClick={() => setItemRefuse(false)}>Hủy</label>
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  loading={isLoading}
                >
                  Đồng ý
                </Button>
              </GroupButton>
            </WrapFrom>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Refuse;
