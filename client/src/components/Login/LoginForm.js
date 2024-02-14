import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom'
// import validator from 'email-validator'


const LoginForm = () => {

    const inputStyle = {
        display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', 
        padding: '10px',gap: '10px', borderRadius: 20, border: 'none',
        color: '#000', fontSize: '15px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', width: '400px',
    }

    const logInBtn = { 
        backgroundColor:'#00D816', color: 'white', justifyContent: 'center', alignItems: 'center', height: '35px', width: '100%', fontWeight: 'bold',
        borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
    }

    const signUpBtn = { 
        backgroundColor:'#FF0C0C', color: 'white', justifyContent: 'center', alignItems: 'center', height: '35px', width: '100%', fontWeight: 'bold',
        borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', textDecoration: 'none'
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

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();

        // Validate email before proceeding
        // if (!validator.validate(email)) {
        //     alert('Please enter a valid email address');
        //     return;
        // }

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            alert('Please fill out all the fields')
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }

    return (                                                                         
        <form style={wrapper}>                                              
            <div style={container}>
                <input
                    id="email-address"
                    placeholder="Email Address"
                    name="email"
                    type="email"                                    
                    required                                                                                
                    onChange={(e)=>setEmail(e.target.value)}
                    style={inputStyle}
                />
                <input
                    id="password"
                    name="password"
                    type="password"                                    
                    required                                                                                
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    style={inputStyle}
                />
                <button onClick={onLogin} style={logInBtn}>      
                    Login                                                                  
                </button>
                <span style={{ marginTop: '20px'}}>
                    No account yet? {' '} 
                </span>
                <button onClick={() => navigate("/signup")}  style={signUpBtn} >Create Account</button>
            </div>  
        </form>                    
    )
}



export default LoginForm