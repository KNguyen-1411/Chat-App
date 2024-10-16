import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { db } from '../../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import propTypes from 'prop-types';
import { AvatarGroup } from '@mui/material';
const getMembersAvatars = async (members) => {
    const membersInfo = await Promise.all(
        members.map(async (memberId) => {
            const userDoc = await getDoc(doc(db, 'users', memberId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                return {
                    id: memberId,
                    name: userData.displayName || 'No Name',
                    photoURL: userData.photoURL || ''
                };
            }
            return { id: memberId, name: memberId, photoURL: '' };
        })
    );
    return membersInfo;
};
const MemberAvatars = ({ members }) => {
    const [membersAvatars, setMembersAvatars] = useState([]);
    useEffect(() => {
        const fetchMembersAvatars = async () => {
            if (members && members.length > 0) {
                const avatars = await getMembersAvatars(members);
                setMembersAvatars(avatars);
            }
        };
        fetchMembersAvatars();
    }, [members]);
    return (
        <>
            <AvatarGroup max={2}>
                {membersAvatars.map(({ id, name, photoURL }) => (
                    <Tooltip key={id} title={name}>
                        <Avatar alt={name} src={photoURL}>
                            {name.charAt(0).toUpperCase()}
                        </Avatar>
                    </Tooltip>
                ))}
            </AvatarGroup>
        </>
    );
};
MemberAvatars.propTypes = {
    members: propTypes.array.isRequired
};
export default MemberAvatars;
