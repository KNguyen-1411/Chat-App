'use client';
import React from 'react';
import { Avatar, Button, Tooltip } from '@mui/material';
import { useAuth } from '@/auth/AuthProvide';
import RoomsList from './RoomsList';
import { auth } from '@/firebase/config';
import UserModal from '@/components/modal/UserModail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';
import { useAppData } from '@/context/AppData';
export default function Sidebar() {
    const { push } = useRouter();
    const { user } = useAuth();
    const [modalOpen, setModalOpen] = React.useState(false);
    const { setOpenSidebar, openSidebar } = useAppData();
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleLogout = async () => {
        const confirmLogout = window.confirm('Bạn có chắc muốn đăng xuất?');
        if (confirmLogout) {
            try {
                await auth.signOut();
                await push('/login');
            } catch (error) {
                alert('Đã có lỗi xảy ra, vui lòng thử lại sau!');
            }
        }
    };
    return (
        <>
            <div
                style={{ background: '#343A40' }}
                className="flex flex-col justify-between h-full relative"
            >
                <div className="hiddenBar">
                    <div
                        className=" px-2 flex items-center border-b-2 text-white "
                        style={{ height: 65 }}
                    >
                        <Tooltip title={user?.displayName}>
                            <Avatar
                                src={user?.photoURL}
                                alt={user?.displayName}
                            >
                                {user?.displayName[0].toUpperCase()}
                            </Avatar>
                        </Tooltip>
                        <h2 className="font-bold ms-3 text-xl">
                            {user?.displayName}
                        </h2>
                        <Tooltip title="Xem tài khoản">
                            <AccountCircleIcon
                                className="ms-auto cursor-pointer"
                                onClick={handleOpenModal}
                            />
                        </Tooltip>
                    </div>
                </div>
                <div className="px-2 mb-auto mt-3 relative">
                    <RoomsList />
                    <svg
                        onClick={() => setOpenSidebar(!openSidebar)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-right-square-fill border-black absolute border cursor-pointer text-white"
                        viewBox="0 0 16 16"
                        style={{
                            background: '#343A40',
                            borderRadius: 4,
                            scale: 2,
                            right: -10,
                            top: 300,
                            zIndex:1000,
                        }}
                    >
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4z" />
                    </svg>
                </div>
                <div className="px-3 pb-1  hiddenBar">
                    <Button
                        variant="contained"
                        fullWidth
                        color="error"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
            <UserModal open={modalOpen} onClose={handleCloseModal} />
        </>
    );
}
