import React from 'react';
import { AuthContext } from '../../../auth/AuthProvide';
import Avatar from '@mui/material/Avatar';
import styles from './SideBar.module.scss';
import { Dropdown } from 'react-bootstrap';
export default function User() {
    const { user, loading } = React.useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    const { displayName, photoURL } = user || {};
    return (
        <div className={styles.userContainer}>
            <Dropdown drop="end">
                <Dropdown.Toggle
                    id="dropdown-basic"
                    className={styles.dropdownid}
                >
                    <div className={styles.userInfo}>
                        <Avatar src={photoURL}>
                            {!photoURL
                                ? displayName?.charAt(0)?.toUpperCase()
                                : ''}
                        </Avatar>
                        <p className={`${styles.username} text-light pt-3`}>
                            {displayName || 'User'}
                        </p>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.menuDropdown}>
                    <Avatar
                        src={photoURL}
                        className="mx-auto d-block"
                        sx={{ width: 56, height: 56 }}
                    >
                        {!photoURL ? displayName?.charAt(0)?.toUpperCase() : ''}
                    </Avatar>
                    <p
                        className={`${styles.username} text-dark fs-4 fw-bold pt-3`}
                    >
                        {displayName || 'User'}
                    </p>
                    <p>{user.email}</p>
                    <p>ID: {user.uid || ''}</p>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}
