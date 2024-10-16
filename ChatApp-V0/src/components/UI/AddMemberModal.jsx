import React, { useState } from 'react';
import { Modal, Button, TextField, Autocomplete } from '@mui/material';
import { AppData } from '../../context/AppData';
import propTypes from 'prop-types';
import { db } from '../../firebase/config';
import { onSnapshot, collection } from 'firebase/firestore';

const AddMemberModal = ({ open, handleClose }) => {
    const { addMemberToRoom } = React.useContext(AppData);
    const [newMemberId, setNewMemberId] = useState('');
    const [users, setUsers] = useState([]);

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (newMemberId.trim() === '') return;

        await addMemberToRoom(newMemberId);
        setNewMemberId('');
        handleClose();
    };

    React.useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'users'),
            (snapshot) => {
                const userList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(userList);
            },
            (error) => {
                console.error('Lỗi khi lấy danh sách người dùng:', error);
            }
        );

        return () => unsubscribe();
    }, []);

    const handleSelectUser = (event, value) => {
        if (value) {
            setNewMemberId(value.id);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="add-member-modal-title"
            aria-describedby="add-member-modal-description"
        >
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
                <h2 id="add-member-modal-title">Thêm Thành Viên</h2>
                <form onSubmit={handleAddMember}>
                    <TextField
                        label="Nhập ID thành viên..."
                        variant="outlined"
                        value={newMemberId}
                        onChange={(e) => setNewMemberId(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <div className="mb-3">
                        <Autocomplete
                            disablePortal
                            options={users}
                            getOptionLabel={(option) =>
                                option.displayName || option.id
                            }
                            onChange={handleSelectUser}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn thành viên có sẵn..."
                                />
                            )}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="secondary">
                        Thêm Thành Viên
                    </Button>
                    <Button
                        className="ms-3"
                        onClick={handleClose}
                        variant="outlined"
                        color="secondary"
                    >
                        Huỷ
                    </Button>
                </form>
            </div>
        </Modal>
    );
};

AddMemberModal.propTypes = {
    open: propTypes.bool.isRequired,
    handleClose: propTypes.func.isRequired
};

export default AddMemberModal;
