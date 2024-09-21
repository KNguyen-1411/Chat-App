import { useAppData } from '@/context/AppData';
import { useAuth } from '@/auth/AuthProvide';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Avatar,
    Box,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, updateDoc, arrayRemove, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface AboutProps {
    open: boolean;
    onClose: () => void;
}

export default function RoomDetail({ open, onClose }: AboutProps) {
    const { roomSelected, ListUser, setRoomSelected } = useAppData();
    const { user } = useAuth();

    const handleRemoveMember = async (memberId: string) => {
        const confirmRemove = window.confirm(
            'Bạn có chắc muốn xóa thành viên này?',
        );
        if (confirmRemove) {
            const roomRef = doc(db, 'rooms', roomSelected?.id);
            await updateDoc(roomRef, {
                members: arrayRemove(memberId),
            });
            setRoomSelected(null);
            if (memberId === user?.id) onClose();
        }
    };

    const handleDeleteRoom = async () => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xóa phòng này?');
        if (confirmDelete) {
            const roomRef = doc(db, 'rooms', roomSelected?.id);
            await deleteDoc(roomRef);
            setRoomSelected(null);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>
                <Typography variant="h6" fontWeight="bold">
                    Thành viên trong phòng
                </Typography>
            </DialogTitle>
            <DialogContent>
                <List>
                    {roomSelected?.members.map((memberId) => {
                        const member = ListUser.find(
                            (user) => user.id === memberId,
                        );
                        return (
                            <ListItem
                                key={memberId}
                                sx={{
                                    borderBottom: '1px solid #e0e0e0',
                                    py: 1,
                                }}
                            >
                                <Avatar
                                    src={member?.photoURL}
                                    alt={member?.displayName}
                                >
                                    {member?.displayName
                                        ? member.displayName[0].toUpperCase()
                                        : '?'}
                                </Avatar>
                                <ListItemText
                                    className="ms-2 mr-4"
                                    primary={member?.displayName || 'Unknown'}
                                />
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleRemoveMember(memberId)}
                                    sx={{ color: 'error.main' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>
            </DialogContent>
            <DialogActions style={{ marginBottom: '.6rem' }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDeleteRoom}
                >
                    Xóa Phòng
                </Button>
                <Button onClick={onClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    );
}
