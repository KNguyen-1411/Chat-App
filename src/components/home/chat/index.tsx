'use client';
import { useEffect, useRef, useCallback } from 'react';
import { useAppData } from '@/context/AppData';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Header from './Header';
import { IRoom } from '@/types/User';
import { Alert, Box } from '@mui/material';
import Chat from './Chat';
import Message from './Message';
import { DocumentSnapshot } from 'firebase/firestore';

export default function ChatWindow() {
    const { roomSelected, setRoomSelected } = useAppData();
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const prevMessagesLength = useRef<number>(0);

    const handleSnapshot = useCallback(
        (doc: DocumentSnapshot) => {
            if (doc.exists()) {
                const roomData: IRoom = {
                    id: doc.id,
                    ...doc.data(),
                } as IRoom;
                setRoomSelected(roomData);
            }
        },
        [setRoomSelected],
    );

    useEffect(() => {
        if (roomSelected) {
            const unsubscribeRoom = onSnapshot(
                doc(db, 'rooms', roomSelected.id),
                handleSnapshot,
                (error) => {
                    console.error('Error getting room data: ', error);
                },
            );

            return () => unsubscribeRoom();
        }
    }, [roomSelected, handleSnapshot]);

    useEffect(() => {
        if (
            roomSelected?.messages &&
            roomSelected.messages.length > prevMessagesLength.current
        ) {
            prevMessagesLength.current = roomSelected.messages.length;
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [roomSelected?.messages]);

    if (!roomSelected) {
        return (
            <Box p={3}>
                <Alert severity="info">
                    Chọn phòng hoặc tạo phòng mới để bắt đầu.
                </Alert>
            </Box>
        );
    }

    return (
        <>
            <Header />
            <Box
                p={2}
                style={{
                    maxHeight: 'calc(100vh - 125px)',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div style={{ flexGrow: 1 }}>
                    {roomSelected.messages &&
                    roomSelected.messages.length > 0 ? (
                        roomSelected.messages.map((message, index) => (
                            <Message key={index} message={message} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center' }}>
                            Chưa có tin nhắn nào!
                        </p>
                    )}
                    <div ref={messageEndRef} />
                </div>
            </Box>
            <Chat />
        </>
    );
}
