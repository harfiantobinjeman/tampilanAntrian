import React, { useEffect, useState } from 'react'

import './style.css'
import './style.scss'

import Man from './../images/man.png'
import { RiDashboardFill } from "react-icons/ri";
import { Dashboard } from '@mui/icons-material';
import { FaPersonBooth, FaPlus, FaUser } from 'react-icons/fa';
import Patien from './../images/patient.png'
import Loket from './../images/loket.png'

import LoketPage from './Page/loket';
import TipePasienPage from './Page/tipe_pasien';
import { MdCreate, MdPlusOne } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';


const Admin = ()=>{
    const handleClickMenu = (menu)=>{
        window.location = `/admin?page=${menu}`
    }
    const [modalAddOpen, setModalAddOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    useEffect(()=>{
            if(!localStorage.getItem("token")){
                window.location = `/login`

            }
        },[])
        
    const query = new URLSearchParams(window.location.search);
    // console.log(query.get("page"))
    // console.log(query)
    return(
        <div style={{backgroundSize:'cover',background:"url('./bg.gif')",padding:"10px", width:'100vw', height:'100vh',color:'white',}}>
            <div className='body-admin' style={{height:'calc(100vh - 20px)', width:'calc(100vw - 20px)',overflowY:'hidden',overflowX:'hidden'}}>
                <div style={{ height:'100%', width:'200px'}}>
                    <div style={{height:'80px', display:'flex', alignItems:'center', justifyContent:'center',gap:'10px', boxShadow:" rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"}}>
                        <Dashboard style={{}} color='white'></Dashboard>
                        <h3>SUPERADMIN</h3>
                    </div>
                    <div style={{height:"calc(100% - 80px)", padding:'0px 0px',}}>
                        <div onClick={()=>{handleClickMenu("user")}} className={`menu-items ${query.get("page")=="user"?"active":""}`} style={{paddingLeft:'20px',paddingRight:'20px',display:'flex', alignItems:'center', gap:'30px',paddingTop:'15px', paddingBottom:'15px', fontWeight:'600'}}><FaUser style={{width:'30px'}}></FaUser>USER</div>
                        <div onClick={()=>{handleClickMenu("loket")}} className={`menu-items ${query.get("page")=="loket"?"active":""}`} style={{paddingLeft:'20px',paddingRight:'20px',display:'flex', alignItems:'center', gap:'30px',paddingTop:'15px', paddingBottom:'15px', fontWeight:'600'}}><img style={{width:'30px'}} src={Loket}></img>LOKET</div>

                                <div onClick={()=>{handleClickMenu("tipe_pasien")}} className={` ${!query.get("page")?'menu-items-dashboard':query.get("page")=="tipe_pasien"?"active":"menu-items"} ${query.get("page")=="loket"?"menu-items-bawah":""}`} style={{paddingLeft:'20px',paddingRight:'20px',display:'flex', alignItems:'center', gap:'30px',paddingTop:'15px', paddingBottom:'15px', fontWeight:'600'}}><img style={{width:'30px'}} src={Patien}></img>TIPE PASIEN</div>
  
                                <div className={`${!query.get("page")?'menu-items-dashboard':'menu-items'} ${query.get("page")=="tipe_pasien"?"menu-items-bawah":""}`} style={{height:'30000px', width:'100%'}}></div>
                            </div>
                        </div>
                    </div>
               
                <div className='body-menu' style={{height:'100%', width:'calc(100% - 200px)', display:'block',overflowY:'hidden',overflowX:'hidden',color:'black'}}>
                    <div style={{ position:'sticky',top:0,zIndex:2,fontSize:'25px',fontWeight:'700',paddingLeft:'35px',height:'80px', width:'calc(100% - 55px)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div style={{marginTop:''}}>{query.get("page")?query.get("page")?.replaceAll("_"," ").toLocaleUpperCase():"DASHBOARD"}</div>
                        <div style={{display:'flex',color:'white', justifyContent:'end',alignItems:'center', gap:'20px'}}>
                            {query.get("page")?<div onClick={()=>{setModalAddOpen(true)}} className='buttonAdd' style={{border:'1px solid rgba(255,255,255,1)',boxShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",cursor:'pointer',fontSize:'13px',borderRadius:'20px',background:'black', padding:'10px 15px', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px'}}>
                                <FaPlus style={{color:'white'}}></FaPlus>
                                ADD
                            </div>:""}
                            <div style={{position:'relative'}}>
                                <img className='buttonAdd' onClick={()=>{setProfileOpen(aa=>!aa)}} style={{position:'relative',cursor:'pointer',zIndex:1,width: "55px",height: "55px",borderRadius: "50%",boxShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",border:"2px solid #e8eaec"}}  src={Man}></img>
  
  <div style={{background:"#303030", fontSize:'14px',transition:'0.5s ease',top:'65px',right:profileOpen?'10px':'-1000px',boxShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",zIndex:profileOpen?2:-1,position:'absolute',width:'150px', height:'60px',padding:'10px 20px'}}>
                                        Hi, SuperAdmin
                                        <hr style={{color:'white'}}></hr>
                                        <div onClick={()=>{localStorage.removeItem('token');window.location = "/login";}} className='buttonAdd' style={{background:'',cursor:'pointer',height:'25px',display:'flex',justifyContent:'start', alignItems:'center'}}>Logout</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingTop:"10px",paddingBottom:'10px',marginBottom:'',height:'calc(100% - 120px)', width:'calc(100%)', display:'block',overflowY:'auto',overflowX:'hidden'}}>
                        {query.get("page")=="loket"?<LoketPage modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen}></LoketPage>:""}
                        {query.get("page")=="tipe_pasien"?<TipePasienPage modalAddOpen={modalAddOpen} setModalAddOpen={setModalAddOpen}></TipePasienPage>:""}
                    </div>
                </div>

                {/* <embed class="pdf"  
                src="https://nidzam2.s3.amazonaws.com/document_form/4111da08-6d33-4966-93eb-817baeb6632e.pdf"
            width="800" height="500"/>  */}
            </div>
                    <ToastContainer />
            
        </div>
    )
}

export default Admin