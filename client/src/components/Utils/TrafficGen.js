import React, { useEffect, useState } from 'react';

const TrafficGen = () => {

  const [data, setData] = useState([]);
  const [showLoggerMode, setShowLoggerMode] = useState(false);

    //   useEffect(() => {
    //     fetch("/sniff").then(
    //         res => res.json()
    //     ).then(
    //         data => {
    //             setData(data.packets)
    //         }
    //     )
    //   }, []);
    //   console.log("packets data", data)

    const fetchdata = () => {
        fetch("/sniff").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
            }
        )
    }

    const loggerMode = () => {
        return (
            <ul>
                {data["packets"].map((packet, index) => (
                    <li key={index}>{packet}</li>
                ))}
            </ul>
        )
    }

    const toggleLogger = () => {
        setShowLoggerMode(prevState => !prevState);
    }
    return (
        <div>
            <h1>Intrusion Detection System Simulation</h1>
            <h2>Simulation Output:</h2>

            <button onClick={fetchdata}> Sniff Packets</button>

            <div>
                { 
                    data.length <= 0 ? 
                        (
                            <span> Waiting to Sniff Packets ... </span> 
                        ) : (
                            <div style={{display: 'flex', flexDirection:'column', gap: '8px'}}>  
                                Packet Sniffing Successful ... 
                                <button onClick={toggleLogger}>Logger mode</button>
                                {showLoggerMode && loggerMode()}
                            </div> 
                    )
                }
            </div>
        </div>
    );
}

export default TrafficGen;
