import React from 'react'
import Footer from '../../components/Utils/Footer'
import Header from '../../components/Utils/Header'
import { useNavigate } from 'react-router-dom'
import TrafficGen from '../../components/Utils/TrafficGen'

const Module1 = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Header/>
      
      <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '12px'}}>

        <button onClick={() => navigate('/home')} style={{ width: '400px'}}>Go back to home </button>

        Module1

        <TrafficGen/>
      </div>
      
      <div style={{position: 'fixed', bottom: 0, width: '100%' }}>
        <Footer/>
      </div>
    </div>
  )
}

export default Module1