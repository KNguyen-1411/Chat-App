import React from 'react';
import PropTypes from 'prop-types';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.accessToken) {
                    localStorage.setItem('accessToken', user.accessToken);
                }
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                if (window.location.pathname !== '/') {
                    navigate('/');
                }
            } else {
                setUser(null);
                if (window.location.pathname !== '/login') {
                    navigate('/login');
                }
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, loading, setUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { AuthContext };
