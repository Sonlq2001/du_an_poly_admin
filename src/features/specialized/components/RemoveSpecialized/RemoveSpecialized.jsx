import React from 'react';
import PopupOverlay from './../../../../components/PopupOverlay/PopupOverlay';

import { MessagePopup } from './RemoveSpecialized.styles';

const RemoveSpecialized = ({ item, open, setOpen }) => {
  return (
    <PopupOverlay open={open} setOpen={setOpen} isAction textOk="Đồng ý">
      <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
    </PopupOverlay>
  );
};

export default RemoveSpecialized;