// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7PeuHIl3dL20pQsXEIVi_mx47KzQJVqw",
  authDomain: "chatee-ffe9d.firebaseapp.com",
  projectId: "chatee-ffe9d",
  storageBucket: "chatee-ffe9d.firebasestorage.app",
  messagingSenderId: "101799373450",
  appId: "1:101799373450:web:51c38cb99de512b4ccdb73",
  measurementId: "G-LYEWJ377TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, app, analytics };
