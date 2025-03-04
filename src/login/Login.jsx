import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActionArea from '@mui/material/CardActionArea';
import WhiteOutline from './../images/white-outline.png'
import Dots from './../images/dots.png'
import Coin from './../images/coin.png'
import Spring from './../images/spring.png'
import Rokcet from './../images/rocket.png'
import Cloud from './../images/cloud.png'
import Stars from './../images/stars.png'
import { FaArrowRight, FaLock, FaUser } from "react-icons/fa";
import './style2.css'
import { jwtDecode } from "jwt-decode";




// import Image1 from './../images/white-outline.png'

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SyncLoader from "react-spinners/SyncLoader";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));


const Login = () => {
  const [username,setUsername] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  React.useEffect(()=>{
    if(localStorage.getItem("token")){
      window.location = "/operator";
    }
  },[])
  const handleLogin = ()=>{
    setLoading(true)
  
    axios.post("https://antrian-online.onrender.com/antrian/v1/admin/user/login",
    {
      username:username,
      password:password,
    }
    ).then((res)=>{
      if(res?.data?.data){
        localStorage.setItem("token", res?.data?.data)
        let dataLogin = jwtDecode(res?.data?.data)
        toast.success("Berhasil Login")
        setTimeout(()=>{
          if(dataLogin?.jti=="849c9eee-e30f-4dc5-9816-9b395b0121b7"){
            window.location = "/admin";

          }else{
            window.location = "/pilihloket";
          }

        },10)
      }else{
        toast.error("Gagal Login, periksa username/password anda")

      }
    }).catch(err=>{
      toast.error("Gagal Login, periksa username/password anda")
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <div>
        <header >
          <div className='body-form'>
            <div className='form-container' style={{overflow:'hidden'}}>
              <div className='col col-1' style={{background:loading?'rgba(255,255,255,0.5)':"rgba(255,255,255,0.3)",position:'absolute',height:'100%',zIndex:2,width:loading?'100%':"55%", borderRadius:loading?'26px 26px 26px 26px':'26px 30% 20% 26px'}}>
                <div className='image-layer' style={{}}>
                  <img src={WhiteOutline} className='form-image-main'></img>
                  <img src={Dots} className='form-image dots'></img>
                  <img src={Coin} className='form-image coin'></img>
                  <img src={Spring} className='form-image spring'></img>
                  <img src={Rokcet} className='form-image rocket'></img>
                  <img src={Cloud} className='form-image cloud'></img>
                  <img src={Stars} className='form-image stars'></img>



                </div>
                <p className="featured-words">@copy right <span>Zaki</span> </p>
              </div>
              <div className='col col-22' style={{opacity:loading?0:1,position:'absolute', left:'55%'}}>
                {/* <div className="btn-box">
                  <button className='btn btn-1' id="login">Sign In</button> 
                  <button className='btn btn-2'>Sign In</button>

                </div> */}
                <div className="login-form" style={{marginTop:'50px'}}>
                  <div className="form-title">
                    <span>Sign In</span>
                  </div>
                  <div className="form-inputs">
                    <div  className="input-box" >
                        <input value={username} onChange={(e)=>setUsername(e.target.value)} type='text' className='input-field' placeholder='Username' required></input>
                        <i className='bx bx-user icon'>
                          <FaUser></FaUser>
                        </i>
                    </div>
                    <div  className="input-box" >
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' className='input-field' placeholder='Password' required></input>
                        <i className='bx bx-user icon'>
                          <FaLock></FaLock>
                        </i>
                    </div>
                    
                    <div className='input-box'>
                        <button onClick={()=>handleLogin()} className='input-submit'>
                          <span>Sign In</span>
                          <i className='bx bx-right-arrow-alt'>
                            <FaArrowRight></FaArrowRight>
                          </i>
                        </button>
                    </div>
                  </div>
                  {/* <div className='social-login'>
                    <i className="bx bxl-google"></i>
                    <i className="bx bxl-google"></i>
                    <i className="bx bxl-google"></i>
                    <i className="bx bxl-google"></i>

                  </div> */}
                </div>
              </div>

            </div>
          </div>
            {/* <div style={{backgroundImage:"url('./bg.jfif')" ,display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', width:'100vw'}}>
                <Card sx={{ width: 405, p : 6 }} style={{border:'2px solid rgba(255,255,255,0.3)',borderRadius:'20px',backdropFilter:"blur(40px)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",background: 'rgba(255, 255, 255, 0.25)'}}>
                    <h3 style={{   color:'rgba(0,0,0,0.7)',}}>WELCOME BACK</h3>
                    <CardContent>
                      <TextField onChange={(e)=>{setUsername(e.target.value)}} value={username}  id="outlined-basic" label="Name" variant="outlined" />
                    </CardContent>
                    <CardContent>
                    <TextField
                     
                      onChange={(e)=>{setPassword(e.target.value)}} value={password}
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                    
                    />
                    </CardContent>
                   <div  style={{ 
                    display:'flex', 
                    marginTop:'15px',
                    justifyContent:'center'}}>
                      <div onClick={()=>{
                        loading?console.log("a"):handleLogin()
                      }}
                      className='glow-on-hover'
                        style={{
                          cursor:'pointer',
                          
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                        
                          height: loading?"60px":'40px',
                          borderRadius:'10px',
                             background:"rgba(255,255,255,0.2)",
                             backdropFilter:"blur(10px)",
                            width:loading?'100px':'100px',
                            boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",
                            color:'rgba(0,0,0,0.7)', fontWeight:1000,WebkitTextStroke:'2px  rgba(255,255,255,0.5)'
                           
                           
                            }}
                        
                      >
                        
                        {loading?
                        <SyncLoader  color='rgb(145, 244, 255)' size={20}/>
                          :
                        <Typography  
                          style={{fontWeight:'700',fontSize:'17px'}}  
                          variant="p" 
                          component="div" 
                          sx={{ p:'2px' }}> 
                              LOGIN
                        </Typography>}
                      </div>
                      </div>
                          
                    
                   
                    </Card>
            </div> */}
        </header>
        <ToastContainer />

    </div>
  )
}

export default Login
