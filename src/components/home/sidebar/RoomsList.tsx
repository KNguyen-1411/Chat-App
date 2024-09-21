'use client';
import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppData } from '@/context/AppData';
import { useAuth } from '@/auth/AuthProvide';
import CreateRoom from '@/components/modal/CreateRoom';

export default function RoomsList() {
    const { user } = useAuth();
    const { rooms, loading, setRoomSelected, roomSelected } = useAppData();
    const userRooms = rooms.filter(
        (room) => user && room.members.includes(user.id),
    );
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span>Loading...</span>
            </div>
        );
    }
    return (
        <>
            <Accordion defaultExpanded className=" hiddenBar">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    <h3 className="font-semibold">Danh Sách Phòng</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <ul className="list-none overflow-y-scroll max-h-96">
                        {userRooms.length > 0 ? (
                            userRooms.map((room) => (
                                <li
                                    key={room.id}
                                    className={`p-2 rounded mb-2 cursor-pointer ovft
                                    ${
                                        roomSelected?.id === room.id
                                            ? 'bg-blue-200'
                                            : 'hover:bg-gray-200'
                                    }`}
                                    onClick={() => setRoomSelected(room)}
                                >
                                    {room.name}
                                </li>
                            ))
                        ) : (
                            <li className="p-2">Không có phòng nào.</li>
                        )}
                    </ul>
                    <Button
                        variant="outlined"
                        className="mt-2"
                        onClick={handleOpenModal}
                    >
                        Tạo Phòng
                    </Button>
                </AccordionDetails>
            </Accordion>
            <CreateRoom
                open={modalOpen}
                onClose={handleCloseModal}
                userId={user?.id ?? ''}
            />
        </>
    );
}
