import React, { useEffect,useState } from 'react'
import './style.css'
import LoketPng from './../images/vecteezy_food-stall-3d-design_46438619.png'
import PoliPng from './../images/vecteezy_impressive-rustic-cartoon-3d-mri-machine-illustration-exclusive_56946614.png'
import { FaArrowCircleLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { BiSolidArrowFromLeft, BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import Profile from './../images/man.png'
const PilihLoketPoli = ()=>{
    const [showProfile, setShowProfile] = useState(false)
    const [profile,setProfile] = useState({})
    const [password,setPassword] = useState("")
    const [showpassword,setshowPassword] = useState(false)
    const [loading, setLoading] = useState(false)




    useEffect(()=>{
        let kk = setTimeout(()=>{
            const imgSlider = document.querySelector('.img-slider');
const imgFruits = document.querySelectorAll('.img-item.fruit');
const bgs = document.querySelectorAll('.bg');

const infoSlider = document.querySelector('.info-slider');
const infoBox = document.querySelector('.info-box');



const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
let indexSlider = 0;
let index=0;
let direction;

imgFruits[index].children[1].style.display='flex'

nextBtn.addEventListener('click', ()=>{
    indexSlider++;
    imgSlider.style.transform = `rotate(${indexSlider * -90}deg)`;
    imgFruits[index].children[1].style.display='none'
    
    index++
    if(index > imgFruits.length -1){
        index=0;
    }
    document.querySelector('.fruit.active').classList.remove('active')
    imgFruits[index].classList.add('active')

    imgFruits[index].children[1].style.display='flex'

    document.querySelector('.bg.active').classList.remove('active')
    bgs[index].classList.add('active')


    console.log(infoSlider,"nid",direction)
    if(direction==1){
        infoSlider.prepend(infoSlider.lastElementChild)
    }

    direction= -1
    infoBox.style.justifyContent = `flex-start`
    
    infoSlider.style.transform = `translateY(-25%)`

    

})

prevBtn.addEventListener('click', ()=>{
    indexSlider--;
    imgSlider.style.transform = `rotate(${indexSlider * -90}deg)`;
    imgFruits[index].children[1].style.display='none'
    index--
    if(index < 0){
        index=imgFruits.length -1;
    }
    document.querySelector('.fruit.active').classList.remove('active')
    imgFruits[index].classList.add('active')
    imgFruits[index].children[1].style.display='flex'

    document.querySelector('.bg.active').classList.remove('active')
    bgs[index].classList.add('active')


    if(direction==-1){
        infoSlider.appendChild(infoSlider.firstElementChild)
    }
    direction= 1
   
    infoSlider.style.transform = `translateY(25%)`
    infoBox.style.justifyContent = `flex-end`



})

infoSlider.addEventListener('transitionend',()=>{
    if(direction==-1){
        infoSlider.appendChild(infoSlider.firstElementChild)
        console.log(infoSlider.firstElementChild)
    }else if(direction==1){
        infoSlider.prepend(infoSlider.lastElementChild)
    }

    infoSlider.style.transition ='none'
    infoSlider.style.transform ='translateY(0)'

    setTimeout(()=>{
        infoSlider.style.transition ='.5s cubic-bezier(0.645, 0.045, 0.355, 1)'

    })

})
        },500)

        return ()=>{
            clearTimeout(kk);
        }
    },[])
    return(
        <>
        <div style={{zIndex:999,position:'fixed',top:0, background:'rgba(0, 0, 0,0.1)',backdropFilter:'blur(2px)', width:'100%', height:'80px'}}>
                <div style={{position:'relative',padding:'0px 50px',display:'flex', justifyContent:'center', alignItems:'center',height:'100%', width:'100%'}}>
                    <div style={{textShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",position:'absolute',left:'35px',fontWeight:'800', fontSize:'20px', color:'rgba(255,255,255,0.8)'}}>
                        Rumah Sakit

                        
 

                    </div>
                    
                    <div    style={{transition:'0s ease-in-out',fontSize:'20px', fill: "white",textShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}}>
                    <svg
        id="roller"
          color="white"
          width="36"
          height="36"
          class="bi bi-asterisk"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z"
          ></path>
        </svg>
                    </div>
                   
                        <div style={{position:'absolute', right:'35px'}}>
                            
                            <img onClick={()=>{setShowProfile(a=>!a)}} style={{height:'50px',cursor:'pointer',borderRadius:'50%',boxShadow:" rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"}} src={Profile} />
                    <div style={{right:showProfile?0:-1000,padding:'0px 15px',width:'auto',minWidth:'250px',transition:'0.3s ease-in-out',top:60,position:"absolute", background:'rgba(0,0,0,0.5)',backdropFilter:'blur(25px)', height:'160px',borderRadius:'10px', }}>
                        <div style={{color:'white',marginTop:'20px',width:'auto',padding:'0px 0px',marginBottom:'20px',borderBottom:'2px solid white', marginLeft:'10px', marginRight:'10px'}}>
                            <h4 style={{color:'rgba(255,255,255,0.8)',fontWeight:700}}>Hi, {profile?.username}</h4>
                        </div>
                        <div onClick={()=>{setshowPassword(true);setShowProfile(false)}} className="nidzam-button-save2" style={{transition:'0.3s ease-in-out',textAlign:'left',paddingLeft:'25px', color:'white',fontSize:'18px'}}>Change Password</div>
                        <div onClick={()=>{localStorage.removeItem("token");window.location="/login"}} className="nidzam-button-save2" style={{transition:'0.3s ease-in-out',textAlign:'left',paddingLeft:'25px',marginTop:'10px', color:'white'}}>Logout</div>

                    </div>
                        </div>
                    
                </div>
            </div>
        <div class="carousel">
        <div class="bg-box">
            <div class="bg active"></div>
            <div class="bg"></div>
            <div class="bg"></div>
            <div class="bg"></div>

        </div>

        <div class="img-box">
            <div class="img-list">
                <div class="img-slider">
                    <div class="img-item fruit active" style={{"--i":0}}>
                     
                         
                             <h1 class="h1" >
                                 <span>L</span>
                                 <span>O</span>
                                 <span>K</span>
                                 <span>E</span>
                                 <span>T</span>
                                
                             </h1>

                             <div style={{zIndex:99999,color:'white',transform:'rotate(-90deg)',position:'absolute',bottom:'175%',left:'79%',display:'none', justifyContent:'center',alignItems:'center'}}>

                                <div className='btn-nidzam-pilih' onClick={()=>{window.location='/pilihloket?type='}}>PILIH</div>
                            </div>
                         
                    </div>
                    <div class="img-item fruit" style={{"--i":1}}>
                        <h1 class="h1 pol">
                            <span>P</span>
                            <span>O</span>
                            <span>L</span>
                            <span>I</span>
                           
                           
                        </h1>
                        <div style={{color:'white',transform:'rotate(-90deg)',position:'absolute',bottom:'175%',left:'170%',display:'none', justifyContent:'center',alignItems:'center'}}>

                                <div onClick={()=>{window.location='/pilihloket?type=poli'}} className='btn-nidzam-poli'>PILIH</div>
                            </div>
                    </div>
                    <div class="img-item fruit" style={{"--i":2}}>
                       
                        <h1 class="h1">
                            <span>L</span>
                            <span>O</span>
                            <span>K</span>
                            <span>E</span>
                            <span>T</span>
                           
                        </h1>
                        <div style={{color:'white',transform:'rotate(-90deg)',position:'absolute',bottom:'175%',left:'78%',display:'none', justifyContent:'center',alignItems:'center'}}>

<div className='btn-nidzam-pilih' onClick={()=>{window.location='/pilihloket?type='}}>PILIH</div>
</div>
                    </div>
                    <div class="img-item fruit" style={{"--i":3}}>
                        <h1 class="h1 pol">
                            <span>P</span>
                            <span>O</span>
                            <span>L</span>
                            <span>I</span>
                           
                           
                        </h1>
                        <div style={{color:'white',transform:'rotate(-90deg)',position:'absolute',bottom:'175%',left:'170%',display:'none', justifyContent:'center',alignItems:'center'}}>
                            <div className='btn-nidzam-poli' onClick={()=>{window.location='/pilihloket?type=poli'}}> PILIH</div>
                        </div>
                    </div>

                    <div class="img-item" style={{"--i":0,}}>
                        <img src={LoketPng} />
                       
                    </div>
                    <div class="img-item" style={{"--i":1}}>
                        <img src={PoliPng} />
                       
                    </div>
                    <div class="img-item" style={{"--i":2}}>
                        <img src={LoketPng} />
                       
                    </div>
                    <div class="img-item" style={{"--i":3}}>
                        <img src={PoliPng} />
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="info-box">
            <div class="info-slider">
                <div class="info-item" >
                    <h2>SILAHKAN PILIH LOKET</h2>
                   
                </div>
            
                <div class="info-item">
                    <h2>SILAHKAN PILIH POLI</h2>
                   
                    
                </div>
                <div class="info-item">
                    <h2>SILAHKAN PILIH LOKET</h2>
                    
                </div>
                <div class="info-item">
                    <h2>SILAHKAN PILIH POLI</h2>
                </div>
            </div>
        </div>
        <div class="large-text">
            <h2>Operator</h2>
        </div>
        <div class="navigation">
            <span class="prev-btn">
                <FaArrowLeft ></FaArrowLeft >
            </span>
            <span class="next-btn">
            <FaArrowRight ></FaArrowRight >
                
            </span>

        </div>
    </div>

        </>
    )
}

export default PilihLoketPoli