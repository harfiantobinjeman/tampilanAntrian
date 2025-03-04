import React from "react";
import './style.css';
import Image2 from './../images/2.png';
import Image1 from './../images/1.jpg';


const loket = [
    {
      namaLoket: 'LOKET 1',
    },{
      namaLoket: 'LOKET 2',
    },{
      namaLoket: 'LOKET 3',
    },{
        namaLoket: 'LOKET 4',
      },{
        namaLoket: 'LOKET 5',
      },{
        namaLoket: 'LOKET 6',
      },{
        namaLoket: 'LOKET 7',
      }
];

const antrian = [
    {
      nama: 'UMUM',
    },{
      nama: 'BPJS',
    },{
      nama: 'ANSURANSI',
    }
];

const PilihLoket = ()=>{
    return(
        <div className="bg-glass" style={{overflow:'hidden',width:'100vw', height:'100vh',padding:'50px'}}>


        <div style={{
                display:'flex',
                flexWrap:'wrap',
                justifyContent:'center',
                flexDirection:'column',
                width:'cacl(100vw - 100px)', 
                height:'calc(100vh - 100px)', 
                background:'rgba(255, 255, 255, 0.2)', 
                backdropFilter:'blur(10px)', 
                borderRadius:'20px', 
                border:'1px solid rgba(255,255,255,0.8)'}}>
                <div style={{
                    display:'flex',
                    justifyContent:'center',
                    flexDirection:'column',
                    width:'300px', 
                    height:'680px', 
                    background:'rgba(255, 255, 255, 0.2)', 
                    backdropFilter:'blur(10px)', 
                    borderRadius:'20px', 
                    border:'1px solid rgba(255,255,255,0.8)'}}>
                    <h1 style={{color:'white', fontWeight:700,WebkitTextStroke:"1px rgba(71, 151, 255,0.5)"}}>Silahkan Pilih Loket Anda</h1>

                   {loket.map((lokets, index) => (
                            <div class="cardContent" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px',}}>
                                <div className="content">
                                    <h3 style={{color:'rgb(71, 151, 255)',WebkitTextStroke:'1px white', fontWeight:'700'}}>{ lokets.namaLoket }</h3>
                                </div>
                            </div>
                            
                   ))} 
                    
                </div>

                <div style={{
                    display:'flex',
                    flexWrap:'wrap',
                    justifyContent:'center',
                    flexDirection:'column',
                    width:'1150px', 
                    height:'630px', 
                    background:'rgba(255, 255, 255, 0.2)', 
                    backdropFilter:'blur(10px)', 
                    borderRadius:'20px', 
                    border:'1px solid rgba(255,255,255,0.8)'}}>
                        {antrian.map((antrians, index) => (
                            <div class="cardContent" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px',}}>
                                <div className="content">
                                    <h3 style={{color:'rgb(71, 151, 255)',WebkitTextStroke:'1px white', fontWeight:'700'}}>{ antrians.nama }</h3>
                                </div>
                            </div>
                            
                   ))} 
                </div>
                
            </div>   



            {/* <div style={{display:'flex',justifyContent:'center',flexDirection:'column',width:'cacl(100vw - 100px)', height:'calc(100vh - 100px)', background:'rgba(255, 255, 255, 0.2)', backdropFilter:'blur(10px)', borderRadius:'20px', border:'1px solid rgba(255,255,255,0.8)'}}>
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
            </div> */}
        </div>
    )
}

export default PilihLoket