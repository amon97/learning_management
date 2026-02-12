import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyA_S96CDCkbMD_bZLxbjxcl2adZCPsG3Rc",
    authDomain: "learning-management-448a6.firebaseapp.com",
    projectId: "learning-management-448a6",
    storageBucket: "learning-management-448a6.firebasestorage.app",
    messagingSenderId: "483644729002",
    appId: "1:483644729002:web:47c435086f7c2ecdf492d3",
    measurementId: "G-XSJ7S618B6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, analytics };
