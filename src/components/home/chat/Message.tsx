import React from 'react';
import { IMessage } from '@/types/User';
import { Avatar } from '@mui/material';
interface MessageProps {
    message: IMessage;
}
export default function Message({ message }: MessageProps) {
    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <div className="flex  items-center flex-1">
                    <Avatar src={message?.photoURL} alt={message?.name}>
                        {message?.name[0].toUpperCase()}
                    </Avatar>
                    <div className="ms-2">
                        <h4 className="text-slate-500 text-xs mt-2 ms-1">
                            {message.name}
                        </h4>
                        <div className="ms-1 mt-1 px-3 py-1 rounded-xl flex items-center bg-gray-200">
                            <p>{message?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-auto text-sm text-slate-500">
                    {message?.time}
                </div>
            </div>
        </>
    );
}
