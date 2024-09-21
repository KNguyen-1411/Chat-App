'use client';
import { useAuth } from '@/auth/AuthProvide';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Avatar,
} from '@mui/material';

interface AboutProps {
    open: boolean;
    onClose: () => void;
}

export default function UserModal({ open, onClose }: AboutProps) {
    const { user } = useAuth();

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <DialogTitle align="center">Thông tin</DialogTitle>
            <DialogContent
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    src={user?.photoURL}
                    alt={user?.displayName}
                    sx={{ width: 100, height: 100, mb: 2 }}
                >
                    {user?.displayName[0].toUpperCase()}
                </Avatar>
                <h4 className="font-bold text-3xl">{user?.displayName}</h4>
                <p className="mt-4 mb-2">Email: {user?.email}</p>
                <p>ID: {user?.id}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
}
