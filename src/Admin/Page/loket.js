import React,{useState,useEffect} from "react";
import axios from 'axios';
import { MdCancel, MdDelete, MdEdit, MdSave, MdSaveAlt, MdSaveAs } from 'react-icons/md';

const LoketPage = ()=>{
    const [data,setData] = useState([])
    const [dataLoding,setDataLoading] = useState([])
    const [dataEdit,setDataEdit] = useState([])
    const [dataEditVal,setDataEditVal] = useState([])



    const [refresh,setRefresh] = useState(false)

    const [dataUser,setDataUser] = useState([])

    const [token,setToken] = useState("")
    useEffect(()=>{
        setToken(localStorage.getItem("token"))
    },[])
    useEffect(()=>{
        if(token){

            axios.get('https://antrian-online.onrender.com/antrian/v1/admin/loket/list?page=1&row_perpage=10',{headers:{Authorization:"Bearer "+token}}).then(res=>{
                setData(res?.data?.data)
            })

            axios.get('https://antrian-online.onrender.com/antrian/v1/admin/user/list?page=1&row_perpage=10',{headers:{Authorization:"Bearer "+token}}).then(res=>{
                setDataUser(res?.data?.data)
            }).catch(err=>{
                console.log(err)
            })
        }
    },[token,refresh])
    const handleDeactivate = (id)=>{
        setDataLoading(aa=>({...aa,[id]:true}))

        axios.post('https://antrian-online.onrender.com/antrian/v1/admin/loket/deactivate',{id:id},{headers:{Authorization:"Bearer "+token}}).then(res=>{
            setRefresh(a=>!a)
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setDataLoading(aa=>({...aa,[id]:false}))
    
            })
    }
    const handleActivate = (id)=>{
        setDataLoading(aa=>({...aa,[id]:true}))
        axios.post('https://antrian-online.onrender.com/antrian/v1/admin/loket/activate',{id:id},{headers:{Authorization:"Bearer "+token}}).then(res=>{
            setRefresh(a=>!a)
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
        setDataLoading(aa=>({...aa,[id]:false}))

        })
    }

    const handleSave = (id)=>{
        setDataLoading(aa=>({...aa,[id]:true}))
        axios.put('https://antrian-online.onrender.com/antrian/v1/admin/loket',{id:id,name:dataEditVal[id]},{headers:{Authorization:"Bearer "+token}}).then(res=>{
            setRefresh(a=>!a)
        }).catch(err=>{
            console.log(err)
        }).finally(()=>{
            setDataLoading(aa=>({...aa,[id]:false}))
            setDataEdit([])
            setDataEditVal([])

        })
    }

    return(
        <div style={{display:'flex',flexWrap:"wrap", justifyContent:'left',alignItems:'center',paddingLeft:'30px',gap:'20px',}}>


                       {data?.map((aa,val)=>{

                        return(
                        <div className='nft' style={{padding:"20px 20px",}}>
                            <div  style={{fontSize:'20px', fontWeight:'600',marginTop:'0px',marginBottom:"18px", display:'flex', gap:'10px',alignItems:'center', justifyContent:'center'}}>
                                {!dataEdit[aa.id]?aa.name:<input value={dataEditVal[aa.id]} onChange={(e)=>{ setDataEditVal(cc=>({[aa.id]:e.target.value}))}} />}


                                {!dataEdit[aa.id]?<MdEdit onClick={()=>{setDataEdit(bb=>({[aa.id]:true}) ); setDataEditVal(cc=>({...cc,[aa.id]:aa.name}))}}  className='hover-button' style={{color:'white',cursor:'pointer'}}></MdEdit>:<div><MdCancel onClick={()=>{setDataEdit(bb=>({...bb,[aa.id]:false}) ); setDataEditVal(cc=>({...cc,[aa.id]:""}))}} style={{color:'red',cursor:'pointer'}} ></MdCancel><MdSaveAs onClick={()=>handleSave(aa.id)}></MdSaveAs></div>}

                            </div>
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
                           
                        </div>)
                    })}
                    </div>
    )
}

export default LoketPage