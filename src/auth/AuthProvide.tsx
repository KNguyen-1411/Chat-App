'use client';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth } from '@/firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types/User';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useDate } from '@/hooks/useDate';
import CircularProgress from '@mui/material/CircularProgress';
const AuthContext = createContext<{
    user: IUser | null;
    userFull: User | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}>({
    user: null,
    userFull: null,
    loading: true,
    setUser: () => {},
});

interface CustomUser extends User {
    stsTokenManager?: {
        accessToken: string;
    };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [userFull, setUserFull] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);
    const router = useRouter();
    const db = getFirestore();
    const { date, time } = useDate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUserFull(user);
            setLoading(false);
            if (user) {
                const accessToken = (user.toJSON() as CustomUser)
                    .stsTokenManager?.accessToken;
                setCookie('accessToken', accessToken || '', {
                    maxAge: 60 * 60 * 24 * 1, // Hạn sử dụng cookie 1 ngày
                });

                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (!userDoc.exists()) {
                    await setDoc(userDocRef, {
                        email: user.email,
                        displayName: user.displayName ?? user.email ?? '',
                        photoURL:
                            user.photoURL ??
                            'https://i.kym-cdn.com/photos/images/original/001/551/402/80c.jpeg',
                        createdAt: `${time}`,
                    });
                }
                setUser({
                    id: user.uid,
                    displayName: user.displayName ?? user.email ?? '',
                    email: user.email ?? '',
                    photoURL:
                        user.photoURL ??
                        'https://i.kym-cdn.com/photos/images/original/001/551/402/80c.jpeg',
                });
                router.push('/');
            } else {
                router.push('/login');
                setTimeout(() => {
                    deleteCookie('accessToken');
                    setUser(null);
                }, 1000);
            }
        });
        return () => unsubscribe();
    }, [router, db, date, time]);

    return (
        <AuthContext.Provider value={{ user, userFull, loading, setUser }}>
            {loading ? (
                <div
                    style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
