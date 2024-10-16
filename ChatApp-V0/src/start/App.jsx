import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import { AuthProvider } from '../auth/AuthProvide';
import { AppProvider } from '../context/AppData';
function App() {
    return (
        <BrowserRouter basename="/ChatApp/">
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
