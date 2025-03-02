import React from "react";
import './style.css'
import Image2 from './../images/2.png'
import Image1 from './../images/1.jpg'

const PilihLoket = ()=>{
    return(
        <div className="bg-glass" style={{overflow:'hidden',width:'100vw', height:'100vh', padding:'50px'}}>
           
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',width:'cacl(100vw - 100px)', height:'calc(100vh - 100px)', background:'rgba(255,255,255,0.2)', backdropFilter:'blur(10px)', borderRadius:'20px', border:'1px solid rgba(255,255,255,0.8)'}}>
                <h1 style={{color:'white', fontWeight:700,WebkitTextStroke:"1px rgba(71, 151, 255,0.5)"}}>Silahkan Pilih Loket Anda</h1>
                
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'0px',}}>

                    <div class="cardContent">
                        <div style={{background:"#4797ff",top:'-30px',borderRadius:'50%', width:'70px', height:'70px', position:'absolute',zIndex:0}}></div>
                        <div className="content">
                        <div style={{position:'absolute', top:"-4px", height:'40px', display:'flex', justifyContent:'center',alignItems:'center',color:'white', fontSize:'20px',fontWeight:'600'}}>01</div>
                            <h3 style={{color:'rgb(71, 151, 255)',WebkitTextStroke:'1px white',marginTop:'35px', fontWeight:'700'}}>Loket 1</h3>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px',}}>

                    <div class="cardContent">
                        <div style={{background:"#4797ff",top:'-30px',borderRadius:'50%', width:'70px', height:'70px', position:'absolute',zIndex:0}}></div>
                        <div className="content">
                        <div style={{position:'absolute', top:"-4px", height:'40px', display:'flex', justifyContent:'center',alignItems:'center',color:'white', fontSize:'20px',fontWeight:'600'}}>01</div>
                            <h3 style={{color:'rgb(71, 151, 255)', WebkitTextStroke:'1px white',marginTop:'35px', fontWeight:'700'}}>Loket 2</h3>
                    </div>
                </div>



            </div>

            </div>
        </div>
        </div>
    )
}

export default PilihLoket