import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import '../../../../css/chat.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { t } from "i18next";

window.Pusher = Pusher;

const Chat = ({ initialMessages, authUser, receiver, messages }) => {
    const [allMessages, setMessages] = useState(initialMessages || messages);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const echo = window.Echo.channel(`chat.${authUser.id}.${receiver.id}`)
            .listen('.message.sent', (e) => {
                setMessages((prevMessages) => [...prevMessages, e.message]);
            });

        return () => {
            echo.stopListening('.message.sent');
        };
    }, [authUser.id, receiver.id]);

    const sendMessage = () => {
        if (newMessage.trim() === '') return;

        Inertia.post('/messages', {
            message: newMessage,
            receiver_id: receiver.id
        }, {
            onSuccess: () => setNewMessage(''),
        });
    };

    return (
        <AuthenticatedLayout
            headTitle='Chat'
            header={
                <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
                    {t('user.list')}
                </h2>
            }
        >
            <h1>Chat with {receiver.firstname} {receiver.lastname}</h1>
            <ul className="messages-list">
                {allMessages.map((message, index) => (
                    <li key={index}>
                        <strong>{message.user.firstname}:</strong> {message.message}
                    </li>
                ))}
            </ul>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                    className="message-input"
                />
                <button onClick={sendMessage} className="send-button">Send</button>
            </div>
        </AuthenticatedLayout>
    );
};

export default Chat;
