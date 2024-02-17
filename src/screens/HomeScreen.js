import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Utils/Header'
import ModuleCard from '../components/Home/ModuleCard';


const HomeScreen = () => {

  const upperContainer = { 
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '12px', 
    padding: '10px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    borderRadius: 15, alignItems: 'center',
  }
  const lowerContainer = { 
    display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '12px', 
    padding: '10px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    borderRadius: 15, alignItems: 'center',
  }

  const navigate = useNavigate();
  const [getName, setName] = useState('')

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User

          setName(user.displayName)

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
        console.log("logout message:", error.message)
      });
  }

  return (
    <div>
      <Header/>
      <div style={upperContainer}>
        <span style={{fontWeight: 'bold',}}> {getName}</span>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div style={lowerContainer}>
        <ModuleCard/>
      </div>
      
    </div>
  )
}

export default HomeScreen