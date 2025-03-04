import React, { useEffect, useState } from "react";
import './style3.css'
import { FaPersonBooth } from "react-icons/fa";
import ImageFood1 from './../images/food-img-1.png'
import ImageFood2 from './../images/food-img-2.png'
import ImageFood3 from './../images/food-img-3.png'
import ImageFood4 from './../images/food-img-4.png'

import ControlImage1 from './../images/control-img-1.png'
import ControlImage2 from './../images/control-img-2.png'
import ControlImage3 from './../images/control-img-3.png'
import ControlImage4 from './../images/control-img-4.png'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";




const PilihLoket = ()=>{
    const [dataLoket, setDataLoket] = useState([])
    const [token,setToken] = useState("")
    useEffect(()=>{ 
        setToken(localStorage.getItem('token'))
        // if(!localStorage.getItem(token)){
        //     window.location="/login"
        // }
    },[])
    useEffect(()=>{
        if(token){
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

        }
    },[token])

    return(
        <div className="bg-glass" style={{overflow:'hidden',width:'100vw', height:'100vh', padding:'0px'}}>
           
            <div style={{flexWrap:'wrap',display:'flex',justifyContent:'center',flexDirection:'row',gap:'20px',padding:'100px', alignItems:'center',width:'cacl(100vw - 0px)', height:'calc(100vh - 0px)', background:'rgba(255,255,255,0.2)', backdropFilter:'blur(10px)', borderRadius:'0px', border:'0px solid rgba(255,255,255,0.8)',overflowY:'auto'}}> 
                            {dataLoket?.map((val, index)=>{
                                if(val?.status=='active'){
                                return(
                                    <div className="parent-loket card-loket3" style={{width:'30%',filter:val?.name=="Loket 5"?" hue-rotate(120deg)":" sepia(100%)  hue-rotate(120deg)"}}>
                                    <div className="card-loket">
                                        <div className="content-box-loket">
                                            <h1 className="card-title-loket">{val?.name}</h1>
                                            <p className="card-content-loket">{val?.name=="Loket 5"?"Sudah Dipilih nidzamganteng":"Belum Dipilih" }</p>
                                            <span onClick={()=>{
                                                if(val?.name=="Loket 5"){
                                                    toast.error("Loket sudah di pilih")
                                                }else{
                                                    localStorage.setItem("loket_id",val?.id)
                                                    window.location = `/operator`

                                                }
                                            }} className="see-more-loket">Pilih</span>
                                        </div>
    
                                        <div className="date-box-loket">
                                          
                                            <span className="date"><FaPersonBooth style={{fontSize:'40px'}}></FaPersonBooth> </span>
                                        </div>
                                    </div>
                                </div>
                                
                                )}
                            })}
                           
                        
                     
                           
                      
                
                
               
            
        </div> 
        <ToastContainer></ToastContainer>
        </div>
    )
}

export default PilihLoket