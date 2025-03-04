import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillControl } from "react-icons/ai";
import { FaPersonBooth, FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const Dashboard = ()=>{
    const [token, setToken] = useState("")
    const [dataPasien, setDataPasien] = useState(0)
    const [dataRole, setDataRole] = useState(0)
    const [dataUser, setDataUser] = useState(0)
    const [dataLoket, setDataLoket] = useState(0)

    const [dataPasienLoading, setDataPasienLoading] = useState(false)
    const [dataRoleLoading, setDataRoleLoading] = useState(false)
    const [dataUserLoading, setDataUserLoading] = useState(false)
    const [dataLoketLoading, setDataLoketLoading] = useState(false)
    useEffect(()=>{
        if(token){

        setDataUserLoading(true)
        axios.get("http://localhost:8000/antrian/v1/admin/user/list?page=1&row_perpage=20000",{headers:{Authorization:"Bearer "+token}}).then((res)=>{
            if(res?.data?.data){
                let data =[]
                for(let i=0;i<res?.data?.data?.length;i++){
                    if(res?.data?.data[i]?.status=="active"){
                        data.push(res?.data?.data[i])
                    }
                }
                setDataUser(data)
            }
        }).catch(err=>{
            
            if(err?.response?.status==401){
                window.location = "/login"
            }
        }).finally(()=>{
            setDataUserLoading(false)

        })



        setDataLoketLoading(true)
        axios.get("http://localhost:8000/antrian/v1/admin/loket/list?page=1&row_perpage=20000",{headers:{Authorization:"Bearer "+token}}).then((res)=>{
            if(res?.data?.data){
                let data =[]
                for(let i=0;i<res?.data?.data?.length;i++){
                    if(res?.data?.data[i]?.status=="active"){
                        data.push(res?.data?.data[i])
                    }
                }
                setDataLoket(data)
            }
        }).catch(err=>{
            
            if(err?.response?.status==401){
                window.location = "/login"
            }
        }).finally(()=>{
            setDataLoketLoading(false)

        })



        setDataRoleLoading(true)
        axios.get("http://localhost:8000/antrian/v1/admin/role/list?page=1&row_perpage=20000",{headers:{Authorization:"Bearer "+token}}).then((res)=>{
            if(res?.data?.data){
                let data =[]
                for(let i=0;i<res?.data?.data?.length;i++){
                    if(res?.data?.data[i]?.status=="active"){
                        data.push(res?.data?.data[i])
                    }
                }
                setDataRole(data)
            }
        }).catch(err=>{
            
            if(err?.response?.status==401){
                window.location = "/login"
            }
        }).finally(()=>{
            setDataRoleLoading(false)

        })

    }
    },[token])

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
    },[])

    return(

        <div className="content-body">
            
			<div className="container-fluid">
				<div className="row invoice-card-row">
					<div className="col-xl-3 col-xxl-3 col-sm-6">
						<div className="card bg-warning invoice-card">
							<div className="card-body d-flex">
								<div className="icon me-3">
									<FaUserDoctor style={{color:'white', fontSize:'30px'}}></FaUserDoctor>
									
								</div>
								<div>
									<h2 className="text-white invoice-num" >2478</h2>
									<span className="text-white fs-13" >Pasien Hari ini</span>
								</div>
							</div>
						</div>
					</div>
                    <div class="col-xl-3 col-xxl-3 col-sm-6">
						<div class="card bg-success invoice-card">
							<div class="card-body d-flex">
								<div class="icon me-3">
									<AiFillControl style={{color:'white', fontSize:'30px'}}></AiFillControl>
									
								</div>
								<div>
									<h2 class="text-white invoice-num" >{dataRole?.length?dataRole?.length:0}</h2>
									<span class="text-white fs-18" >Role Aktif</span>
								</div>
							</div>
						</div>
					</div>
                    <div class="col-xl-3 col-xxl-3 col-sm-6">
						<div class="card bg-info invoice-card">
							<div class="card-body d-flex">
								<div class="icon me-3">
									<FaUser style={{fontSize:'30px', color:'white'}}></FaUser>
									
								</div>
								<div>
									<h2 class="text-white invoice-num" >{dataUser?.length?dataUser?.length:0}</h2>
									<span class="text-white fs-18">User Aktif</span>
								</div>
							</div>
						</div>
					</div>
                    <div class="col-xl-3 col-xxl-3 col-sm-6">
						<div class="card bg-secondary invoice-card">
							<div class="card-body d-flex">
								<div class="icon me-3">
									<FaPersonBooth style={{color:'white', fontSize:'30px'}}></FaPersonBooth>
								
								</div>
								<div>
									<h2 class="text-white invoice-num" >{dataLoket?.length?dataLoket?.length:0}</h2>
									<span class="text-white fs-18" >Loket Aktif</span>
								</div>
							</div>
						</div>
					</div>



                    </div>
                    <div class="col-xl-12 col-xxl-12">
						<div class="card">
							<div class="card-header border-0 pb-0">
								<div>
									<h4 class="card-title mb-2" style={{fontSize:'30px'}}>Pasien 5 Hari Ke Belakang</h4>
									{/* <span class="fs-12">Lorem ipsum dolor sit amet, consectetur</span> */}
								</div>
								{/* <div class="dropdown">
									<a href="" class="btn-link" data-bs-toggle="dropdown" aria-expanded="false">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
											<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
											<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
										</svg>
									</a>
									<div class="dropdown-menu dropdown-menu-right">
										<a class="dropdown-item" href="javascript:void(0);">Delete</a>
										<a class="dropdown-item" href="javascript:void(0);">Edit</a>
									</div>
								</div> */}
							</div>
							<div class="card-body">	
								<div class="progress default-progress">
                                    <div class="progress-bar bg-gradient-1 progress-animated" style={{width: "45%",height:"20px"}} role="progressbar">
                                        <span class="sr-only">45% Complete</span>
                                    </div>
                                </div>
								<div class="d-flex align-items-end mt-2 pb-3 justify-content-between">
									<span>Kamis</span>
									<span class="fs-18"><span class="text-black pe-2">1415</span>/2000</span>
								</div>
								<div class="progress default-progress mt-4">
                                    <div class="progress-bar bg-gradient-2 progress-animated" style={{width:"70%", height:"20px"}} role="progressbar">
                                        <span class="sr-only">70% Complete</span>
                                    </div>
                                </div>
								<div class="d-flex align-items-end mt-2 pb-3 justify-content-between">
									<span>Rabu</span>
									<span class="fs-18"><span class="text-black pe-2">1567</span>/5000</span>
								</div>
								<div class="progress default-progress mt-4">
                                    <div class="progress-bar bg-gradient-3 progress-animated" style={{width: "35%",height:"20px"}} role="progressbar">
                                        <span class="sr-only">35% Complete</span>
                                    </div>
                                </div>
								<div class="d-flex align-items-end mt-2 pb-3 justify-content-between">
									<span>Selasa</span>
									<span class="fs-18"><span class="text-black pe-2">487</span>/10000</span>
								</div>
								<div class="progress default-progress mt-4">
                                    <div class="progress-bar bg-gradient-4 progress-animated" style={{width: "95%", height:"20px"}} role="progressbar">
                                        <span class="sr-only">95% Complete</span>
                                    </div>
                                </div>
								<div class="d-flex align-items-end mt-2 justify-content-between">
									<span>Senin</span>
									<span class="fs-18"><span class="text-black pe-2">3890</span>/4000</span>
								</div>
							</div>
							{/* <div class="card-footer border-0 pt-0">
								<a href="javascript:void(0);" class="btn btn-outline-primary d-block btn-lg">View More</a>
							</div> */}
						</div>
					</div>
                </div>
                    </div>
                
                    
                   

    )
}

export default Dashboard