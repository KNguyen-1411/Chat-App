import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@mui/material';
import PropTypes from 'prop-types';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AppData } from '../../context/AppData';
import { AuthContext } from '../../auth/AuthProvide';

function MemberListModal({ open, handleClose, memberIds }) {
    const [members, setMembers] = useState([]);
    const { selectedRoom, setSelectedRoom } = React.useContext(AppData);
    const { user } = React.useContext(AuthContext);

    useEffect(() => {
        const fetchMembers = async () => {
            const memberData = await Promise.all(
                memberIds.map(async (memberId) => {
                    const memberRef = doc(db, 'users', memberId);
                    const memberSnap = await getDoc(memberRef);
                    return { id: memberSnap.id, ...memberSnap.data() };
                })
            );
            setMembers(memberData);
        };

        if (open) {
            fetchMembers();
        }
    }, [open, memberIds]);

    const handleDeleteMemberInRoom = async (memberId) => {
        if (!selectedRoom) return;
        if (memberIds.length <= 1) {
            alert('Không thể xóa thành viên cuối cùng');
            return;
        }
        const confirmDelete = window.confirm(
            'Bạn có chắc chắn muốn xóa thành viên này?'
        );
        if (confirmDelete) {
            try {
                const roomRef = doc(db, 'rooms', selectedRoom.id);
                await updateDoc(roomRef, {
                    members: memberIds.filter((id) => id !== memberId)
                });
                setMembers((prevMembers) =>
                    prevMembers.filter((member) => member.id !== memberId)
                );
                if (user.uid === memberId) {
                    setSelectedRoom(null);
                }
            } catch (error) {
                alert('Lỗi khi xóa thành viên: ');
            }
        }
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <div
                style={{
                    padding: '20px',
                    background: 'white',
                    borderRadius: '8px',
                    maxWidth: '400px',
                    margin: 'auto',
                    marginTop: '150px'
                }}
            >
                <Typography
                    variant="h6"
                    className="ms-2 fw-bold"
                    component="h2"
                    gutterBottom
                >
                    Danh Sách Thành Viên
                </Typography>
                <List>
                    {members.length > 0 ? (
                        members.map((member) => (
                            <ListItem key={member.id}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={
                                            member.photoURL ||
                                            'default-avatar.png'
                                        }
                                        alt={member.displayName}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={member.displayName} />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    startIcon={<i className="bi bi-trash3"></i>}
                                    onClick={() =>
                                        handleDeleteMemberInRoom(member.id)
                                    }
                                >
                                    Xóa
                                </Button>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="Không có thành viên nào." />
                        </ListItem>
                    )}
                </List>
                <Button
                    variant="outlined"
                    color="secondary"
                    className="d-block mx-auto"
                    onClick={handleClose}
                    style={{ marginTop: '20px' }}
                >
                    Đóng
                </Button>
            </div>
        </Modal>
    );
}

MemberListModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    memberIds: PropTypes.array.isRequired
};

export { MemberListModal };
