import React, { useEffect, useState } from "react";
import './style3.css'
import { FaLock, FaPersonBooth } from "react-icons/fa";
import Profile from './../images/man.png'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import gsap from "gsap";
import { MdClose } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { PacmanLoader, SyncLoader } from "react-spinners";


const PilihLoket = ()=>{
    let socket2 = new WebSocket("wss://antrian-online.onrender.com/antrian/v1/loket/user-id")
    const [dataLoket, setDataLoket] = useState([])
    const [token,setToken] = useState("")
    const [fetchLagi, setFetchLagi] = useState(false)
    const [topppp, setTopppp] = useState(0)
    const [showProfile, setShowProfile] = useState(false)
    const [profile,setProfile] = useState({})
    const [password,setPassword] = useState("")
    const [showpassword,setshowPassword] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(()=>{ 
        setToken(localStorage.getItem('token'))
        if(!localStorage.getItem("token")){
            window.location="/login"
        }
    },[])
    useEffect(()=>{
         socket2.onopen = () => {
                    console.log("connection open")
                };
                socket2.onclose = () => {
                    console.log('WebSocket connection closed');
                };
                socket2.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    console.log('Real-time update:', data);
                    if(data.type==="selesai"  ||data.type=="insert-data" || data.type==="insert-antrian" || data.type=="closed" ){
                       
                        setFetchLagi((y)=>!y)
                    }
                    
                };
    },[])
    useEffect(()=>{
        if(token){
            setDataLoket([])
            axios.get(`https://antrian-online.onrender.com/antrian/v1/admin/loket/list?page=1&row_perpage=1000000000000&name=`,{headers:{Authorization:"Bearer "+token}}).then((res)=>{
                if(res?.data?.data){
                    
                
                    setDataLoket(res?.data?.data)
                    

                }
            }).catch(err=>{
                
                if(err?.response?.status==401){
                    window.location = "/login"
                }
            }).finally(()=>{
                // setDataLoketLoading(false)

            })

            setProfile({})
            axios.get(`https://antrian-online.onrender.com/antrian/v1/admin/user/profile`,{headers:{Authorization:"Bearer "+token}}).then((res)=>{
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
    },[token,fetchLagi])
    const handleSavePassword = ()=>{
        setLoading(true)
        axios.post(`https://antrian-online.onrender.com/antrian/v1/admin/user/change-password`,{password:password,id:jwtDecode(token)?.sub?parseInt(jwtDecode(token)?.sub):0},{headers:{Authorization:"Bearer "+token}}).then((res)=>{
           
                
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
        <div className="bg-glass" style={{overflow:'hidden',width:'100vw', height:'100vh', padding:'0px'}}>
            <div style={{display:'flex',transition:'0.3s ease-in-out',justifyContent:'center',alignItems:'center',zIndex:4,position:'fixed', top:showpassword?0:-100000000, left:0, bottom:0, right:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(20px)'}}>
            {loading?<SyncLoader color="white" size={"30px"} style={{color:'white',fontSize:'50px'}}></SyncLoader>:<div style={{borderRadius:'20px',background:'rgba(0,0,0,0.25)', backdropFilter:'blur(25px)', width:'300px', height:'230px'}}>
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
            <div id="uhuy" onScroll={(e)=>{
                setTopppp(e.target.scrollTop)
              
               
                
            }} style={{overflowX:'hidden',backdropFilter:'blur(10px)',overflowY:'auto', maxHeight:'100vh', background:'rgba(255,255,255,0.2)',}}>
            <div style={{zIndex:999,position:'sticky',top:0, background:'rgba(0, 0, 0,0.3)',backdropFilter:'blur(30px)', width:'100%', height:'80px'}}>
                <div style={{position:'relative',padding:'0px 50px',display:'flex', justifyContent:'center', alignItems:'center',height:'100%', width:'100%'}}>
                    <div style={{textShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",position:'absolute',left:'35px',fontWeight:'800', fontSize:'20px', color:'rgba(255,255,255,0.8)'}}>
                        Rumah Sakit

                        
 

                    </div>
                    {/* <ScrollRotate target="uhuy">hay</ScrollRotate> */}
                    <div    style={{transform:`rotateZ(${topppp/8}deg)`,transition:'0s ease-in-out',fontSize:'20px', fill: "white",textShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}}>
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
            <div id="ccc" onScroll={()=>{console.log(":hay")}}  style={{flexWrap:'wrap',display:'flex',justifyContent:'center',flexDirection:'row',gap:'20px',padding:'100px', alignItems:'center',width:'cacl(100vw - 0px)',  borderRadius:'0px', border:'0px solid rgba(255,255,255,0.8)',}}> 
                            
                            {dataLoket?.map((val, index)=>{
                                if(val?.status=='active'){
                                return(
                                    <div  onClick={()=>{
                                        if(val?.user_id){
                                            toast.error("Loket sudah di pilih")
                                        }else{
                                            localStorage.setItem("loket_id",val?.id)
                                            window.location = `/operator`

                                        }
                                    }} className="parent-loket card-loket3" style={{filter:val?.user_id?" hue-rotate(120deg)":" sepia(100%)  hue-rotate(120deg)"}}>
                                    <div className="card-loket">
                                        <div className="content-box-loket">
                                            <h1 className="card-title-loket">{val?.name}</h1>
                                            <p className="card-content-loket">{val?.user_id?"Sudah Dipilih user = "+val?.user_id:"Belum Dipilih" }</p>
                                            <span className="see-more-loket">Pilih</span>
                                        </div>
    
                                        <div className="date-box-loket">
                                          
                                            <span className="date"><FaPersonBooth style={{fontSize:'40px'}}></FaPersonBooth> </span>
                                        </div>
                                    </div>
                                </div>
                                
                                )}
                            })}
                           
                        
                     
                           
                      
                
                
               
            
        </div> 
        </div>
        <ToastContainer></ToastContainer>
        </div>
    )
}

export default PilihLoket