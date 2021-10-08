import React, { memo, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { GrTopCorner } from 'react-icons/gr';
import { BiLogOut } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  WrapNavbar,
  NavbarLeft,
  NavbarRight,
  NavbarSearch,
  NavbarAction,
  NavNotification,
  NavControl,
  ListAction,
  GroupNotification,
  ListNotification,
} from './Navbar.styles';

const FAKE_NOTIFICATION = [
  {
    id: 1,
    img: 'https://cdn.pixabay.com/photo/2020/06/13/03/40/flower-5292556__480.jpg',
    title:
      'ĐỐI TƯỢNG: Sinh viên IT/ NonIT còn nông kiến thức về Frontend và muốn phát triển về Reactjs.',
    time: '10/08/2021',
    status: true,
  },
  {
    id: 2,
    img: 'https://cdn.pixabay.com/photo/2021/06/01/07/02/plants-6300778__480.jpg',
    title: 'Tháng này, Bên mình đang triển khai khóa đào tạo FE',
    time: '10/08/2021',
    status: false,
  },
];

const Navbar = () => {
  const [actionUser, setActionUser] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  return (
    <WrapNavbar>
      <NavbarLeft>
        <h1 className="title-admin">Dashboard</h1>
      </NavbarLeft>
      <NavbarRight>
        <NavbarSearch>
          <input type="text" className="main-search" placeholder="Search" />
          <span className="icon-search">
            <BiSearchAlt2 />
          </span>
        </NavbarSearch>

        <NavbarAction>
          <GroupNotification>
            <NavNotification onClick={() => setIsNotification(!isNotification)}>
              <span className="icon-notification">
                <IoMdNotificationsOutline />
              </span>
              <span className="total-notification">0</span>
            </NavNotification>

            <OutsideClickHandler
              onOutsideClick={() => setIsNotification(false)}
            >
              <ListNotification className={`${isNotification ? 'active' : ''}`}>
                <h3 className="notification-title">Thông báo</h3>
                {FAKE_NOTIFICATION.map((item) => (
                  <a href="!#" className="notification-item" key={item.id}>
                    <img src={item.img} alt="" className="notification-image" />
                    <div className="notification-content">
                      <h4 className="notification-label">{item.title}</h4>
                      <span className="notification-time">{item.time}</span>
                    </div>
                    <div
                      className={`notification-status ${
                        item.status ? 'active' : ''
                      }`}
                    ></div>
                  </a>
                ))}
              </ListNotification>
            </OutsideClickHandler>
          </GroupNotification>

          <NavControl>
            <div className="box-control">
              <img
                src="https://i.pinimg.com/564x/1c/c2/40/1cc2408849475c4fe0963566ad520fea.jpg"
                alt=""
                className="avatar-user"
              />
              le quang son
              <div
                className="icon-drop"
                onClick={() => setActionUser(!actionUser)}
              >
                <GrTopCorner />
              </div>
            </div>
            <OutsideClickHandler onOutsideClick={() => setActionUser(false)}>
              <ListAction className={`${actionUser ? 'active' : ''}`}>
                <li className="item-action">
                  <a href="!#" className="link-action">
                    <BiLogOut className="icon-action" />
                    Logout
                  </a>
                </li>
              </ListAction>
            </OutsideClickHandler>
          </NavControl>
        </NavbarAction>
      </NavbarRight>
    </WrapNavbar>
  );
};

export default memo(Navbar);
