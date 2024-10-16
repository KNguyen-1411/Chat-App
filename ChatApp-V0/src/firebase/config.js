// Import Firebase và các dịch vụ cần thiết
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Nếu bạn cần sử dụng analytics

// Khởi tạo các dịch vụ Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// Xuất các dịch vụ
export { db, auth };
export default app;
