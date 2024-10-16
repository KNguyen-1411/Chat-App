import React from 'react';
import { auth } from '../../../firebase/config';
import { AppData } from '../../../context/AppData';
import Button from '@mui/material/Button';
export default function BtnLogout() {
    const { setSelectedRoom } = React.useContext(AppData);
    return (
        <Button
            variant="outlined"
            color="error"
            style={{ width: '90%' }}
            className="d-block mx-auto mb-2"
            onClick={() => {
                auth.signOut();
                setSelectedRoom(null);
            }}
        >
            LogOut
        </Button>
    );
}
