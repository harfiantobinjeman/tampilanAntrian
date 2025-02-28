import React, { useEffect, useState } from 'react'

import './style.css'
import './style.scss'


import { RiDashboardFill } from "react-icons/ri";
import { Dashboard } from '@mui/icons-material';
import { FaPersonBooth, FaUser } from 'react-icons/fa';
import Patien from './../images/patient.png'
import Loket from './../images/loket.png'

import LoketPage from './Page/loket';
import TipePasienPage from './Page/tipe_pasien';


const Admin = ()=>{
    const handleClickMenu = (menu)=>{
        window.location = `https://antrian-online.netlify.app/admin?page=${menu}`
    }
    useEffect(()=>{
            if(!localStorage.getItem("token")){
                window.location = `https://antrian-online.netlify.app/login`

            }
        },[])
        
    const query = new URLSearchParams(window.location.search);
    console.log(query.get("page"))
    console.log(query)
    return(
        <div style={{backgroundSize:'cover',backgroundPosition:'center center',backgroundRepeat:'no-repeat',backgroundImage:"url('./bg.gif')",padding:"10px", width:'100vw', height:'100vh',color:'white',}}>
            <div className='body-admin' style={{height:'calc(100vh - 20px)', width:'calc(100vw - 20px)',overflowY:'hidden',overflowX:'hidden'}}>
                <div style={{ height:'100%', width:'200px'}}>
                    <div style={{height:'80px', display:'flex', alignItems:'center', justifyContent:'center',gap:'10px', boxShadow:" rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"}}>
                        <Dashboard style={{}} color='white'></Dashboard>
                        <h3>SUPERADMIN</h3>
                    </div>
                    <div style={{height:"calc(100% - 80px)", padding:'0px 0px',}}>
                        <div onClick={()=>{handleClickMenu("user")}} className={`menu-items ${query.get("page")=="user"?"active":""}`} style={{paddingLeft:'20px',paddingRight:'20px',display:'flex', alignItems:'center', gap:'30px',paddingTop:'15px', paddingBottom:'15px', fontWeight:'600'}}><FaUser style={{width:'30px'}}></FaUser>USER</div>
                        <div onClick={()=>{handleClickMenu("loket")}} className={`menu-items ${query.get("page")=="loket"?"active":""}`} style={{paddingLeft:'20px',paddingRight:'20px',display:'flex', alignItems:'center', gap:'30px',paddingTop:'15px', paddingBottom:'15px', fontWeight:'600'}}><img style={{width:'30px'}} src={Loket}></img>LOKET</div>

                        <div onClick={()=>{handleClickMenu("tipe_pasien")}} className={`menu-items ${query.get("page")=="tipe_pasien"?"active":""}`} style={{paddingLeft:'20px',paddingRight:'20px',display:'flex', alignItems:'center', gap:'30px',paddingTop:'15px', paddingBottom:'15px', fontWeight:'600'}}><img style={{width:'30px'}} src={Patien}></img>TIPE PASIEN</div>

                    </div>
                </div>
                <div className='body-menu' style={{height:'100%', width:'calc(100% - 200px)', display:'block',overflowY:'hidden',overflowX:'hidden'}}>
                    <div style={{  boxShadow:" rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",position:'sticky',top:0,zIndex:2,fontSize:'25px',fontWeight:'700',paddingLeft:'35px',height:'80px', width:'100%', display:'flex', justifyContent:'start', alignItems:'center'}}>
                        <div style={{marginTop:''}}>{query.get("page")?.replaceAll("_"," ").toLocaleUpperCase()}</div>
                    </div>
                    <div style={{paddingTop:"10px",marginBottom:'',height:'calc(100% - 100px)', width:'calc(100%)', display:'block',overflowY:'auto',overflowX:'hidden'}}>
                        {query.get("page")=="loket"?<LoketPage></LoketPage>:""}
                        {query.get("page")=="tipe_pasien"?<TipePasienPage></TipePasienPage>:""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin