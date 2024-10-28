import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyBpAsgWj2dQzpgtrPLowyzhMwy4f7HIoB0",
  authDomain: "netflix-clone-8469f.firebaseapp.com",
  projectId: "netflix-clone-8469f",
  storageBucket: "netflix-clone-8469f.appspot.com",
  messagingSenderId: "321192492914",
  appId: "1:321192492914:web:661045cb079fea877c27eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        // toast.error(error.code);
    }
}


const login = async (email, password) => {
    try {
       await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
       console.log(error) ;
    //    toast.error(error.code);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}