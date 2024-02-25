import React from 'react'
import Footer from '../../components/Utils/Footer'
import Header from '../../components/Utils/Header'
import { useNavigate } from 'react-router-dom'

const Module1 = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header/>
      <button onClick={() => navigate('/home')}>Go back to home </button>
      Module1
      <div style={{position: 'fixed', bottom: 0, width: '100%' }}>
        <Footer/>
      </div>
    </div>
  )
}

export default Module1