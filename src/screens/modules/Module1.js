import React from 'react'
import Footer from '../../components/Utils/Footer'
import Header from '../../components/Utils/Header'

const Module1 = () => {
  return (
    <div>
      <Header/>
      Module1
      <div style={{position: 'fixed', bottom: 0, width: '100%' }}>
        <Footer/>
      </div>
    </div>
  )
}

export default Module1