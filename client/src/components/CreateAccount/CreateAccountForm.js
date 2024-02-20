import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, addDoc, collection } from "firebase/firestore"; 

import { auth } from '../../firebase';


const CreateAccountForm = () => {

  const inputStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', 
    padding: '10px',gap: '10px', borderRadius: 20, border: 'none',
    color: '#000', fontSize: '15px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', width: '400px'
  } 

  const dropDownStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    padding: '10px', borderRadius: 20, border: 'none',
    fontSize: '15px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', width: '200px',
  } 
  

  const wrapper = {
    display: 'flex', flexDirection: 'column', 
    justifyContent: 'center', 
  }

  const container = {
    display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center', alignSelf: 'center', 
    padding: '20px', margin: '8px', gap: '16px', borderRadius: '20px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#dcdcdc'
  }

  const logInBtn = { 
    backgroundColor:'#00D816', color: 'white', justifyContent: 'center', alignItems: 'center', height: '35px', width: '100%', fontWeight: 'bold',
    borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
  }

  const signUpBtn = { 
    backgroundColor:'#FF0C0C', color: 'white', justifyContent: 'center', alignItems: 'center', height: '35px', width: '100%', fontWeight: 'bold',
    borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', textDecoration: 'none'
  }

  const navigate = useNavigate();
  
  const db = getFirestore();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const authUser = await createUserWithEmailAndPassword(auth, email, password, name, role)
      await updateProfile(authUser.user, { displayName: name })
      
      const docRef = await addDoc(collection(db, "userInfo"), {
        owner_uid: authUser.user.uid,
        email: email,
        fullname: name,
        role: role
      })

      if (docRef) {
        navigate("/home")
      }

    } catch (error) {
      console.log(error.code, error.message);
      // ..
    };
  }


  return (
    <form style={wrapper}>                                                                                            
      <div style={container}>
        <div style={{display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center',}}>
          <label style={{fontSize: '18px'}}>Choose your role </label>
          <select name="role" id="role" onChange={(e) => setRole(e.target.value)} style={dropDownStyle}>
            <option value="empty"/>
            <option value="manager">Manager</option>
            <option value="learner">Learner</option>
          </select>
        </div>
      
        <input
            type="text"
            id="name"
            name="name"
            required      
            value={name}      
            onChange={(e) => setName(e.target.value)}                          
            placeholder="Full Name"
            pattern="^(\w\w+)\s(\w+)$"  
            style={inputStyle}   
        />

        <input
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            required                                    
            placeholder="Email Address"  
            style={inputStyle}       
        />

        <input
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required                                 
            placeholder="Password"           
            style={inputStyle}     
        />

        <button type="submit" onClick={onSubmit} style={logInBtn}>  
            Sign up                                
        </button>

        <span style={{ marginTop: '20px'}}>                                    
          Already have an account?{' '}
        </span>

        <button onClick={() => navigate("/")}  style={signUpBtn} >Log In</button>
      </div> 
    </form>
  )
}

export default CreateAccountForm