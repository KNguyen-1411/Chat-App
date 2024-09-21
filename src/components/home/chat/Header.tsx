import { useAppData } from '@/context/AppData';
import { Avatar, AvatarGroup, Button, Tooltip } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import AddMember from '@/components/modal/AddMember';
import RoomDetail from '@/components/modal/RoomDetail';
export default function Header() {
    const { roomSelected, ListUser } = useAppData();
    const memberIds = roomSelected?.members || [];
    const membersInRoom = ListUser.filter((user) =>
        memberIds.includes(user.id),
    );
    const [modalOpenAddMember, setModalAddMemberOpen] = useState(false);
    const handleOpenAddMemberModal = () => setModalAddMemberOpen(true);
    const handleCloseAddMemberModal = () => setModalAddMemberOpen(false);

    const [modalOpenRoomDetail, setModalRoomDetailOpen] = useState(false);
    const handleOpenRoomDetailModal = () => setModalRoomDetailOpen(true);
    const handleCloseRoomDetailModal = () => setModalRoomDetailOpen(false);

    return (
        <>
            <header
                style={{ height: 65, background: '#F4F6F9' }}
                className="flex px-2 pt-2 ps-4"
            >
                <div className="header-reponsive w-64">
                    <h1 className="font-bold text-2xl  ovft">
                        {roomSelected?.name}
                    </h1>
                    <p className="text-base  ovft" style={{ marginTop: -3 }}>
                        {roomSelected?.description}
                    </p>
                </div>
                <div className="ms-auto flex items-center">
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<PersonAddIcon />}
                        style={{ marginRight: 10 }}
                        onClick={handleOpenAddMemberModal}
                    >
                        Thêm
                    </Button>
                    <AvatarGroup max={2}>
                        {membersInRoom.map((member) => (
                            <Tooltip key={member.id} title={member.displayName}>
                                <Avatar
                                    src={member.photoURL}
                                    alt={member.displayName}
                                >
                                    {member.displayName[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                        ))}
                    </AvatarGroup>
                    <Tooltip title="Thông tin phòng">
                        <InfoIcon
                            onClick={handleOpenRoomDetailModal}
                            fontSize="large"
                            className=" ms-1 text-blue-500
                    cursor-pointer"
                        />
                    </Tooltip>
                </div>
            </header>
            <AddMember
                open={modalOpenAddMember}
                onClose={handleCloseAddMemberModal}
            />
            <RoomDetail
                open={modalOpenRoomDetail}
                onClose={handleCloseRoomDetailModal}
            />
        </>
    );
}
