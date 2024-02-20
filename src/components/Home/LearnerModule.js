import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const moduleContainer = { 
    display: 'flex', flexDirection: 'row', 
    flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#dcdcdc', padding: '8px', margin: '8px', borderRadius: '20px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
}

const moduleWrapper = {
    display: 'flex', flexDirection: 'column', 
    padding: '10px', margin: '5px', gap: '10px', 
    borderRadius: 20, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff', textWrap: 'wrap', width: '400px', height: '250px'
}

const openModule = { 
    backgroundColor:'#00D816', color: 'white', justifyContent: 'center', alignItems: 'center', height: '35px', width: '200px' ,fontWeight: 'bold',
    borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
}

const container = { display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}

const inputWrapper = {
    display: 'flex', flexDirection: 'column', width: '100%',
    padding: '10px', margin: '8px', borderRadius: 20, gap: '8px',
    justifyContent: 'center', alignItems: 'center', justifySelf : 'center',
    backgroundColor: '#dcdcdc', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
}

const LearnerModule = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/modules");
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  return (
    <div style={container}>
        <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <div style={inputWrapper}>
                    <h1>Welcome Learner!</h1>
                </div>
            </div>
        <div style={moduleContainer}>
                {
                    data.length >= 1 ?
                    
                    (
                        data.map(item => (
                            <div key={item.id} style={{...moduleWrapper}}>
                                <p style={{ fontSize: '20px', fontWeight: 'bold'}}> {item.name} </p>
                                <span style={{fontSize: '16px', overflowY: 'scroll', marginBottom: '4px', height: '150px'}}> {item.description} </span>
                                <span style={{display: 'flex', flexDirection: 'row', gap: '8px'}}>

                                    <button onClick={() => navigate(`/${item.name}` )} style={openModule}>Open</button>

                                </span>  
                                
                            </div>
                        ))
                    ) : (
                        <span style={{fontWeight: 'bold', fontSize: '22px', padding: '2px'}}> No Modules Created </span>
                    )
                }               
            </div>
    </div>
  )
}

export default LearnerModule