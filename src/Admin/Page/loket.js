import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { HiCheckCircle } from "react-icons/hi";
import {FiEdit }from "react-icons/fi"
import { MdClose, MdDangerous, MdEditSquare } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip } from 'react-tooltip';

const Loket = ({searchTerm,showModal, setShowModal})=>{
    const [token, setToken] = useState("")
    const [dataLoketLoading, setDataLoketLoading] = useState(false)
    const [dataLoket, setDataLoket] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [totalData, setTotalData] = useState(0)
    const [rowPerPage, setRowPerpage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState([])
    const [nameLoket, setNameLoket] = useState("")
    const [loading, setLoading] = useState(false)
    const [resfresh, setRefresh] = useState(false)
    const [typeModal, setTypeModal] = useState("")
    const [editId, setEditId] = useState(0)

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
    },[])
    const handleSaveCreate = ()=>{
        setLoading(true)
       
        axios({
            url:`https://antrian-online.onrender.com/antrian/v1/admin/loket`,
            data:{name:nameLoket,id:editId},
            method:typeModal=="edit"?"PUT":"POST",
            headers:{Authorization:"Bearer "+token}}
        ).then((res)=>{
            if(res?.data){
               toast.success("Berhasil Create Loket")
               setRefresh(aa=>!aa)
               setShowModal(false)
               setNameLoket("")
               setTypeModal("")
            }
        }).catch(err=>{
            
            if(err?.response?.status==401){
                window.location = "/login"
            }else{
                console.log(err?.response?.data)
                toast.error(err?.response?.data?.message)
            }
        }).finally(()=>{
           
            setLoading(false)
        })
    }
    useEffect(()=>{
        let total = Math.ceil(totalData/rowPerPage)
        let arra = []
        for(let i=1;i<=total;i++){
            arra.push(i)
        }
        setTotalPage(()=>(arra))
    },[totalData])
    useEffect(()=>{
        if(token){
            axios.get(`https://antrian-online.onrender.com/antrian/v1/admin/user/list?page=1&row_perpage=1000000`,{headers:{Authorization:"Bearer "+token}}).then((res)=>{
                if(res?.data?.data){
                    
                
                    setDataUser(res?.data?.data)
                   
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
        if(token){
           
          
             
            setDataLoketLoading(true)
            setDataLoket([])
            const delayDebounceFn = setTimeout(() => {
              
                axios.get(`https://antrian-online.onrender.com/antrian/v1/admin/loket/list?page=${currentPage}&row_perpage=${rowPerPage}&name=${searchTerm}`,{headers:{Authorization:"Bearer "+token}}).then((res)=>{
                    if(res?.data?.data){
                        
                    
                        setDataLoket(res?.data?.data)
                        setTotalData(res?.data?.totalRecords)

                    }
                }).catch(err=>{
                    
                    if(err?.response?.status==401){
                        window.location = "/login"
                    }
                }).finally(()=>{
                    setDataLoketLoading(false)
    
                })
    
            }, 500)
           


            return () => clearTimeout(delayDebounceFn)
        }
    },[token,rowPerPage,currentPage,searchTerm,resfresh])
   
    const handleActiveDeactive =  (id, status)=>{
        // alert(id,status)
        setLoading(true)
        axios.post(`https://antrian-online.onrender.com/antrian/v1/admin/loket/${status=="active"?"deactivate":"activate"}`,{id:id},{headers:{Authorization:"Bearer "+token}}).then((res)=>{
            if(res?.data){
               toast.success("Berhasil Update Status Loket")
               setRefresh(aa=>!aa)
              
            }
        }).catch(err=>{
            
            if(err?.response?.status==401){
                window.location = "/login"
            }else{
                console.log(err?.response?.data)
                toast.error(err?.response?.data?.message)
            }
        }).finally(()=>{
           
            setLoading(false)
        })
    }

    // console.log(dataLoket)
    return (
        
        <div className="content-body">
                <div style={{display:'flex', justifyContent:'center',alignItems:'center',transition:'0.3s ease',position:'fixed', left:0, right:0, bottom:showModal?0:"100%", top:0, zIndex:6,marginTop:showModal?'0':'-10000px', background:'rgba(232, 235, 237,0.9)'}}>
                    <div  style={{position:'relative',width:'300px', height:'210px',background:'#e8ebed', borderRadius:'25px',    boxShadow: "4px 4px 8px #bdc8d5, -4px -4px 8px #fff"}}>
                            <div className="bg-info" style={{justifyContent:'space-between',letterSpacing:'2px',fontSize:'20px',fontWeight:'600',color:'white',boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", display:'flex',borderTopRightRadius:'25px',borderTopLeftRadius:'25px' ,alignItems:'center',padding:'10px 20px',width:'100%', height:'60px'}} onClick={()=>{setShowModal(aa=>!aa);setNameLoket("");setTypeModal("")}}>
                               {typeModal=="edit"?"EDIT":"CREATE"} LOKET
                                <div style={{cursor:'pointer'}} className="nidzam-button-close">
                                    <MdClose style={{fontSize:'30px', fontWeight:800}}></MdClose>

                                </div>
                            </div>
                            <div className="input-fields" style={{display:'flex', justifyContent:'center',alignItems:'center',marginTop:'23px'}}>
                            <div class="text-input-group" style={{width:'260px'}}>
                                <input 
                                type="text" 
                                value={nameLoket}
                                onChange={(e)=>{setNameLoket(e.target.value)}}
                                name="firstName" 
                                id="firstName" 
                                placeholder="Nama Loket" 
                                autocomplete="off"
                                required="required"
                                />
                                <label for="firstName">Nama Loket</label>
                            </div>
                            </div>
                            <div style={{position:'absolute',bottom:'20px',right:'20px',display:'flex', justifyContent:'end',marginTop:'20px', alignItems:'center'}}>
                                <div className="btn btn-primary nidzam-button-save"  onClick={()=>{handleSaveCreate()}} style={{}}>Save</div>
                            </div>
                    </div>
                </div>
                
			<div className="container-fluid">
				<div className="row invoice-card-row">
                <div class="col-xl-6 col-xxl-12">
						<div class="card">
							{/* <div class="card-header d-block d-sm-flex border-0">
								<div class="me-3">
									<h1 class="card-title mb-2">Daftar Loket</h1>
									
								</div> */}
								{/* <div class="card-tabs mt-3 mt-sm-0">
									<ul class="nav nav-tabs" role="tablist">
										<li class="nav-item">
											<a class="nav-link active" data-bs-toggle="tab" href="#monthly" role="tab">Monthly</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" data-bs-toggle="tab" href="#Weekly" role="tab">Weekly</a>
										</li>
										<li class="nav-item">
											<a class="nav-link" data-bs-toggle="tab" href="#Today" role="tab">Today</a>
										</li>
									</ul>
								</div> */}
							{/* </div> */}
							<div class="card-body tab-content p-0">
								<div class="tab-pane active show fade" id="monthly" role="tabpanel">
									<div class="table-responsive" style={{maxHeight:'402px',}}>
										<table class="table ">
                                            <thead  style={{}}>
                                                <tr>
                                                    <td>
                                                        Action
                                                    </td>
                                                    <td>
                                                        Nama
                                                    </td>
                                                    <td>
                                                        Created At
                                                    </td>
                                                    <td>
                                                        Created By
                                                    </td>
                                                    <td>
                                                        Updated At
                                                    </td>
                                                    <td>
                                                        Updated By
                                                    </td>
                                                    <td>
                                                        Status
                                                    </td>
                                                </tr>
                                            </thead>
                                            {dataLoketLoading?<div style={{display:'flex', justifyContent:'center', alignItems:'center', fontSize:'30px',width:'330%', fontWeight:500,textShadow:"-3px -3px 7px #ffffff73,  3px 3px 5px rgba(94,104,121,0.288)",background:'transparent'}}>
                                                <div class="container-loading" style={{background:'#e8ebed'}}>
  <div class="loading">
    <div class="loading__letter">L</div>
    <div class="loading__letter">o</div>
    <div class="loading__letter">a</div>
    <div class="loading__letter">d</div>
    <div class="loading__letter">i</div>
    <div class="loading__letter">n</div>
    <div class="loading__letter">g</div>
    <div class="loading__letter">.</div>
    <div class="loading__letter">.</div>
    <div class="loading__letter">.</div>
  </div>
</div>
                                                </div>:
											<tbody>
                                                
                                                {dataLoket?.map((val, index)=>{
                                                    return(
<tr>
													<td style={{padding:'0px'}}>
                                                       
                                                 <FiEdit onClick={()=>{setShowModal(true);setTypeModal("edit");setEditId(val?.id);setNameLoket(val?.name)}} style={{fontSize:'25px', cursor:'pointer',color:'gray'}}  data-tooltip-place="right" data-tooltip-id="my-tooltip"></FiEdit >
                                        <Tooltip  id="my-tooltip">
  <div style={{display:'flex', alignItems:'start', justifyContent:'center',flexDirection:'column'}}>
          Edit Data                                              
  </div>
</Tooltip>
													</td>
													<td style={{padding:'0px',textShadow:""}} >
														<h6 class="fs-16 font-w600"  style={{color:'gray'}}>{val?.name}</h6>
														{/* <span class="fs-14">Cashback</span> */}
													</td>
													<td style={{padding:'0px',textShadow:""}}>
														<h6 class="fs-16  font-w600 mb-0" style={{color:'gray'}}>{val?.created_at?.split("T")[0]}</h6>
														<span class="fs-14">{val?.created_at?.split("T")[1]?.split("Z")[0]}</span>
													</td>
													<td style={{textShadow:""}}><span class="fs-16  font-w600"  style={{color:'gray'}}>{dataUser?.findIndex(aa=>aa?.id==val?.created_by)!=-1?dataUser[dataUser?.findIndex(aa=>aa?.id==val?.created_by)]?.username:val?.created_by}</span></td>
                                                    <td style={{padding:'0px',textShadow:""}}>
														<h6 class="fs-16 font-w600 mb-0"  style={{color:'gray'}}>{val?.updated_at?.split("T")[0]}</h6>
														<span class="fs-14">{val?.updated_at?.split("T")[1]?.split("Z")[0]}</span>
													</td>
													<td style={{padding:'0px',textShadow:""}}>
                                                    <span class="fs-16  font-w600"  style={{color:'gray'}}>{dataUser?.findIndex(aa=>aa?.id==val?.updated_by)!=-1?dataUser[dataUser?.findIndex(aa=>aa?.id==val?.updated_by)]?.username:val?.updated_by}</span>
                                                        </td>
                                                        <td style={{padding:'3px',textShadow:""}}>

                                                        <div class="">
        <div id="toggle2">
            <input 
            onClick={()=>{handleActiveDeactive(val?.id,val?.status)}}
            type="checkbox"
            id={val.id}
            checked={val?.status=="active"}
            />
        <label for={val.id} tabindex="1" title="Dark mode toggle" ></label>
      </div></div>
                                                        {/* <span class="text-success fs-16 font-w500  d-block"> */}
                                                          
                                                        
{/*                                                         
                                                        {val?.status=="active"?<HiCheckCircle style={{fontSize:'30px',color:' #6711f2'}}></HiCheckCircle>:<MdDangerous style={{fontSize:'30px',color:'#f72b50'}}></MdDangerous>} */}
                                                        {/* </span> */}
                                                        </td>
												</tr>
												
                                                    )
                                                })}
												
												
											</tbody>}
										</table>
									</div>
								</div>
								
							</div>

                            <div class="container-pagination">
         <ul class="pagination">
            <li style={{cursor:'pointer'}} onClick={()=>setCurrentPage(aa=>{
                if(aa==1){
                    return 1
                }else{
                    return aa-1
                }
            })}><a ><IoIosArrowDropleftCircle  style={{color:'#6f6cde'}} fontSize={30}/></a></li>
                 {totalPage?.map((val,ind)=>{
                    return(

                        <li className={currentPage==val?"active":""} style={{cursor:'pointer'}} onClick={()=>{setCurrentPage(val)}}><a >{val}</a></li>
                    )
                 })}                           
                {/* <li><a href="#">2</a></li> */}
           
            <li style={{cursor:'pointer'}}   onClick={()=>setCurrentPage(aa=>{
                console.log(totalPage?.length)
                if(aa==totalPage?.length){
                    return totalPage?.length
                }else{
                    return aa+1
                }
            })}><a >< IoIosArrowDroprightCircle style={{color:'#6f6cde'}} fontSize={30} /></a></li>
         </ul>
      </div>
						</div>
					</div>
                </div>
            </div>
            {/* <ToastContainer></ToastContainer> */}
        </div>
    )
}
export default Loket