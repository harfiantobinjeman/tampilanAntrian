import React, { useEffect, useState } from 'react';
import axios from "axios";
// import useSWR from "swr";
const socket2 = new WebSocket('wss://antrian-online.onrender.com/antrian/v1/loket/user-id?loket_id=1&token=eyJhbGciOiJFUzI1NiIsInR5cCI6ImFjY2Vzc190b2tlbiJ9.eyJleHAiOjE3Mzk3NDcxMDEsImlzcyI6ImFudHJpYW5hY2Nlc3MiLCJzdWIiOiIxIiwia2V5IjoiYW50cmlhbmFjY2VzczoxOmFjY2Vzc190b2tlbiJ9.9kGDPGIQow0kv5rGoLLXQ2VGW0TP3t0Ji1wdkpISrQqBMAOKWPuj3qFul1i362BY_jdCH-EUQ0sj1W2buMoj5g');

const OperatorList = ()=>{
    const [data,setData] = useState([])
    const [fetchLagi, setFetchLagi] = useState(false)
    const [onPanggil, setOnPanggil] = useState(false)
    useEffect(()=>{
        socket2.onclose = () => {
            console.log('WebSocket connection closed');
        };
        socket2.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Real-time update:', data);
            if(data.type==="selesai" || data.type==="panggil"  || data.type==="insert-antrian"){
               
                setFetchLagi((y)=>!y)
            }
        };
    },[])
    

    useEffect(()=>{
        setData([])
       axios.get('https://antrian-online.onrender.com/antrian/v1/antrian/list').then(res=>{
        if(res?.data?.data){
            
            setData(res?.data?.data)
        }
       }).catch(err=>{
        console.log(err)
       })
    },[fetchLagi])
   
    useEffect(()=>{
        if(data.length){
            let lll = 0
            data?.map((aav,ak)=>{
                if(aav.status==='call' && aav.loket_id===1){
                    lll++    
                    setOnPanggil(true) 
                } 
               
            })
           if(!lll){
                setOnPanggil(false)

            }
            return ""
        }
    },[JSON.stringify(data), fetchLagi])
   

    return(
    <>
        <header className="App-header">
            
          
            <h4 style={{ marginTop:"0px",marginBottom:"40px" }}>Pilih Panggil</h4>
            <div className="Karcis-container">
                {data?.map((antrians, index)=>(
                    
                <div  className="Karcis-wrapper" key={antrians.id}>
                    <div className="Karcis-tittle">{antrians.tipe_pasien_name}</div>
                    <div className="Karcis-tittle">{antrians.number}</div>
                    <div className="Karcis-tittle">Sisa : {antrians.count}</div>

                    <button disabled={(antrians.loket_id===1 && onPanggil) || (antrians.loket_id!==1 && onPanggil) } onClick={()=>{
                        socket2.send(JSON.stringify({
                            "type":"call",
                            "body":{
                                "tipe_pasien_id":antrians.tipe_pasien_id,
                                "id":antrians.id,
                                "loket_id":1, 
                            }
                        }))
                    }}>Panggil</button>
                    <button disabled={ (antrians.loket_id!==1 && onPanggil) || !onPanggil }  onClick={()=>{
                        socket2.send(JSON.stringify({
                            "type":"selesai",
                            "body":{
                                "tipe_pasien_id":antrians.tipe_pasien_id,
                                "id":antrians.id,
                                "loket_id":1, 
                            }
                        }))
                    }}>Selesai</button>

                </div>

                ))}
                
            </div>
        </header>
    </>
    )
}

export default OperatorList