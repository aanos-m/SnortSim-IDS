import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase';

const CreateAccountForm = () => {

  const inputStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', 
    padding: '10px',gap: '10px', borderRadius: 20, border: 'none',
    color: '#000', fontSize: '15px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', width: '400px'
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
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');


  const onSubmit = async (e) => {
    e.preventDefault()
   
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/home")
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });
  }


  return (
    <form style={wrapper}>                                                                                            
      <div style={container}>
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

        <button onClick={() => navigate("/")}  style={signUpBtn} >Sign In</button>
      </div> 
    </form>
  )
}

export default CreateAccountForm