import React from 'react'
import Header from '../components/Utils/Header'
import CreateAccountForm from '../components/CreateAccount/CreateAccountForm'
import Footer from '../components/Utils/Footer'

const CreateAccountScreen = () => {
  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'space-between', height: '100vh' }}>
      <Header/>
      <CreateAccountForm/>
      <Footer/>
    </div>
  )
}

export default CreateAccountScreen