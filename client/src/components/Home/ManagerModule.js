import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const inputStyle = {
    display: 'flex', justifyContent: 'center', alignItems: 'center', width: '400px',
    padding: '10px',gap: '10px', borderRadius: 20, border: 'none',
    color: '#000', fontSize: '15px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', overFlowY: 'scroll'
  } 

const addBtn = { 
    backgroundColor:'#00D816', color: 'white', justifyContent: 'center', alignItems: 'center', height: '35px', width: '200px' ,fontWeight: 'bold',
    borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
}

const delBtn = { 
    backgroundColor:'#FF0C0C', color: 'white', justifyContent: 'center', alignItems: 'center', height: '35px', width: '200px' ,fontWeight: 'bold',
    borderRadius: 20, fontSize: 20, border: 'none', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
}

const container = { display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center'}

const moduleContainer = { 
    display: 'flex', flexDirection: 'row', 
    flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#dcdcdc', padding: '8px', margin: '8px', borderRadius: '20px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
}
const inputWrapper = {
    display: 'flex', flexDirection: 'column', width: '100%',
    padding: '10px', margin: '8px', borderRadius: 20, gap: '8px',
    justifyContent: 'center', alignItems: 'center', justifySelf : 'center',
    backgroundColor: '#dcdcdc', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
}
const moduleWrapper = {
    display: 'flex', flexDirection: 'column', 
    padding: '10px', margin: '5px', gap: '10px', 
    borderRadius: 20, boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#fff', textWrap: 'wrap', width: '400px', height: '250px'
}


const ManagerModule = () => {
    
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/modules");
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addModule = async () => {
        try {
            const response = await fetch("http://localhost:3001/modules", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, description })
            });
            const data = await response.json();
            console.log(data); // Log response from the server
            
            fetchData();
            setName('');
            setDescription('')
        } catch (error) {
            console.error('Error adding module:', error);
        }
    };

    const deleteModule = async (moduleId) => {
        try {
            const response = await fetch(`http://localhost:3001/modules/${moduleId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data); // Log response from the server
            fetchData();
        } catch (error) {
            console.error('Error deleting module:', error);
        }
    };

    return (
        <div style={container}> 
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <div style={inputWrapper}>
                        <h1>Welcome Manager!</h1>

                        <input type="text" placeholder='Module Number' value={name} onChange={(e) => setName(e.target.value)}  style={inputStyle}/>

                        <textarea type="text" placeholder='Module Description' value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle}/>

                        <button onClick={addModule} style={addBtn}>Add Module</button>
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

                                    <button onClick={() => deleteModule(item.id)} style={delBtn}>Delete</button>
                                    <button onClick={() => navigate(`/${item.name}` )} style={addBtn}>Open</button>

                                </span>  
                                
                            </div>
                        ))
                    ) : (
                        <span style={{fontWeight: 'bold', fontSize: '22px', padding: '2px'}}> No Modules Created </span>
                    )
                }               
            </div>    
        </div>
    );
};

export default ManagerModule;
