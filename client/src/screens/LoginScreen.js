import React from 'react'
import Header from '../components/Utils/Header'
import LoginForm from '../components/Login/LoginForm'

const LoginScreen = () => {
  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between', flex: 1}}>
        <Header/>
        <LoginForm/>
    </div>
  )
}

export default LoginScreen