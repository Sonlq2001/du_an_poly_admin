import React, { memo, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { WrapContent, TitleMain } from 'styles/common/common-styles';
import { Button } from 'components/Button/Button';
import ElementInput from 'components/FormElements/ElementInput/ElementInput';
import Loading from 'components/Loading/Loading';

import {
  WrapPage,
  GroupProfile,
  BoxAvatar,
  BoxContent,
  BoxNote,
  FormButton,
  GroupContent,
} from './UserProfile.styles';
import ElementCheckbox from 'components/FormElements/ElementCheckbox/ElementCheckbox';

import { getUserDetail, putUsers } from './../../redux/user.slice';
import avatarEmpty from 'assets/images/empty-avatar.png';
import { getRole } from 'features/role/redux/role.slice';
// import { initForm } from './../../helpers/user.helpers';
import { USER_PATHS } from './../../constants/user.paths';

const UserProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getUserDetail(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);

  const { isItemUserLoading, itemUser, listRole ,superAdmin} = useSelector((state) => ({
    isItemUserLoading: state.user?.isItemUserLoading,
    itemUser: state.user?.itemUser,
    listRole: state.role?.listRole,
    superAdmin: state.auth?.userLogin?.superAdmin,
  }));

  return (
    <>
      {isItemUserLoading && <Loading />}
      <WrapPage>
        <TitleMain>Cập nhập thông tin</TitleMain>
        <Button
          size="small"
          className="btn-go-back"
          icon={<BsArrowLeftShort />}
          onClick={() => history.goBack()}
          color="default"
        >
          Quay lại
        </Button>

        <WrapContent>
          <Formik
            enableReinitialize
            initialValues={itemUser}
            onSubmit={async (values) => {
              setIsLoading(true);
              const actionDispatch = id ? putUsers : putUsers;
              const dataName = values.roles?.map((item) =>
                item?.name ? item.name : item
              );

              const response = await dispatch(
                actionDispatch({
                  id: values.id,
                  user: {
                    role: dataName,
                  },
                })
              );
              if (actionDispatch.fulfilled.match(response)) {
                history.push(USER_PATHS.LIST);
              }
              setIsLoading(false);
            }}
          >
            {() => (
              <Form>
                <GroupProfile>
                  <BoxAvatar>
                    <img
                      src={itemUser?.avatar || avatarEmpty}
                      alt=""
                      className="user-avatar"
                    />
                    <label htmlFor="avatar">
                      <div className="footer-avatar">
                        Upload
                        <span className="icon-camera">
                          <AiOutlineCamera />
                        </span>
                      </div>
                    </label>
                    <input type="file" id="avatar" />

                    <div className="user-des">{itemUser?.description}</div>
                  </BoxAvatar>
                  <GroupContent>
                    <BoxContent>
                      <h4 className="title-profile">Thông tin cá nhân</h4>
                      <ElementInput
                        name="name"
                        label="Họ tên"
                        placeholder="Họ tên"
                        disabled={true}
                      />

                      <ElementInput
                        name="email"
                        label="Email"
                        placeholder="Email"
                        disabled={true}
                      />

                      <ElementInput
                        name="student_code"
                        label="MSSV"
                        placeholder="Mã số"
                        disabled={true}
                      />
                    </BoxContent>

                    <BoxNote>
                      <h4 className="title-profile">Vai trò / vị trí</h4>
                      <div className="group-role">
                        <ElementCheckbox name="roles" data={listRole} superAdmin={superAdmin} />
                      </div>
                    </BoxNote>
                  </GroupContent>
                </GroupProfile>

                <FormButton>
                  <Button
                    color="primary"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Lưu
                  </Button>
                </FormButton>
              </Form>
            )}
          </Formik>
        </WrapContent>
      </WrapPage>
    </>
  );
};

export default memo(UserProfile);
