'use client';
import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
} from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useDate } from '@/hooks/useDate';
import { useAppData } from '@/context/AppData';
import { useForm, SubmitHandler } from 'react-hook-form';

interface CreateRoomModalProps {
    open: boolean;
    onClose: () => void;
    userId: string;
}

interface FormData {
    roomName: string;
    roomDescription?: string;
}

const CreateRoom = ({ open, onClose, userId }: CreateRoomModalProps) => {
    const { setRoomSelected } = useAppData();
    const { date, time } = useDate();
    const { register, handleSubmit, reset } = useForm<FormData>();

    const handleCreateRoom: SubmitHandler<FormData> = async (data) => {
        if (data.roomName.trim() === '') return;

        const roomId =
            data.roomName.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now();
        const newRoom = {
            id: roomId,
            name: data.roomName,
            description: data.roomDescription || '',
            members: [userId],
            messages: [],
            createdAt: `${time}`,
        };

        const roomRef = doc(db, 'rooms', roomId);
        await setDoc(roomRef, newRoom);
        onClose();
        reset();
        setRoomSelected(newRoom);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Tạo Phòng Mới</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vui lòng nhập tên và mô tả cho phòng mới.
                </DialogContentText>
                <form
                    id="create-room-form"
                    onSubmit={handleSubmit(handleCreateRoom)}
                >
                    <TextField
                        label="Tên Phòng"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register('roomName', { required: true })}
                    />
                    <TextField
                        label="Mô Tả"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register('roomDescription')}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button type="submit" form="create-room-form" color="primary">
                    Tạo
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateRoom;
