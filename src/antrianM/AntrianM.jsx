import React, { useEffect, useState } from 'react';
import axios from "axios";
import useSWR from "swr";

const KarcisList = ()=>{
    const [data, setData] = useState([])
    const [fetchLagi, setFetchLagi] = useState(false)

    // const socket = new WebSocket('ws://localhost:8000/antrian/v1/antrian/user-id?loket_id=1&token=eyJhbGciOiJFUzI1NiIsInR5cCI6ImFjY2Vzc190b2tlbiJ9.eyJleHAiOjE3Mzk3NDcxMDEsImlzcyI6ImFudHJpYW5hY2Nlc3MiLCJzdWIiOiIxIiwia2V5IjoiYW50cmlhbmFjY2VzczoxOmFjY2Vzc190b2tlbiJ9.9kGDPGIQow0kv5rGoLLXQ2VGW0TP3t0Ji1wdkpISrQqBMAOKWPuj3qFul1i362BY_jdCH-EUQ0sj1W2buMoj5g');
    const fetcher2 = async(id)=>{
        const socket2 = new WebSocket('wss://antrian-online.onrender.com/antrian/v1/loket/user-id');
        socket2.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket2.onopen = ()=>{
            setTimeout(()=>{

                socket2.send(JSON.stringify({"type":"insert-antrian","body":{"tipe_pasien_id":id}}))
            },300)

        }
        socket2.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Real-time update:', data);
            if(data.type=="selesai" || data.type=="panggil" || data.type=="insert-antrian"){
                setFetchLagi(!fetchLagi)
            }
        };

                   
    }

    const fetcher = async()=>{
        


        // socket.onopen = () => {
        //     console.log('WebSocket connection established');
        //     setTimeout(()=>{

        //         socket.send(JSON.stringify({"type":"register","tipe_pasien_id":1}))
        //     },1000)
        // };

        // socket.onmessage = (event) => {
        //     const data = JSON.parse(event.data);
        //     console.log('Real-time update:', data);
        // };
        

        // socket.onerror = (error) => {
        //     console.error('WebSocket error:', error);
        // };

        // socket.onclose = () => {
        //     console.log('WebSocket connection closed');
        // };

    };

    useEffect(()=>{
        axios.get("https://antrian-online.onrender.com/antrian/v1/tipe_pasien/list").then((res)=>{
            setData(res?.data?.data)
            
        })
            
        // {headers:{"Authorization":"eyJhbGciOiJFUzI1NiIsInR5cCI6ImFjY2Vzc190b2tlbiJ9.eyJleHAiOjE3Mzk3NDcxMDEsImlzcyI6ImFudHJpYW5hY2Nlc3MiLCJzdWIiOiIxIiwia2V5IjoiYW50cmlhbmFjY2VzczoxOmFjY2Vzc190b2tlbiJ9.9kGDPGIQow0kv5rGoLLXQ2VGW0TP3t0Ji1wdkpISrQqBMAOKWPuj3qFul1i362BY_jdCH-EUQ0sj1W2buMoj5g"}}

    
        
    },[fetchLagi])
   
    if (!data) {

        return (<div>
            {/* <button onClick={()=>{
                socket.send(JSON.stringify({"type":"call","tipe_pasien_id":1}))
            }}>Send</button>
            <button onClick={()=>{
               
            }}>daftar</button> */}
            <h2>loading ..... ....... ......</h2></div>)
    }

    return(
    <>
        <header className="App-header">
            
          
            <h4 style={{ marginTop:"0px",marginBottom:"40px" }}>SILAHKAN AMBIL NO ANTRIAN DISINI</h4>
            <div className="Karcis-container">
                {data?.map((antrians, index)=>(
                <div onClick={()=>{fetcher2(antrians.id)}} className="Karcis-wrapper" key={antrians.id}>
                    <div className="Karcis-tittle">{antrians.name}</div>
                    
                    

                </div>

                ))}
                
            </div>
        </header>
    </>
    )
}

export default KarcisList