import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import { useReactToPrint } from "react-to-print";
//import { ScaleLoader } from 'react-spinners';
// import useSWR from "swr";

const KarcisList = ()=>{
    const [data, setData] = useState([])
    //const [loading, setLoading] = useState(false)

  
    const [fetchLagi, setFetchLagi] = useState(false)

    const componentRef = useRef(null);

    const handleAfterPrint = React.useCallback(() => {
        //setLoading(false)
        
          componentRef.current.innerHTML =""
      console.log("`onAfterPrint` called");
    }, []);
  
    const handleBeforePrint = React.useCallback(() => {
        
      return Promise.resolve();
    }, []);
  
    const printFn = useReactToPrint({
      contentRef: componentRef,
      documentTitle:"",
      pageStyle:"@page { margin:0.3in;size: 2.28346in 2.28346in}  body{margin:0}",
      onAfterPrint: handleAfterPrint,
      onBeforePrint: handleBeforePrint,
    });
  

    // const socket = new WebSocket('ws://localhost:8000/antrian/v1/antrian/user-id?loket_id=1&token=eyJhbGciOiJFUzI1NiIsInR5cCI6ImFjY2Vzc190b2tlbiJ9.eyJleHAiOjE3Mzk3NDcxMDEsImlzcyI6ImFudHJpYW5hY2Nlc3MiLCJzdWIiOiIxIiwia2V5IjoiYW50cmlhbmFjY2VzczoxOmFjY2Vzc190b2tlbiJ9.9kGDPGIQow0kv5rGoLLXQ2VGW0TP3t0Ji1wdkpISrQqBMAOKWPuj3qFul1i362BY_jdCH-EUQ0sj1W2buMoj5g');
    const fetcher2 = async(id)=>{
        const socket2 = new WebSocket('wss://antrian-online.onrender.com/antrian/v1/loket/user-id');
        socket2.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socket2.onopen = ()=>{
            setTimeout(()=>{

                socket2.send(JSON.stringify({"type":"insert-antrian","body":{"tipe_pasien_id":id}}))
                //setLoading(true)
            },300)

        }
        socket2.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Real-time update:', data);
            if(data.type==="selesai" || data.type==="panggil" || data.type==="insert-antrian"){
                setFetchLagi(!fetchLagi)
            }

            if( data.type==="insert-antrian"){
                componentRef.current.innerHTML =`<h2><b>NOMOR ANTRIAN</b></h2><h1 style="font-size:40px;font-weight:660;margin-top:-20px">${data?.data?.number}</h1><h3 style="margin-top:-30px">${data?.data?.loket}</h3><h4 style="margin-top:-20px">Harap Menunggu gilirian Anda</h4><h4 style="margin-top:-25px">TERIMA KASIH</h4>`
                
                printFn()
            }
        };

                   
    }

    // const fetcher = async()=>{
        


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

    // };

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
            {/* {loading?<div style={{position:'fixed', left:0, right:0,top:0, bottom:0, zIndex:10, background:'rgba(0,0,0,0.4)', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <ScaleLoader height={100} width={40} size color='white'></ScaleLoader>
            </div>:""} */}
                    <div style={{minHeight:'100vh', display:'flex', justifyContent:'center', alignContent:'center', flexDirection:'column'}}>
                    <h4 style={{ marginTop:"0px",marginBottom:"40px" }}>SILAHKAN AMBIL NO ANTRIAN DISINI</h4>
                    <div className="Karcis-container" >
                        {data?.map((antrians, index)=>(
                        <div onClick={()=>{fetcher2(antrians.id)}} className="Karcis-wrapper" key={antrians.id}>
                            <div className="Karcis-tittle">{antrians.name}</div>
                        
                            

                        </div>

                        ))}
                        
                    </div>
                    </div>
                    <div ref={componentRef} style={{marginTop:'0px',display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        
                    </div>
            
        </header>
    </>
    )
}

export default KarcisList