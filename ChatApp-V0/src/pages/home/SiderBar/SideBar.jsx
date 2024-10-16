import React from 'react';
import User from './User';
import RoomList from './RoomList';
import style from './SideBar.module.scss';
import BtnLogout from './BtnLogout';
import { AppData } from '../../../context/AppData';
export default function SideBar() {
    const { showSidebar, ToggleSidebar } = React.useContext(AppData);
    return (
        <aside
            style={{ minHeight: '100vh' }}
            className={`${style.aside}
        ${showSidebar ? style.SideBarActi : ``}`}
        >
            <User />
            <RoomList />
            <BtnLogout />
            <div className={style.btnAciveSideBar} onClick={ToggleSidebar}>
                <i className="bi bi-arrow-right-circle-fill"></i>
            </div>
        </aside>
    );
}
