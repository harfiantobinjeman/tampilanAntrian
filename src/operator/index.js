import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import Button from '@mui/material/Button';
import './style4.css'
import './css.css'
import { RiCreativeCommonsByFill } from "react-icons/ri";
import { AiFillInsurance } from "react-icons/ai";
import { MdHealthAndSafety } from "react-icons/md";
import { FaHeartCircleCheck } from 'react-icons/fa6';
import Health from './../images/The_plate.jpg'
import Health2 from './../images/doctors-visit-treating-patient_37895-279.jpg'
import Profile from './../images/man.png'
import { MdClose } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { PacmanLoader, SyncLoader } from "react-spinners";
import { FaLock, FaPersonBooth } from "react-icons/fa";
// import useSWR from "swr";
let socket2 = new WebSocket(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL_WS}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/loket/user-id`)
const OperatorList = ()=>{
    const [data,setData] = useState([])
    const [fetchLagi, setFetchLagi] = useState(false)
    const [onPanggil, setOnPanggil] = useState(false)
    const [token,setToken] = useState("")
    const [loketId,setLoketId] = useState(0)
    const [boleh, setBoleh] = useState(false)

      const [showProfile, setShowProfile] = useState(false)
        const [profile,setProfile] = useState({})
        const [password,setPassword] = useState("")
        const [showpassword,setshowPassword] = useState(false)
        const [loading, setLoading] = useState(false)
   
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
        if(token){
            
                        setProfile({})
                        axios.get(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/admin/user/profile`,{headers:{Authorization:"Bearer "+token}}).then((res)=>{
                            if(res?.data?.data){
                                
                            
                                setProfile(res?.data?.data)
                                
            
                            }
                        }).catch(err=>{
                            
                            if(err?.response?.status==401){
                                window.location = "/login"
                            }
                        }).finally(()=>{
                            // setDataLoketLoading(false)
            
                        })
        }
    },[token])
    useEffect(()=>{
        if(token && loketId){
           
        
        socket2 = new WebSocket(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL_WS}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/loket/user-id?loket_id=${loketId}&token=${token}`);

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
            axios.get(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/antrian/list`,{headers:{"Authorization":"Bearer "+token}}).then(res=>{
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
    const handleSavePassword = ()=>{
        setLoading(true)
        axios.post(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/admin/user/change-password`,{password:password,id:jwtDecode(token)?.sub?parseInt(jwtDecode(token)?.sub):0},{headers:{Authorization:"Bearer "+token}}).then((res)=>{
           
                
                setPassword('')
                setShowProfile(false)
                setshowPassword(false)
                toast.success("Berhasil Mengubah Password")
                // setProfile(res?.data?.data)
                

            
        }).catch(err=>{
            
            if(err?.response?.status==401){
                window.location = "/login"
            }
            // console.log(err?.response)
            toast.error(err?.response?.data?.message)
        }).finally(()=>{
            // setDataLoketLoading(false)
            setLoading(false)
        })
    }


    

    return(
    <>

        <header style={{position:'relative',background:'#212121', height:'100vh', width:'100vw',overflowY:'auto',overflowX:'hidden'}}>
            <div style={{color:"#ffdc40", fontWeight:800, marginTop:'0px',height:'calc(100% + 90px)',writingMode: "vertical-rl",textOrientation: "upright",width:'90px',background:'', fontSize:'50px', letterSpacing:'3px', position:'absolute', left:'0em', }}>{query.get("loket_name").toUpperCase()}</div>
            <div style={{color:"#ffdc40", fontWeight:800, marginTop:'0px',height:'calc(100% + 90px)',writingMode: "vertical-rl",textOrientation: "upright",width:'20%',background:'', fontSize:'50px', letterSpacing:'3px', position:'absolute', right:'1.3em'}}>{query.get("loket_name").toUpperCase()}</div>
            
            {!boleh?<div style={{position:'fixed',display:'flex', justifyContent:'center',alignItems:'center', left:0,right:0, top:0, bottom:0,zIndex:999999999, background:'rgba(0,0,0,0.9)'}}>
                Loading.....
            </div>:""}

            <div style={{display:'flex',transition:'0.3s ease-in-out',justifyContent:'center',alignItems:'center',zIndex:4,position:'fixed', top:showpassword?0:-100000000, left:0, bottom:0, right:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(20px)'}}>
             {loading?<SyncLoader color="white" size={"30px"} style={{color:'white',fontSize:'50px'}}></SyncLoader>:<div style={{borderRadius:'20px',background:'rgba(255,255,255,.25)', backdropFilter:'blur(25px)', width:'300px', height:'230px'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 20px'}}>
                         <div style={{color:'white',fontWeight:600, fontSize:'18px'}}>CHANGE PASSWORD</div>
                         <MdClose onClick={()=>{setshowPassword(false);setPassword("")}} className="nidzam-button-close" style={{fontSize:'30px', color:'white'}}></MdClose>
                     </div>

                    <div style={{padding:'0px 20px'}}>
                     <div className="form-inputs">
                                         <div  className="input-box" style={{color:'white'}}>
                                             <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' className='input-field2' tyle={{color:'white'}} placeholder='Password' required></input>
                                             <i className='bx bx-user icon'>
                                               <FaLock></FaLock>
                                             </i>
                                        </div>
                                         <div onClick={()=>{handleSavePassword()}} className="nidzam-button-save" style={{boxShadow:"  rgba(0, 0, 0, 0.16) 0px 1px 4px",background:'rgba(255,255,255,0.1)',color:'white',fontWeight:600, position:'absolute', right:'20px', bottom:'20px', padding:'10px 10px', borderRadius:'10px',cursor:'pointer'}}>{"SAVE"}</div>
                                         </div>
                   </div>
                </div>}
            </div>
            <div style={{zIndex:999,position:'sticky',top:0, background:'rgba(0, 0, 0,0.1)',backdropFilter:'blur(2px)', width:'100%', height:'80px'}}>
                           <div style={{position:'relative',padding:'0px 50px',display:'flex', justifyContent:'center', alignItems:'center',height:'100%', width:'100%'}}>
                               <div style={{textShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",position:'absolute',left:'35px',fontWeight:'800', fontSize:'20px', color:'rgba(255,255,255,0.8)'}}>
                                   Rumah Sakit
           
                                   
            
           
                               </div>
                               
                               <div    style={{transition:'0s ease-in-out',fontSize:'20px', fill: "white",textShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}}>
                               <svg
                   id="roller"
                     color="white"
                     width="36"
                     height="36"
                     class="bi bi-asterisk"
                     viewBox="0 0 16 16"
                   >
                     <path
                       d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
                     ></path>
                   </svg>
                               </div>
                              
                                   <div style={{position:'absolute', right:'35px'}}>
                                       
                                       <img onClick={()=>{setShowProfile(a=>!a)}} style={{height:'50px',cursor:'pointer',borderRadius:'50%',boxShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}} src={Profile} />
                               <div style={{right:showProfile?0:-1000,padding:'0px 15px',width:'auto',minWidth:'250px',transition:'0.3s ease-in-out',top:60,position:"absolute", background:'rgba(0,0,0,0.5)',backdropFilter:'blur(25px)', height:'160px',borderRadius:'10px', }}>
                                   <div style={{color:'white',marginTop:'20px',width:'auto',padding:'0px 0px',marginBottom:'20px',borderBottom:'2px solid white', marginLeft:'10px', marginRight:'10px'}}>
                                       <h4 style={{color:'rgba(255,255,255,0.8)',fontWeight:700}}>Hi, {profile?.username}</h4>
                                   </div>
                                   <div onClick={()=>{setshowPassword(true);setShowProfile(false)}} className="nidzam-button-save2" style={{transition:'0.3s ease-in-out',textAlign:'left',paddingLeft:'25px', color:'white',fontSize:'18px'}}>Change Password</div>
                                   <div onClick={()=>{localStorage.removeItem("token");window.location="/login"}} className="nidzam-button-save2" style={{transition:'0.3s ease-in-out',textAlign:'left',paddingLeft:'25px',marginTop:'10px', color:'white'}}>Logout</div>
           
                               </div>
                                   </div>
                               
                           </div>
                       </div>
           
          
            {/* <div style={{height:'calc(100vh - 100px)', background:"rgba(232, 235, 237, 0.3)", backdropFilter:'blur(4px)', border:'2px solid rgba(255,255,255,0.8)'}}> */}
                    <div style={{ display:'flex', justifyContent:'center', alignContent:'center', flexDirection:'column',}}>
                    <ul className='team'>
                    {data?.length?data?.map((antrians, index)=>{
                        console.log((index+1)%3,index, index+1)
                        if((index+1)%2==0){
                            return(
                                <li class="member">
			<div class="thumb">
            <img src={Health2}/>
            </div>
			<div class="description">
			<h3>{antrians?.tipe_pasien_name}</h3>
                                    <p> <span  style={{fontSize:'30px'}}>Antrian Sekarang</span>  <span style={{fontWeight:800,fontSize:'35px',marginLeft:'25px'}}>{antrians.number}</span><br/>
                                    Sisa {antrians?.count}<br/>
                                    
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <div style={{display:'flex', justifyContent:'end', alignItems:'center', gap:'20px'}}>
                                        <Button sx={{
                                            color:"#ffdc40",
                                            background:"#30323b",
                                            transition:'0.3s ease-in-out',
    ':hover': {
        transform:'scale(1.1)',
    
    },
  }}  disabled={(antrians.loket_id===loketId && onPanggil) || (antrians.loket_id!==loketId && onPanggil) } onClick={()=>{
                                            socket2.send(JSON.stringify({
                                                "type":"call",
                                                "body":{
                                                    "tipe_pasien_id":antrians.tipe_pasien_id,
                                                    "id":antrians.id,
                                                    "loket_id":loketId, 
                                                }
                                            }))
                                        }}>Panggil</Button>
                                        <Button sx={{
                                            color:"#ffdc40",
                                            background:"#30323b",
                                            transition:'0.3s ease-in-out',
    ':hover': {
        transform:'scale(1.1)',
    
    },
  }}   disabled={ (antrians.loket_id!==loketId && onPanggil) || !onPanggil  } onClick={()=>{
                                            socket2.send(JSON.stringify({
                                                "type":"call",
                                                "body":{
                                                    "tipe_pasien_id":antrians.tipe_pasien_id,
                                                    "id":antrians.id,
                                                    "loket_id":loketId, 
                                                }
                                            }))
                                        }}>Panggil lagi</Button>
                                        <Button sx={{
                                            color:"#ffdc40",
                                            background:"#30323b",
                                            transition:'0.3s ease-in-out',
    ':hover': {
        transform:'scale(1.1)',
    
    },
  }} disabled={ (antrians.loket_id!==loketId && onPanggil) || !onPanggil }  onClick={()=>{
                                            socket2.send(JSON.stringify({
                                                "type":"selesai",
                                                "body":{
                                                    "tipe_pasien_id":antrians.tipe_pasien_id,
                                                    "id":antrians.id,
                                                    "loket_id":loketId, 
                                                }
                                            }))
                                        }}>Selesai</Button>

                                        
                                        </div>
                                    <a href="#">{antrians?.tipe_pasien_code}</a>
                                    </div>
                                    
                                    

                                                                       </p>

			</div>
		</li>
                            )
                        }else if ((index+1)%1==0){
                            return(
                                <li class="member">
                                <div class="thumb"><img src={Health2}/></div>
                                <div class="description">
                                    <h3>{antrians?.tipe_pasien_name}</h3>
                                    <p> <span  style={{fontSize:'30px'}}>Antrian Sekarang</span> <span style={{fontWeight:800,fontSize:'35px', marginLeft:'20px'}}>{antrians.number}</span><br/>
                                    Sisa {antrians?.count}<br/>
                                    
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <a href="#">{antrians?.tipe_pasien_code}</a>
                                        <div style={{display:'flex', justifyContent:'end', alignItems:'center', gap:'20px'}}>
                                        <Button sx={{
                                            color:"#ffdc40",
                                            background:"#30323b",
                                            transition:'0.3s ease-in-out',
    ':hover': {
        transform:'scale(1.1)',
    
    },
  }}  disabled={(antrians.loket_id===loketId && onPanggil) || (antrians.loket_id!==loketId && onPanggil) } onClick={()=>{
                                            socket2.send(JSON.stringify({
                                                "type":"call",
                                                "body":{
                                                    "tipe_pasien_id":antrians.tipe_pasien_id,
                                                    "id":antrians.id,
                                                    "loket_id":loketId, 
                                                }
                                            }))
                                        }}>Panggil</Button>
                                        <Button sx={{
                                            color:"#ffdc40",
                                            background:"#30323b",
                                            transition:'0.3s ease-in-out',
    ':hover': {
        transform:'scale(1.1)',
    
    },
  }}  disabled={ (antrians.loket_id!==loketId && onPanggil) || !onPanggil }  onClick={()=>{
                                            socket2.send(JSON.stringify({
                                                "type":"call",
                                                "body":{
                                                    "tipe_pasien_id":antrians.tipe_pasien_id,
                                                    "id":antrians.id,
                                                    "loket_id":loketId, 
                                                }
                                            }))
                                        }}>Panggil lagi</Button>
                                        <Button sx={{
                                            color:"#ffdc40",
                                            background:"#30323b",
                                            transition:'0.3s ease-in-out',
    ':hover': {
        transform:'scale(1.1)',
    
    },
  }} disabled={ (antrians.loket_id!==loketId && onPanggil) || !onPanggil }  onClick={()=>{
                                            socket2.send(JSON.stringify({
                                                "type":"selesai",
                                                "body":{
                                                    "tipe_pasien_id":antrians.tipe_pasien_id,
                                                    "id":antrians.id,
                                                    "loket_id":loketId, 
                                                }
                                            }))
                                        }}>Selesai</Button>

                                        </div>
                                    </div>
                                    
                                    

                                                                       </p>
                                </div>
                            </li>
                            )
                        }
                        
                        <div class="col-xl-4 col-xxl-4 col-sm-12 col-m-12">
                            <div class="card nidzam invoice-card" style={{marginLeft:'30px',}}>
                                <div class="card-body d-flex" style={{justifyContent:'center'}}>
                                    <div key={antrians.id} style={{textShadow:"-3px -3px 7px #ffffff73,  3px 3px 5px rgba(94,104,121,0.288)",}}>
                                        <h1 class="" style={{color:'rgba(0,0,0,0.7)', fontWeight:1000,WebkitTextStroke:'2px  rgba(255,255,255,0.5)'}}>{antrians.tipe_pasien_name}</h1>
                                        {/* <span class="text-white fs-18">User Aktif</span> */}
                                        <h1 class="" style={{color:'rgba(0,0,0,0.7)', fontWeight:1000,WebkitTextStroke:'2px  rgba(255,255,255,0.5)'}}>{antrians.number}</h1>
                                        <h3 className="Karcis-tittle">Sisa : {antrians.count}</h3>

                                       
                                    </div>
                                </div>
                            </div>
                        </div>
}):<span>Tidak Ada Antrian Hari Ini</span>}
                    </ul>
                    {/* </div> */}
                    </div>
                        <ToastContainer></ToastContainer>
                    
        </header>


        {/* ni header yang lama
        <header className="App-header">
            {boleh?<div style={{position:'fixed', left:0,right:0, top:0, bottom:0,zIndex:999999999, background:'rgba(0,0,0,0.5)'}}></div>:""}
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
        </header> */}
    </>
    )
}

export default OperatorList