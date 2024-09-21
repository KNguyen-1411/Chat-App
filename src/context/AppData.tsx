'use client';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { IRoom, IUser } from '@/types/User';
import { CircularProgress } from '@mui/material';

const AppDataContext = createContext<{
    rooms: IRoom[];
    ListUser: IUser[];
    loading: boolean;
    roomSelected: IRoom | null;
    setRoomSelected: React.Dispatch<React.SetStateAction<IRoom | null>>;
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    rooms: [],
    ListUser: [],
    loading: true,
    roomSelected: null,
    setRoomSelected: () => {},
    openSidebar: false,
    setOpenSidebar: () => {},
});

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [roomSelected, setRoomSelected] = useState<IRoom | null>(null);
    const [ListUser, setListUser] = useState<IUser[]>([]);
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    useEffect(() => {
        const roomsUnsubscribe = onSnapshot(
            collection(db, 'rooms'),
            (querySnapshot) => {
                const fetchedRooms = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as IRoom[];
                setRooms(fetchedRooms);
                setLoading(false); // Set loading to false only after fetching rooms
            },
            (error) => {
                console.error('Error getting rooms: ', error);
                setLoading(false);
            },
        );

        const usersUnsubscribe = onSnapshot(
            collection(db, 'users'),
            (querySnapshot) => {
                const fetchedUsers = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as IUser[];
                setListUser(fetchedUsers);
            },
            (error) => {
                console.error('Error getting users: ', error);
            },
        );

        return () => {
            roomsUnsubscribe();
            usersUnsubscribe();
        };
    }, []);

    return (
        <AppDataContext.Provider
            value={{
                rooms,
                ListUser,
                loading,
                roomSelected,
                setRoomSelected,
                openSidebar,
                setOpenSidebar,
            }}
        >
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress />
                </div>
            ) : (
                children
            )}
        </AppDataContext.Provider>
    );
};

export const useAppData = () => {
    return useContext(AppDataContext);
};
