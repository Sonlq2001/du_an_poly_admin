import React from 'react';
import { Formik } from 'formik';
import { AiOutlineSave } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

import { ContentForm, GroupAction } from './ActionRole.styles';
import { schema } from '../../helpers/role.helpers';
import ElementInput from '../../../../components/FormElements/ElementInput/ElementInput';
import { Button } from '../../../../components/Button/Button';
import { postRole, putRole } from './../../redux/role.slice';

const ActionRole = ({ item, setOpen }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={item}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          if (item?.name === '') {
            dispatch(postRole(values))
              .then(unwrapResult)
              .then(() => toast.success('Thêm thành công !'))
              .catch((error) => toast.error(error.name[0]))
              .finally(() => {
                setOpen(false);
                resetForm();
              });
          } else {
            dispatch(putRole(values))
              .then(unwrapResult)
              .then(() => toast.success('Sửa thành công !'))
              .catch((error) => toast.error(error.name[0]))
              .finally(() => {
                resetForm();
                setOpen(false);
              });
          }
        }}
      >
        {({ handleSubmit }) => {
          return (
            <ContentForm>
              <div className="from-group">
                <label htmlFor="">Kỳ học</label>
                <ElementInput
                  type="text"
                  placeholder="Tên kỳ học"
                  name="name"
                />
              </div>

              <GroupAction>
                <Button
                  size="medium"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Hủy
                </Button>
                <Button
                  size="medium"
                  color="primary"
                  icon={<AiOutlineSave />}
                  type="submit"
                  onClick={() => handleSubmit()}
                >
                  Lưu
                </Button>
              </GroupAction>
            </ContentForm>
          );
        }}
      </Formik>
    </>
  );
};

export default ActionRole;