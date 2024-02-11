import React, { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {  signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Utils/Header'
import ModuleCard from '../components/Home/ModuleCard';
const HomeScreen = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid:", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
    }, [])

    const handleLogout = () => {               
      signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
      // An error happened.
      });
  }

  return (
    <div>
      <Header/>
      <button onClick={handleLogout}>
        Logout
      </button>
      <ModuleCard/>
    </div>
  )
}

export default HomeScreen