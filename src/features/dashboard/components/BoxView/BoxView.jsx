import React, { memo } from 'react';
import { IoMdCloudDownload } from 'react-icons/io';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FiUserCheck } from 'react-icons/fi';

import { WrapBoxView, BoxViewItem } from './BoxView.styles';

const BoxView = ({ totalComment ,total_users}) => {
  return (
    <WrapBoxView>
      <BoxViewItem>
        <div className="box-icon icon-download">
          <IoMdCloudDownload />
        </div>
        <div className="box-body">
          <div className="box-title">Downloads</div>
          <div className="box-view">114,381</div>
        </div>
      </BoxViewItem>
      <BoxViewItem>
        <div className="box-icon icon-comment">
          <BsFillChatDotsFill />
        </div>
        <div className="box-body">
          <div className="box-title">Comments</div>
          <div className="box-view">{totalComment ?? 0}</div>
        </div>
      </BoxViewItem>
      <BoxViewItem>
        <div className="box-icon icon-comment">
          <FiUserCheck />
        </div>
        <div className="box-body">
          <div className="box-title">Thành viên </div>
          <div className="box-view">{total_users ?? 0}</div>
        </div>
      </BoxViewItem>
    </WrapBoxView>
  );
};

export default memo(BoxView);
