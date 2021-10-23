import { BsBag, BsChat } from 'react-icons/bs';
import { FiBookOpen, FiUsers, FiType } from 'react-icons/fi';
import { MdMailOutline } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RiSettings4Line } from 'react-icons/ri';
import { BiBookAlt, BiSitemap } from 'react-icons/bi';

import { CONFIRM_PATH } from './../features/confirm/constants/confirm.paths';
import { MAJORS_PATH } from './../features/majors/constants/majors.paths';
import { SUBJECT_PATH } from './../features/subject/constants/subject.paths';
import { UPLOAD_EXCEL_PATH } from './../features/uploadExcel/constants/upload-excel.paths';
import { USER_PATH } from './../features/user/constants/user.paths';
import { FEEDBACK_PATH } from './../features/feedback/constants/feedback.paths';
import { PRODUCT_TYPE_PATH } from './../features/product-type/constants/product-type.paths';
import { SEMESTER_PATH } from './../features/semester/constants/semester.paths';

export const sidebars = [
  {
    title: 'Quản trị',
    items: [
      {
        id: 'id_page_product',
        navigationTitle: 'Quản trị sản phẩm',
        path: CONFIRM_PATH.LIST,
        icon: <BsBag />,
      },
      {
        id: 'id_page_product_type',
        navigationTitle: 'Quản trị danh mục',
        path: PRODUCT_TYPE_PATH.LIST,
        icon: <FiType />,
      },
      {
        id: 'id_page_majors',
        navigationTitle: 'Quản trị chuyên ngành',
        path: MAJORS_PATH.LIST,
        icon: <FiBookOpen />,
      },
      {
        id: 'id_page_user',
        navigationTitle: 'Quản trị user',
        path: USER_PATH.LIST,
        icon: <FiUsers />,
      },
      {
        id: 'id_page_subject',
        navigationTitle: 'Quản môn học',
        path: SUBJECT_PATH.LIST,
        icon: <BiBookAlt />,
      },
      {
        id: 'id_page_semester',
        navigationTitle: 'Quản trị kỳ học',
        path: SEMESTER_PATH.LIST,
        icon: <BiSitemap />,
      },
      {
        id: 'id_page_comment',
        navigationTitle: 'Quản trị bình luận',
        path: '/comment',
        icon: <BsChat />,
      },
      {
        id: 'id_page_reply',
        navigationTitle: 'Quản trị phản hồi',
        path: FEEDBACK_PATH.LIST,
        icon: <MdMailOutline />,
      },
    ],
  },
  {
    title: 'Nhập',
    items: [
      {
        id: 'id_page_upload',
        navigationTitle: 'Nhập điểm',
        path: UPLOAD_EXCEL_PATH.UPLOAD,
        icon: <AiOutlineCloudUpload />,
      },
    ],
  },
  {
    title: 'Cài đặt',
    items: [
      {
        id: 'id_page_setting',
        navigationTitle: 'Cài đặt',
        path: '/setting',
        icon: <RiSettings4Line />,
      },
    ],
  },
];
