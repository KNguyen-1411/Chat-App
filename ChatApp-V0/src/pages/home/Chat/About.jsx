import React from 'react';
import { Dropdown } from 'react-bootstrap';
import style from './Chat.module.scss';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { AppData } from '../../../context/AppData';
import { Button } from '@mui/material';
import { MemberListModal } from '../../../components/UI/MemberListModal';
export default function About() {
    const { selectedRoom, setSelectedRoom } = React.useContext(AppData);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleDeleteRoom = async () => {
        if (!selectedRoom) return;
        const confirmDelete = window.confirm(
            'Bạn có chắc chắn muốn xóa phòng này?'
        );
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, 'rooms', selectedRoom.id));
                setSelectedRoom(null);
            } catch (error) {
                alert('Lỗi khi xóa phòng: ');
            }
        }
    };
    return (
        <>
            <Dropdown className={style.btnDD}>
                <Dropdown.Toggle variant="secondary">
                    <i className="bi bi-exclamation-circle-fill"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className={style.DropdownMenu}>
                    <Button
                        variant="outlined"
                        onClick={handleDeleteRoom}
                        startIcon={<i className="bi bi-archive"></i>}
                    >
                        Xóa phòng
                    </Button>
                    <Button
                        onClick={() => setModalOpen(true)}
                        variant="outlined"
                        startIcon={<i className="bi bi-people-fill"></i>}
                    >
                        Xem thành viên
                    </Button>
                </Dropdown.Menu>
            </Dropdown>
            <MemberListModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                memberIds={selectedRoom?.members}
            />
        </>
    );
}
