import React from 'react';
import { useAppData } from '@/context/AppData';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { useAuth } from '@/auth/AuthProvide';
import { useDate } from '@/hooks/useDate';
import {
    Button,
    Box,
    InputAdornment,
    FormControl,
    OutlinedInput,
} from '@mui/material';

export default function Chat() {
    const { user } = useAuth();
    const { time } = useDate();
    const { roomSelected } = useAppData();
    const [newMessage, setNewMessage] = React.useState('');

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const roomRef = doc(db, 'rooms', roomSelected?.id);
        await updateDoc(roomRef, {
            messages: arrayUnion({
                message: newMessage || ' 👍',
                name: user?.displayName,
                time: `${time}`,
                photoURL: user?.photoURL,
                uid: user?.id,
            }),
        });
        setNewMessage('');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSendMessage}
            bgcolor="#f5f5f5"
            style={{ borderRadius: 0, margin: ' 0 14px' }}
            borderRadius={2}
        >
            <FormControl fullWidth variant="outlined">
                <OutlinedInput
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ borderRadius: 20 }}
                    id="outlined-adornment-weight"
                    endAdornment={
                        <InputAdornment position="end">
                            <Button
                                style={{ borderRadius: 15 }}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                {newMessage ? 'Gửi' : ' 👍 '}
                            </Button>
                        </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
            </FormControl>
        </Box>
    );
}
