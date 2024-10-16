import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../auth/AuthProvide';
import { useDate } from '../hooks/useDate';
import PropTypes from 'prop-types';
import { getDoc } from 'firebase/firestore';
const AppData = createContext();

export const AppProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]); // Lưu danh sách phòng
    const [newRoomName, setNewRoomName] = useState(''); // Lưu tên phòng mới
    const [messages, setMessages] = useState([]); // Lưu tin nhắn trong phòng
    const [selectedRoom, setSelectedRoom] = useState(null); // Lưu phòng đang chọn
    const { user } = useContext(AuthContext); // Lấy thông tin user từ AuthProvider
    const { date, time } = useDate(); // Lấy ngày và giờ hiện tại
    const [showSidebar, setShowSidebar] = useState(false);
    // Lấy danh sách phòng mà user đã tham gia
    useEffect(() => {
        if (user) {
            const unsubscribe = onSnapshot(
                collection(db, 'rooms'),
                (snapshot) => {
                    const roomList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    const userRooms = roomList.filter((room) =>
                        room.members.includes(user.uid)
                    );
                    setRooms(userRooms);
                }
            );

            return () => unsubscribe();
        }
    }, [user]);

    // Tạo phòng mới
    const handleCreateRoom = async () => {
        if (!user) {
            alert('Vui lòng đăng nhập để tạo phòng.');
            return;
        }
        if (newRoomName.trim() === '') {
            alert('Vui lòng nhập tên phòng!');
            return;
        }
        const existingRoom = rooms.find((room) => room.name === newRoomName);
        if (existingRoom) {
            alert('Phòng này đã tồn tại!');
            return;
        }

        try {
            const roomId = newRoomName.replace(/\s+/g, '-').toLowerCase();
            await setDoc(doc(db, 'rooms', roomId), {
                name: newRoomName,
                members: [user.uid],
                createdAt: date + ' ' + time,
                messages: []
            });
            setSelectedRoom({
                id: roomId,
                name: newRoomName,
                members: [user.uid]
            });
            setNewRoomName('');
        } catch (error) {
            alert('Lỗi khi tạo phòng');
        }
    };

    // Gửi tin nhắn
    const sendMessage = async (messageContent) => {
        if (!user) {
            alert('Vui lòng đăng nhập để gửi tin nhắn.');
            return;
        }
        if (!selectedRoom) {
            alert('Vui lòng chọn một phòng để gửi tin nhắn.');
            return;
        }

        const newMessage = {
            uid: user.uid,
            name: user.displayName || 'Anonymous',
            message: messageContent,
            photoURL: user.photoURL || 'default_photo_url',
            time: time + ' ' + date
        };

        try {
            const roomRef = doc(db, 'rooms', selectedRoom.id);
            await setDoc(
                roomRef,
                {
                    messages: [...(messages || []), newMessage]
                },
                { merge: true }
            );
        } catch (error) {
            alert('Lỗi khi gửi tin nhắn');
        }
    };

    // Lấy tin nhắn trong phòng
    useEffect(() => {
        if (selectedRoom) {
            const unsubscribe = onSnapshot(
                doc(db, 'rooms', selectedRoom.id),
                (doc) => {
                    if (doc.exists()) {
                        const roomData = doc.data();
                        setMessages(roomData.messages || []);
                    } else {
                        setMessages([]);
                    }
                },
                (error) => {
                    alert('Lỗi khi lấy tin nhắn');
                }
            );

            return () => unsubscribe();
        }
    }, [selectedRoom]);

    // Hàm kiểm tra xem người dùng có tồn tại hay không
    const checkUserExists = async (memberId) => {
        const userRef = doc(db, 'users', memberId); // Giả sử người dùng được lưu trong "users"
        const userDoc = await getDoc(userRef);
        return userDoc.exists();
    };

    // Thêm thành viên vào phòng
    const addMemberToRoom = async (memberId) => {
        if (!selectedRoom) {
            alert('Vui lòng chọn một phòng.');
            return;
        }

        if (selectedRoom.members.includes(memberId)) {
            alert('Thành viên này đã có trong phòng.');
            return;
        }
        const userExists = await checkUserExists(memberId);
        if (!userExists) {
            alert('Thành viên này không tồn tại.');
            return;
        }

        try {
            const roomRef = doc(db, 'rooms', selectedRoom.id);
            await setDoc(
                roomRef,
                {
                    members: [...(selectedRoom.members || []), memberId]
                },
                { merge: true }
            );
        } catch (error) {
            alert('Lỗi khi thêm thành viên');
        }
    };
    const ToggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };
    useEffect(() => {
        if (selectedRoom === null && !showSidebar) {
            ToggleSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const handleSet = () => {
            if (window.innerWidth > 768) {
                setShowSidebar(false);
            }
        };
        window.addEventListener('resize', handleSet);
        return () => window.removeEventListener('resize', handleSet);
    }, [showSidebar]);
    return (
        <AppData.Provider
            value={{
                rooms,
                newRoomName,
                setNewRoomName,
                handleCreateRoom,
                selectedRoom,
                setSelectedRoom,
                messages,
                sendMessage,
                addMemberToRoom,
                showSidebar,
                ToggleSidebar
            }}
        >
            {children}
        </AppData.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { AppData };
