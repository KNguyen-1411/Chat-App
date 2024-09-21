import { useState } from 'react';
import { db } from '@/firebase/config';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField,
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { useAppData } from '@/context/AppData';

interface AddMemberProps {
    open: boolean;
    onClose: () => void;
}

const AddMember = ({ open, onClose }: AddMemberProps) => {
    const { ListUser, roomSelected } = useAppData();
    const [selectedUserId, setSelectedUserId] = useState('');
    const [userId, setUserId] = useState('');

    const handleAddMember = async () => {
        const memberIdToAdd = selectedUserId || userId;
        if (memberIdToAdd && roomSelected) {
            const roomRef = doc(db, 'rooms', roomSelected.id);
            const roomDoc = await getDoc(roomRef);
            const currentMembers = roomDoc.data()?.members || [];
            if (currentMembers.includes(memberIdToAdd)) {
                alert('Thành viên đã tồn tại trong phòng!');
                return;
            }

            await updateDoc(roomRef, {
                members: arrayUnion(memberIdToAdd),
            });
            setSelectedUserId('');
            setUserId('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thêm Thành Viên</DialogTitle>
            <DialogContent>
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Chọn thành viên</InputLabel>
                    <Select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        label="Chọn thành viên"
                    >
                        {ListUser.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                <Avatar
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    sx={{ marginRight: '8px' }}
                                >
                                    {user.displayName[0].toUpperCase()}
                                </Avatar>
                                {user.displayName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Thêm Thành Viên Bằng ID"
                    variant="outlined"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button variant="contained" onClick={handleAddMember}>
                    Thêm Thành Viên
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddMember;
