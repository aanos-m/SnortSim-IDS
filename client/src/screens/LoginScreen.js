import React from 'react'
import Header from '../components/Utils/Header'
import LoginForm from '../components/Login/LoginForm'
import Footer from '../components/Utils/Footer'

const LoginScreen = () => {
  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between', height: '100vh' }}>
        <Header/>
        <LoginForm/>
        <Footer/>
    </div>
  )
}

export default LoginScreen