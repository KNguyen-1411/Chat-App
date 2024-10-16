import { Col, Row } from 'react-bootstrap';
import SideBar from './SiderBar/SideBar';
import ChatWindow from './Chat/ChatWindow';
import style from './home.module.scss';
export default function Home() {
    return (
        <div className={style.app}>
            <SideBar />
            <main>
                <ChatWindow />
            </main>
        </div>
    );
}
