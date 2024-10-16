import React, { useState, useEffect, useRef } from 'react';
import style from './Chat.module.scss';
import { AppData } from '../../../context/AppData';
import { Button } from '@mui/material';
import AddMemberModal from '../../../components/UI/AddMemberModal';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import Members from './Menbers';
import { Message } from './Message';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { AuthContext } from '../../../auth/AuthProvide';
import { Dropdown } from 'react-bootstrap';
import About from './About';
export default function ChatWindow() {
    const { selectedRoom, messages, sendMessage, setSelectedRoom } =
        React.useContext(AppData);
    const [messageContent, setMessageContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const { user } = React.useContext(AuthContext);
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (messageContent.trim() === '') return;

        await sendMessage(messageContent);
        setMessageContent('');
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <>
            {selectedRoom ? (
                <div className={style.ChatMain}>
                    <header className={style.headerContainer}>
                        <div className="mt-2 d-flex">
                            <h3>{selectedRoom.name}</h3>
                        </div>
                        <div className="d-flex">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setModalOpen(true)}
                                className="me-3"
                            >
                                <i className="bi bi-person-add me-1"></i>
                                Mời
                            </Button>
                            <Members members={selectedRoom.members} />
                            <About />
                        </div>
                    </header>
                    <main className={style.messageContainer}>
                        {messages.length > 0 ? (
                            <div className="mb-3">
                                {messages.map((msg, index) => (
                                    <Message
                                        key={index}
                                        photoURL={msg.photoURL}
                                        messages={msg.message}
                                        displayName={msg.name}
                                        time={msg.time}
                                        admin={msg.uid === user.uid}
                                    />
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        ) : (
                            <div className="mt-1 px-2">
                                <Alert variant="filled" severity="info">
                                    Bắt đầu trò chuyện.
                                </Alert>
                            </div>
                        )}
                    </main>
                    <footer className="px-1">
                        <form
                            onSubmit={handleSendMessage}
                            className={style.FormInput}
                        >
                            <TextField
                                label="Nhập tin nhắn..."
                                variant="outlined"
                                value={messageContent}
                                onChange={(e) =>
                                    setMessageContent(e.target.value)
                                }
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Gửi
                            </Button>
                        </form>
                    </footer>
                </div>
            ) : (
                <div className="mt-2 px-2">
                    <Alert variant="filled" severity="info">
                        Chọn phòng để bắt đầu.
                    </Alert>
                </div>
            )}
            <AddMemberModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
            />
        </>
    );
}
