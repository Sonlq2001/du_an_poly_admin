import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import _get from 'lodash.get';

import { removeCategorySubject } from '../../redux/category_subject.slice';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveSubject.styles';

const RemoveSubject = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();

  const handleRemove = async () => {
    const response = await dispatch(removeCategorySubject(item?.id));
    if (removeCategorySubject.fulfilled.match(response)) {
      toast.success('Xóa thành công !');
    } else {
      toast.error(_get(response.payload, 'name[0]'));
    }
    setOpen(false);
  };

  return (
    <PopupOverlay
      open={open}
      setOpen={setOpen}
      onOk={handleRemove}
      isAction
      textOk="Đồng ý"
    >
      <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
    </PopupOverlay>
  );
};

export default RemoveSubject;
