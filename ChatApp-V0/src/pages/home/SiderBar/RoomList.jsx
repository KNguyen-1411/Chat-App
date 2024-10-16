import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { AppData } from '../../../context/AppData';
import CreateRoomModal from '../../../components/UI/CreateRoomModal';
import { Button } from '@mui/material';
import style from './SideBar.module.scss';

export default function RoomList() {
    const { rooms, setSelectedRoom, selectedRoom, ToggleSidebar } =
        React.useContext(AppData);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="mb-2">
                        Danh sách phòng
                    </Accordion.Header>
                    <Accordion.Body>
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <div
                                    key={room.id}
                                    onClick={() => {
                                        setSelectedRoom(room);
                                        ToggleSidebar();
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    className={`${style.roomid} ${
                                        selectedRoom?.id === room.id
                                            ? style.activeRooms
                                            : ''
                                    }`}
                                >
                                    <p className="textover">{room.name}</p>
                                </div>
                            ))
                        ) : (
                            <div>Không có phòng nào.</div>
                        )}
                        <Button
                            variant="outlined"
                            className="mt-2 mx-auto d-block"
                            onClick={() => setModalOpen(true)}
                        >
                            <i className="bi bi-plus-circle me-1"></i>
                            Tạo phòng
                        </Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <CreateRoomModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
            />
        </>
    );
}
