'use client';
import Sidebar from './sidebar';
import ChatWindow from './chat';
import './layout.scss';
import { useAppData } from '@/context/AppData';
export default function Home() {
    const { openSidebar } = useAppData();
    return (
        <div className={`${openSidebar ? 'sidebarOn' : 'sidebarOff'} app-main`}>
            <aside className="min-h-screen">
                <Sidebar />
            </aside>
            <main className="grid">
                <ChatWindow />
            </main>
        </div>
    );
}
