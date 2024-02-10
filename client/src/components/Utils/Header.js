import React from 'react'
import snort from '../../assests/snort.png'
const Header = () => {
  return (
    <div style={{ display: 'flex', backgroundColor: '#FF0C0C', height: 80, marginBottom: 8, justifyContent: 'center', alignItems: 'center'}}>
        <img src={snort} alt='snort img' width={150} height={100} sizes='small'/>
    </div>
  )
}

export default Header