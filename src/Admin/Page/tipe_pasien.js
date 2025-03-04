import React,{useState,useEffect} from "react";
import axios from 'axios';
import { MdCancel, MdClose, MdDelete, MdEdit, MdSave, MdSaveAlt, MdSaveAs } from 'react-icons/md';
import { toast } from "react-toastify";

const TipePasienPage = ({modalAddOpen,setModalAddOpen})=>{
    const [data,setData] = useState([])
    const [dataLoding,setDataLoading] = useState([])
    const [dataEdit,setDataEdit] = useState([])
    const [dataEditVal,setDataEditVal] = useState([])
 const [nameTipePasien, setNameTipePasien] = useState("")


    const [refresh,setRefresh] = useState(false)

    const [dataUser,setDataUser] = useState([])

    const [token,setToken] = useState("")
    useEffect(()=>{
        setToken(localStorage.getItem("token"))
    },[])
    useEffect(()=>{
        if(token){

            axios.get('http://antrian-online.onrender.com/antrian/v1/admin/tipe_pasien/list?page=1&row_perpage=1000',{headers:{Authorization:"Bearer "+token}}).then(res=>{
                setData(res?.data?.data)
            }).catch(err=>{
                if(err?.status==401){
                    window.location="/login"
                    localStorage.removeItem("token")
                }
                toast.error(err?.response?.data?.message)
            })

            axios.get('http://antrian-online.onrender.com/antrian/v1/admin/user/list?page=1&row_perpage=1000',{headers:{Authorization:"Bearer "+token}}).then(res=>{
                setDataUser(res?.data?.data)
            }).catch(err=>{
                if(err?.status==401){
                    window.location="/login"
                    localStorage.removeItem("token")
                }
                toast.error(err?.response?.data?.message)
            })
        }
    },[token,refresh])
    const handleDeactivate = (id)=>{
        setDataLoading(aa=>({...aa,[id]:true}))

        axios.post('http://antrian-online.onrender.com/antrian/v1/admin/tipe_pasien/deactivate',{id:id},{headers:{Authorization:"Bearer "+token}}).then(res=>{
            setRefresh(a=>!a)
        }).catch(err=>{
            if(err?.status==401){
                window.location="/login"
                localStorage.removeItem("token")
            }
            toast.error(err?.response?.data?.message)
        }).finally(()=>{
            setDataLoading(aa=>({...aa,[id]:false}))
    
            })
    }
    const handleSaveTipePasien = ()=>{
        axios.post('http://antrian-online.onrender.com/antrian/v1/admin/tipe_pasien',{name:nameTipePasien},{headers:{Authorization:"Bearer "+token}}).then(res=>{
            // setData(res?.data?.data)
            setNameTipePasien("")
            setRefresh(aa=>!aa)
            setModalAddOpen(false)
        }).catch(err=>{
            if(err?.status==401){
                window.location="/login"
                localStorage.removeItem("token")
            }
            toast.error(err?.response?.data?.message)
            
        })
    }
    const handleActivate = (id)=>{
        setDataLoading(aa=>({...aa,[id]:true}))
        axios.post('http://antrian-online.onrender.com/antrian/v1/admin/tipe_pasien/activate',{id:id},{headers:{Authorization:"Bearer "+token}}).then(res=>{
            setRefresh(a=>!a)
        }).catch(err=>{
            if(err?.status==401){
                window.location="/login"
                localStorage.removeItem("token")
            }
            toast.error(err?.response?.data?.message)
        }).finally(()=>{
        setDataLoading(aa=>({...aa,[id]:false}))

        })
    }

    const handleSave = (id)=>{
        setDataLoading(aa=>({...aa,[id]:true}))
        axios.put('http://antrian-online.onrender.com/antrian/v1/admin/tipe_pasien',{id:id,name:dataEditVal[id]},{headers:{Authorization:"Bearer "+token}}).then(res=>{
            setRefresh(a=>!a)
        }).catch(err=>{
            if(err?.status==401){
                window.location="/login"
                localStorage.removeItem("token")
            }
            toast.error(err?.response?.data?.message)
        }).finally(()=>{
            setDataLoading(aa=>({...aa,[id]:false}))
            setDataEdit([])
            setDataEditVal([])

        })
    }

    return(
        <div style={{display:'flex',flexWrap:"wrap", justifyContent:'left',alignItems:'center',paddingLeft:'30px',gap:'20px',background:'transparent',backdropFilter:''}}>
<div style={{transition:'0.3s ease',zIndex:modalAddOpen?999999999:0,display:modalAddOpen?'flex':'flex', justifyContent:'center', alignItems:'center',position:'fixed',width:'100%' ,left:0, right:0, top:modalAddOpen?0:0, bottom:modalAddOpen?0:'100%',background:'rgba(232, 235, 237,0.8)',backdropFilter:'blur(5px)'}}>

                                <div style={{position:'relative',marginTop:modalAddOpen?'0px':'-1000px',transition:'0.3s ease',boxShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",background:'rgba(232, 235, 237,0.8)',borderRadius:'20px',width:'300px', height:'180px',}} >
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',paddingLeft:'20px', paddingRight:'10px',paddingTop:'0px'}}>
                                        <h3 style={{fontSize:''}}>ADD TIPE PASIEN</h3>
                                        <div className="buttonAdd" onClick={()=>{setModalAddOpen(false);setNameTipePasien("")}} style={{cursor:'pointer',display:'flex', borderRadius:'50%', justifyContent:'center',background:"" ,alignItems:'center', padding:'10px',boxShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)"}}>
                                            <MdClose style={{fontSize:'20px',fontWeight:'600', color:"#131313", textShadow:""}}></MdClose>
                                        </div>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'center'}}>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:"250px", height:'50px',boxShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",borderRadius:"40px"}}>

                                        <input value={nameTipePasien} onChange={(e)=>{setNameTipePasien(e.target.value)}} className="inputLoket" style={{fontWeight:600,textShadow: "4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",fontSize:'17px',border:'none', background:'none'}} placeholder="Nama Tipe Pasien"></input>
                                        

                                    </div>
                                    </div>
                                    <div onClick={()=>{handleSaveTipePasien()}} className="buttonAdd" style={{cursor:'pointer',bottom:10,right:10,position:'absolute',display:'flex', justifyContent:'end', paddingRight:''}}>
                                        <div style={{padding:'10px', display:'flex', justifyContent:'center', alignItems:'center',boxShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",textShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)", background:'#fafafa',borderRadius:'10px', color:'#131313',fontWeight:800}}>SAVE</div>
                                    </div>
                                </div>
                        </div>

                        <div style={{display:'flex', alignItems:'center', flexWrap:'wrap',background:'none', gap:'30px'}}>

                       {data?.map((aa,val)=>{

                        return(
                        <div className='' style={{padding:"",width:'calc(33% - 25px)', background:'none'}}>
                            <div   className="anak"style={{border:!dataEdit[aa.id]?"":"1px solid rgba(0,0,0,0.1)",background:!dataEdit[aa.id]?"linear-gradient(90deg, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.8) 20%, rgba(0,0,0,1) 100%)":"#e8ebed",fontSize:'20px', fontWeight:'600',marginTop:'0px', display:'flex', gap:'10px',alignItems:'center', justifyContent:'center', borderTopLeftRadius:'20px',borderTopRightRadius:"20px"}}>
                            {!dataEdit[aa.id]?aa.name:
                                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:"200px", height:'35px',boxShadow:"4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",borderRadius:"40px",}}>

<input value={dataEditVal[aa.id]} onChange={(e)=>{ setDataEditVal(cc=>({[aa.id]:e.target.value}))}} className="inputLoket" style={{fontWeight:600,textShadow: "4px 4px 8px rgb(189 200 213), -4px -4px 8px rgb(255 255 255)",fontSize:'13px',border:'none', background:'none'}} placeholder="Nama Loket"></input>
                                

                            </div>}
                                {!dataEdit[aa.id]?<MdEdit onClick={()=>{setDataEdit(bb=>({[aa.id]:true}) ); setDataEditVal(cc=>({...cc,[aa.id]:aa.name}))}}  className='hover-button' style={{color:'white',cursor:'pointer'}}></MdEdit>:<div><MdCancel onClick={()=>{setDataEdit(bb=>({...bb,[aa.id]:false}) ); setDataEditVal(cc=>({...cc,[aa.id]:""}))}} style={{color:'red',cursor:'pointer'}} ></MdCancel><MdSaveAs style={{color:'black'}} onClick={()=>handleSave(aa.id)}></MdSaveAs></div>}

                            </div>
                            <div className="nft">

                            <div style={{display:'flex', justifyContent:'space-evenly', gap:'5px'}}>
                                <div style={{background:''}}>
                                   
                                    <div style={{display:'flex', justifyContent:'left', height:'30px'}}>Status</div>
                                    
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>Created By</div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>Created At</div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>Updated By</div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>Updated At</div>

                                </div>
                                <div style={{background:''}}>
                                    <div style={{display:'flex', justifyContent:'left', height:'30px'}}>:</div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>:</div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>:</div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>:</div>

                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>:</div>

                                </div>
                                
                                <div style={{background:''}}>
                                    
                                    <div style={{display:'flex', justifyContent:'left', height:'30px'}}>
                                        <input className='inputSw' onChange={()=>!dataLoding[aa.id]?aa?.status=="active"?handleDeactivate(aa.id):handleActivate(aa.id):undefined} checked={aa?.status=="active"} type="checkbox"/>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>{dataUser?.length && dataUser?.findIndex(ar=>ar.id== aa.created_by)!=-1?dataUser[dataUser.findIndex(ar=>ar.id==aa.created_by)].username:aa.created_by}</div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>{aa?.created_at?.replace("T"," ")?.replace("Z","")}</div>
                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>{dataUser?.length && dataUser?.findIndex(ar=>ar.id== aa.updated_by)!=-1?dataUser[dataUser.findIndex(ar=>ar.id==aa.updated_by)].username:aa.updated_by}</div>

                                    <div style={{display:'flex', justifyContent:'left',height:'30px'}}>{aa?.updated_at?.replace("T"," ")?.replace("Z","")}</div>


                                    

                                </div>
                            </div>
                           </div>
                        </div>)
                    })}
                    </div>
                    </div>
    )
}

export default TipePasienPage