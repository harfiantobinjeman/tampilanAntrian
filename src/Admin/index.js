import React, { useEffect, useState } from 'react'

import './style.css'
import './style.scss'

import Man from './../images/man.png'
import { RiDashboardFill } from "react-icons/ri";
import {  Search } from '@mui/icons-material';
import Dashboard from './Page/dashboard';
import { FaPersonBooth, FaPlus, FaUser } from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillControl } from "react-icons/ai";

import Patien from './../images/patient.png'
// import Loket from './../images/loket.png'


// import LoketPage from './Page/loket';
import Loket from './Page/loket';

import TipePasienPage from './Page/tipe_pasien';
import { MdAdd, MdCreate, MdPlusOne } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import UserPage from './Page/user';
import axios from 'axios';
import RolePage from './Page/role';


const Admin = ()=>{
    const handleClickMenu = (menu)=>{
        window.location = `/admin?page=${menu}`
    }
    const [showModal, setShowModal] = useState(false)
    const [showMenu, setShowMenu] = useState(true)
    const [searching, setSearching] = useState("")
    const [modalAddOpen, setModalAddOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [showProfile,setShowProfile] = useState(false)
    const [profileData, setProfileData] = useState({})
 const [searchTerm, setSearchTerm] = useState('')
   
    useEffect(()=>{
            if(!localStorage.getItem("token")){
                window.location = `/login`

            }else{
                axios.get(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/admin/user/profile`,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).
                then(res=>{
                    setProfileData(res?.data?.data)
                    if(res?.data?.data?.role!="849c9eee-e30f-4dc5-9816-9b395b0121b7"){
                        window.location = "/pilihloket"
                    }
                })
                .catch(err=>{
                    window.location = `/login`
                    setProfileData({})
                })
    
            }
        },[])
        
    const query = new URLSearchParams(window.location.search);
    // console.log(query.get("page"))
    // console.log(query)
    return(
        <div style={{position:'',backgroundSize:'cover',backgroundPosition:'center center',backgroundRepeat:'no-repeat',padding:"0px", width:'100vw', height:'100vh',color:'black',overflowY:'auto', overflowX:'hidden'}} >
            <div  className={`show ${!showMenu?"menu-toggle":""}`}   >
        <div className="nav-header" style={{borderTopRightRadius:'20px',borderTopLeftRadius:"20px",}}>
            <a href="/admin" className="brand-logo">
			
                
				<p className="brand-title" width="124px" height="33px"  style={{fontSize: "25px"}}>{profileData?.role_name?.toUpperCase()}</p>
            </a>
            <div onClick={()=>{setShowMenu(a=>!a)}} className="nav-control" style={{marginTop:'-5px'}}>
                <div className={`hamburger ${showMenu?"is-active":""}`}>
                    <span className="line"></span><span className="line"></span><span class="line"></span>
                </div>
            </div>
        </div>
        <div class="header" style={{position:'sticky', top:0,height:'90px'}} >
            <div class="header-content">
                <nav class="navbar navbar-expand" >
                    <div class="collapse navbar-collapse justify-content-between">
                        <div class="header-left" style={{marginLeft:'-40px'}}>
							<div class="dashboard_bar" style={{fontSize:query.get("page")=="tipe_pasien"?"30px":"35px"}} >
                                {query.get("page")?query.get("page")?.toUpperCase()?.replaceAll("_"," "):"DASHBOARD"} 
                            </div>
                        </div> 
                        <ul class="navbar-nav header-right">
                            
                            {query.get("page")?<li class="nav-item" style={{marginRight:'30px'}}>
								<div class="input-group search-area">
									<input onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm} type="text" class="form-control" placeholder="Search here..." />
									<span class="input-group-text"><a href=""><i class="flaticon-381-search-2"></i></a></span>
								</div>
							</li>:""}
                            <li class="nav-item "  onClick={()=>{window.location="/pilihloket"}}>
								<div href="" class="btn btn-primary d-sm-inline-block d-none nidzam-button" style={{letterSpacing:'1px',fontWeight:600,display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <FaPersonBooth style={{fontSize:'25px', fontWeight:600, marginRight:'5px', }}></FaPersonBooth>
                                        Panggil Pasien
                                
                                    </div>
							</li>
                            {query.get("page")?<li class="nav-item "  onClick={()=>{setShowModal(aa=>!aa)}}>
								<div href="" class="btn btn-primary d-sm-inline-block d-none nidzam-button" style={{letterSpacing:'1px',fontWeight:600,display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <MdAdd style={{fontSize:'25px', fontWeight:600, marginRight:'5px', }}></MdAdd>
                                        Create Data
                                
                                    </div>
							</li>:""}
                            {/* <li class="nav-item dropdown notification_dropdown">
                                <a class="nav-link" href="javascript:void(0);" data-bs-toggle="dropdown">
									<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.88552 6.2921C1.95571 6.54135 0.439911 8.19656 0.439911 10.1896V10.7253C0.439911 12.8874 2.21812 14.6725 4.38019 14.6725H12.7058V24.9768H7.01104C5.77451 24.9768 4.82009 24.0223 4.82009 22.7858V18.4039C4.84523 16.6262 2.16581 16.6262 2.19096 18.4039V22.7858C2.19096 25.4334 4.36345 27.6059 7.01104 27.6059H21.0331C23.6807 27.6059 25.8532 25.4334 25.8532 22.7858V13.9981C26.9064 13.286 27.6042 12.0802 27.6042 10.7253V10.1896C27.6042 8.17115 26.0501 6.50077 24.085 6.28526C24.0053 0.424609 17.6008 -1.28785 13.9827 2.48534C10.3936 -1.60185 3.7545 1.06979 3.88552 6.2921ZM12.7058 5.68103C12.7058 5.86287 12.7033 6.0541 12.7058 6.24246H6.50609C6.55988 2.31413 11.988 1.90765 12.7058 5.68103ZM21.4559 6.24246H15.3383C15.3405 6.05824 15.3538 5.87664 15.3383 5.69473C15.9325 2.04532 21.3535 2.18829 21.4559 6.24246ZM4.38019 8.87502H12.7058V12.0382H4.38019C3.62918 12.0382 3.06562 11.4764 3.06562 10.7253V10.1896C3.06562 9.43859 3.6292 8.87502 4.38019 8.87502ZM15.3383 8.87502H23.6656C24.4166 8.87502 24.9785 9.43859 24.9785 10.1896V10.7253C24.9785 11.4764 24.4167 12.0382 23.6656 12.0382H15.3383V8.87502ZM15.3383 14.6725H23.224V22.7858C23.224 24.0223 22.2696 24.9768 21.0331 24.9768H15.3383V14.6725Z" fill="#4f7086"/> 
									</svg>
									<span class="badge light text-white bg-primary rounded-circle">2</span>
                                </a>
								
							</li>
                            <li class="nav-item dropdown notification_dropdown">
                                <a class="nav-link  ai-icon" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
                                   <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M12.638 4.9936V2.3C12.638 1.5824 13.2484 1 14.0006 1C14.7513 1 15.3631 1.5824 15.3631 2.3V4.9936C17.3879 5.2718 19.2805 6.1688 20.7438 7.565C22.5329 9.2719 23.5384 11.5872 23.5384 14V18.8932L24.6408 20.9966C25.1681 22.0041 25.1122 23.2001 24.4909 24.1582C23.8709 25.1163 22.774 25.7 21.5941 25.7H15.3631C15.3631 26.4176 14.7513 27 14.0006 27C13.2484 27 12.638 26.4176 12.638 25.7H6.40705C5.22571 25.7 4.12888 25.1163 3.50892 24.1582C2.88759 23.2001 2.83172 22.0041 3.36039 20.9966L4.46268 18.8932V14C4.46268 11.5872 5.46691 9.2719 7.25594 7.565C8.72068 6.1688 10.6119 5.2718 12.638 4.9936ZM14.0006 7.5C12.1924 7.5 10.4607 8.1851 9.18259 9.4045C7.90452 10.6226 7.18779 12.2762 7.18779 14V19.2C7.18779 19.4015 7.13739 19.6004 7.04337 19.7811C7.04337 19.7811 6.43703 20.9381 5.79662 22.1588C5.69171 22.3603 5.70261 22.6008 5.82661 22.7919C5.9506 22.983 6.16996 23.1 6.40705 23.1H21.5941C21.8298 23.1 22.0492 22.983 22.1732 22.7919C22.2972 22.6008 22.3081 22.3603 22.2031 22.1588C21.5627 20.9381 20.9564 19.7811 20.9564 19.7811C20.8624 19.6004 20.8133 19.4015 20.8133 19.2V14C20.8133 12.2762 20.0953 10.6226 18.8172 9.4045C17.5391 8.1851 15.8073 7.5 14.0006 7.5Z" fill="#4f7086"/>
									</svg>
                                    <span class="badge light text-white bg-primary rounded-circle">12</span>
                                </a>
                              
                            </li>
                            <li class="nav-item dropdown notification_dropdown">
                                <a class="nav-link bell bell-link" href="javascript:void(0);">
                                 <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M27 7.88883C27 5.18897 24.6717 3 21.8 3C17.4723 3 10.5277 3 6.2 3C3.3283 3 1 5.18897 1 7.88883V23.7776C1 24.2726 1.31721 24.7174 1.80211 24.9069C2.28831 25.0963 2.8473 24.9912 3.2191 24.6417C3.2191 24.6417 5.74629 22.2657 7.27769 20.8272C7.76519 20.3688 8.42561 20.1109 9.11591 20.1109H21.8C24.6717 20.1109 27 17.922 27 15.2221V7.88883ZM24.4 7.88883C24.4 6.53951 23.2365 5.44441 21.8 5.44441C17.4723 5.44441 10.5277 5.44441 6.2 5.44441C4.7648 5.44441 3.6 6.53951 3.6 7.88883V20.8272L5.4382 19.0989C6.4132 18.1823 7.73661 17.6665 9.11591 17.6665H21.8C23.2365 17.6665 24.4 16.5726 24.4 15.2221V7.88883ZM7.5 15.2221H17.9C18.6176 15.2221 19.2 14.6745 19.2 13.9999C19.2 13.3252 18.6176 12.7777 17.9 12.7777H7.5C6.7824 12.7777 6.2 13.3252 6.2 13.9999C6.2 14.6745 6.7824 15.2221 7.5 15.2221ZM7.5 10.3333H20.5C21.2176 10.3333 21.8 9.7857 21.8 9.11104C21.8 8.43638 21.2176 7.88883 20.5 7.88883H7.5C6.7824 7.88883 6.2 8.43638 6.2 9.11104C6.2 9.7857 6.7824 10.3333 7.5 10.3333Z" fill="#4f7086"/>
									</svg>
									<span class="badge light text-white bg-primary rounded-circle">5</span>
                                </a>
							</li> */}
                            <li class="">
                                <div   style={{cursor:'pointer',position:'relative',borderRadius:'50%',display:'flex',marginLeft:'25px',width:'calc(60px)',height:'60px',padding:'20px',justifyContent:'center',alignItems:'center',boxShadow:"-3px -3px 7px #ffffff73,3px 3px 5px rgba(94,104,121,0.288)"}}>

                                    <img onClick={()=>{setShowProfile(aa=>!aa)}} src={Man} className='img-profile' width="56" height={56} alt=""/>
								<div className='bg-success' style={{transition:'0.3s ease',overflow:'hidden',position:'absolute', top:70, right:showProfile?0:"-1000px",borderRadius:'20px',padding:'20px', width:'210px'}}>
                                    <div  style={{position:'absolute',borderRadius:'30px',left:"50px",top:'50px',transform:'rotate(60deg)',width:'100%',height:'100%',background:"linear-gradient(to right, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",filter:"progid:DXImageTransform.Microsoft.gradient( startColorstr='#26ffffff', endColorstr='#00ffffff',GradientType=1 )"}}></div>
                                    <div style={{borderBottom:'2px solid white',color:'white',fontWeight:'600'}}>Hi, {profileData?.username?.toUpperCase()}</div>
                                    <div onClick={()=>{localStorage.removeItem("token");window.location="/login"}} className='nidzam-button-save2' style={{cursor:'pointer',color:'white',width:'100%', textAlign:'left', fontWeight:'600',marginTop:'10px'}}>Logout</div>

                                </div>
                                </div>
							</li>
                        </ul>
                    </div>
                </nav>
                 
            </div>
        </div>
        <div class="dlabnav " style={{borderBottomLeftRadius:'20px',borderBottomRightRadius:'20px'}}>
            <div class="dlabnav-scroll">
				<ul class="metismenu" id="menu">
               
                    <li >
                        <a  className='' href='/admin?page=user' style={{cursor:'pointer'}} >
                            <div className={`${query.get("page")=="user"?"btn btn-rounded  btn-primary":""}`} style={{fontWeight:600,marginLeft:query.get("page")=="user"?'-20px':"0px",marginRight:query.get("page")=="user"?'-20px':"0px",display:'flex',gap:'20px', fontSize:'20px',justifyContent:'start',alignItems:'center' }}>
                                <FaUser color={`${query.get("page")=="user"?"white":"gray"}`} fontSize={40} ></FaUser>
                                <span class="nav-text">User</span>
                            </div>
						
						</a>
                    </li>
                    <li>
                        
                        <a  className='' href='/admin?page=role' style={{cursor:'pointer'}} >
                            <div className={`${query.get("page")=="role"?"btn btn-rounded  btn-primary":""}`} style={{fontWeight:600,marginLeft:query.get("page")=="role"?'-20px':"0px",marginRight:query.get("page")=="role"?'-20px':"0px",display:'flex',gap:'20px', fontSize:'20px',justifyContent:'start',alignItems:'center' }}>
                                <AiFillControl  color={`${query.get("page")=="role"?"white":"gray"}`} fontSize={40} ></AiFillControl>
                                <span class="nav-text">Role</span>
                            </div>
						
						</a>
                    </li>
                    <li>
                    <a  className='' href='/admin?page=loket' style={{cursor:'pointer'}} >
                    <div className={`${query.get("page")=="loket"?"btn btn-rounded  btn-primary":""}`} style={{fontWeight:600,marginLeft:query.get("page")=="loket"?'-20px':"0px",marginRight:query.get("page")=="loket"?'-20px':"0px",display:'flex',gap:'20px', fontSize:'20px',justifyContent:'start',alignItems:'center' }}>
                                <FaPersonBooth color={`${query.get("page")=="loket"?"white":"gray"}`} fontSize={40} ></FaPersonBooth>
                                <span class="nav-text">Loket</span>
                            </div>
						
						</a>
                    </li>
                    <li>
                    <a  className='' href='/admin?page=tipe_pasien' style={{cursor:'pointer'}} >
                    <div className={`${query.get("page")=="tipe_pasien"?"btn btn-rounded  btn-primary":""}`} style={{fontWeight:600,transition:'0.3s ease',marginLeft:query.get("page")=="tipe_pasien"?'-20px':"0px",marginRight:query.get("page")=="tipe_pasien"?'-20px':"0px",display:'flex',gap:'20px', fontSize:'20px',justifyContent:'start',alignItems:'center' }}>
                                <FaUserDoctor color={`${query.get("page")=="tipe_pasien"?"white":"gray"}`} fontSize={40} ></FaUserDoctor>
                                <span class="nav-text">Tipe Pasien</span>
                            </div>
						
						</a>
                    </li>
                    
                </ul>
            </div>
        </div>                

        {!query.get("page")?<Dashboard></Dashboard>:""}
        {query.get("page")=="loket"?<Loket showModal={showModal} setShowModal={setShowModal} searchTerm={searchTerm}></Loket>:""}
        {query.get("page")=="user"?<UserPage showModal={showModal} setShowModal={setShowModal} searchTerm={searchTerm}></UserPage>:""}
        {query.get("page")=="tipe_pasien"?<TipePasienPage showModal={showModal} setShowModal={setShowModal} searchTerm={searchTerm}></TipePasienPage>:""}
        {query.get("page")=="role"?<RolePage showModal={showModal} setShowModal={setShowModal} searchTerm={searchTerm}></RolePage>:""}




                   
                    </div>
                    <ToastContainer />  
        </div>
    )
}

export default Admin