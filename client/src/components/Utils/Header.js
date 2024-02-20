import React, { useState, useEffect } from 'react'
import snort from '../../assests/snort.png'
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../firebase';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {

  const [showAccount, setShowAccount] = useState(false)

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setShowAccount(true)
        } else {
          // User is signed out
          setShowAccount(false)
        }
      });
    }, [])

    const handleAccountPageRoute = () => {
      alert("take me to profile page")
    }

  return (
    <div style={{ display: 'flex', backgroundColor: '#FF0C0C', height: 80, marginBottom: 8, alignItems: 'center'}}>

      { showAccount ? (
          <div style={{ display: 'flex', width: '100vw', justifyContent: 'space-between', alignItems: 'center'}}>
              <AccountCircleIcon fontSize='large' sx={{color:'#fff', paddingRight: '12px', opacity: 0}}/>

              <img src={snort} alt='snort img' width={150} height={100} sizes='small'/>
              <AccountCircleIcon fontSize='large' sx={{color:'#fff', paddingRight: '18px'}} onClick={handleAccountPageRoute} />
              
          </div>
      ) : (
          <div style={{ display: 'flex', width: '100vw', justifyContent: 'center', alignItems: 'center'}}>

            <img src={snort} alt='snort img' width={150} height={100} sizes='small'/>
              
          </div>
        )
      }

      
    </div>
  )
}

export default Header