import React from 'react';
import { Modal, Button, TextField, Typography } from '@mui/material';
import { AppData } from '../../context/AppData';
import PropTypes from 'prop-types';

const CreateRoomModal = ({ open, handleClose }) => {
    const { handleCreateRoom, newRoomName, setNewRoomName, ToggleSidebar } =
        React.useContext(AppData);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateRoom();
        setNewRoomName('');
        ToggleSidebar();
        handleClose();
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
                <Typography variant="h6" component="h2" gutterBottom>
                    Tạo Phòng Mới
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Tên phòng mới"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        margin="normal"
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '16px'
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                            style={{ marginRight: '8px' }}
                        >
                            Đóng
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Tạo phòng
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

CreateRoomModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default CreateRoomModal;
