import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBOW-R4CNd49KqXZtizI8ZRylv0F4QIi_A",
    authDomain: "olx-clone-project-570b1.firebaseapp.com",
    projectId: "olx-clone-project-570b1",
    storageBucket: "olx-clone-project-570b1.appspot.com",
    messagingSenderId: "927891394022",
    appId: "1:927891394022:web:2be05fdd51addd190eda27",
    measurementId: "G-BBD6Q7RDMT"
  };

 export default firebase.initializeApp(firebaseConfig)