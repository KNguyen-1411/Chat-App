import React from 'react';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import styles from './Chat.module.scss';
export function Message({ photoURL, messages, displayName, time, admin }) {
    return (
        <div className="my-2 d-flex justify-content-between ">
            <div>
                <div className="d-flex">
                    <Avatar
                        src={photoURL}
                        className={`${
                            admin ? 'border border-primary border-3' : ''
                        } `}
                    >
                        {displayName.charAt(0).toUpperCase()}
                    </Avatar>
                    <h5 className="ms-2 mt-2">{displayName}</h5>
                </div>
                <div className="mt-2 ms-5">{messages}</div>
            </div>
            <div>{time}</div>
        </div>
    );
}

Message.propTypes = {
    photoURL: PropTypes.string,
    messages: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    admin: PropTypes.bool
};
