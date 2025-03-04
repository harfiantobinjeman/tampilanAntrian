import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
// import useSWR from "swr";
let socket2 = new WebSocket("ws://localhost:8000/antrian/v1/loket/user-id")
const OperatorList = ()=>{
    const [data,setData] = useState([])
    const [fetchLagi, setFetchLagi] = useState(false)
    const [onPanggil, setOnPanggil] = useState(false)
    const [token,setToken] = useState("")
    const [loketId,setLoketId] = useState(0)
    const [boleh, setBoleh] = useState(false)
    const query = new URLSearchParams(window.location.search);
    useEffect(()=>{
        setData([])
        if(localStorage.getItem("loket_id")){
            setToken(localStorage.getItem("token"))
            // setTimeout(()=>{
            //     setFetchLagi((y)=>!y)
            // },1000) 

            setLoketId(parseInt(localStorage.getItem("loket_id")))
        }
        
        if(!localStorage.getItem("token")){
          
               
            window.location = "/login";
                
            
        }

    },[])
    useEffect(()=>{
        if(token && loketId){
           
        
        socket2 = new WebSocket(`ws://localhost:8000/antrian/v1/loket/user-id?loket_id=${loketId}&token=${token}`);

        socket2.onopen = () => {
                console.log('WebSocket connection established');
                setTimeout(()=>{
                    
                    socket2.send(JSON.stringify({"type":"register","tipe_pasien_id":loketId}))
                },1000)
        };
        socket2.onclose = () => {
            console.log('WebSocket connection closed');
        };
        socket2.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Real-time update:', data);
            if(data.type==="selesai" || data.type==="panggil"  || data.type==="insert-antrian" || data.id==2){
               
                setFetchLagi((y)=>!y)
            }
            if(data.message=="loket sudah di pakai"){
                toast.error("error, loket sudah di pakai")
                localStorage.removeItem("loket_id")
                setTimeout(()=>{
                    window.location="/pilihloket"
                },2000)
            }
            if(data?.id==loketId && data?.username=="boleh"){
                setBoleh(true)
            }
        };
    }
    },[token,loketId])
    

    useEffect(()=>{
        
        setData([])
        if(token){
            axios.get('http://localhost:8000/antrian/v1/antrian/list',{headers:{"Authorization":"Bearer "+token}}).then(res=>{
            if(res?.data?.data){
                console.log(res?.data?.data)
                setData(()=>res?.data?.data)
            }
        }).catch(err=>{
            console.log(err)
        })
        }
    },[fetchLagi, token, loketId])
   
    useEffect(()=>{
        if(data.length && loketId && token){
            let lll = 0
            data?.map((aav,ak)=>{
                if(aav.status==='call' && aav.loket_id===loketId){
                    lll++    
                    setOnPanggil(true) 
                } 
               
            })
           if(!lll){
                setOnPanggil(false)

            }
           
        }
    },[JSON.stringify(data), fetchLagi,loketId, token])
   

    return(
    <>
        <header className="App-header">
            {!boleh?<div style={{position:'fixed', left:0,right:0, top:0, bottom:0,zIndex:999999999, background:'rgba(0,0,0,0.5)'}}></div>:""}
            <button onClick={()=>{localStorage.removeItem("token"); window.location = "/login";}}>Logout</button>
          
            <h4 style={{ marginTop:"0px",marginBottom:"40px" }}>Pilih Panggil Loket {loketId}</h4>
            <div className="Karcis-container">
                {data?.length && data?.map((antrians, index)=>(
                    
                <div  className="Karcis-wrapper" key={antrians.id}>
                    <div className="Karcis-tittle">{antrians.tipe_pasien_name}</div>
                    <div className="Karcis-tittle">{antrians.number}</div>
                    <div className="Karcis-tittle">Sisa : {antrians.count}</div>

                    <button disabled={(antrians.loket_id===loketId && onPanggil) || (antrians.loket_id!==loketId && onPanggil) } onClick={()=>{
                        socket2.send(JSON.stringify({
                            "type":"call",
                            "body":{
                                "tipe_pasien_id":antrians.tipe_pasien_id,
                                "id":antrians.id,
                                "loket_id":loketId, 
                            }
                        }))
                    }}>Panggil</button>
                    <button disabled={ (antrians.loket_id!==loketId && onPanggil) || !onPanggil }  onClick={()=>{
                        socket2.send(JSON.stringify({
                            "type":"selesai",
                            "body":{
                                "tipe_pasien_id":antrians.tipe_pasien_id,
                                "id":antrians.id,
                                "loket_id":loketId, 
                            }
                        }))
                    }}>Selesai</button>

                </div>

                ))}
                
            </div>
            <ToastContainer></ToastContainer>
        </header>
    </>
    )
}

export default OperatorList