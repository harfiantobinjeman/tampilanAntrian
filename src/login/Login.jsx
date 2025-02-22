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
      window.location = "https://antrian-online.netlify.app/operator";
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
        toast.success("Berhasil Login")
        setTimeout(()=>{
          window.location = "https://antrian-online.netlify.app/operator";

        },200)
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
        <header className="App-header">
            <div className="Karcis-container">
                <Card sx={{ maxWidth: 345, p : 6 }} style={{borderBottom:'2px solid rgba(31, 76, 248, 0.4)',borderLeft:'2px solid rgba(31, 76, 248, 1)',borderRight:"2px solid rgba(250, 27, 194,0.3)",borderTop:"2px solid rgba(250, 27, 194,0.2)",backdropFilter:"blur(0px)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",background: 'rgba(31, 76, 248, 0.23)'}}>
                    <h3 style={{color:'rgb(145, 244, 255)'}}>WELCOME BACK</h3>
                    <CardContent>
                      <TextField onChange={(e)=>{setUsername(e.target.value)}} value={username}  sx={{ color:'red',fieldset: {border:"2px solid rgba(31, 76, 248, 1)"}, input: { color: 'rgb(145, 244, 255)'} }} id="outlined-basic" label="Name" variant="outlined" />
                    </CardContent>



                    <CardContent>
                    <TextField
                   onChange={(e)=>{setPassword(e.target.value)}} value={password}
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      sx={{ color:'red',fieldset: { border:"2px solid rgba(31, 76, 248, 1)"}, input: { color: 'rgb(145, 244, 255)'} }}
                    />
                    </CardContent>
                
                   <div  style={{ display:'flex', marginTop:'15px',justifyContent:'center'}}>
                      <div onClick={()=>{
                        loading?console.log("a"):handleLogin()
                      }}
                      className='glow-on-hover'
                        style={{
                          cursor:'pointer',
                          
                          display:'flex',
                          justifyContent:'center',
                          alignItems:'center',
                          border:'2px solid rgba(31, 76, 248, 1)',
                          height: loading?"60px":'40px',
                          borderRadius:'4px',
                        
                            width:loading?'100px':'100px',
                            backdropFilter:"blur(0px)",boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",
                            color:"rgb(145, 244, 255)",
                           
                            }}
                        
                      >
                        
                        {loading?<SyncLoader  color='rgb(145, 244, 255)' size={20}/>:<Typography  style={{fontWeight:'700',fontSize:'17px'}}  variant="p" component="div" sx={{ p:'2px' }}> 
                              LOGIN
                           </Typography>}
                      </div>
                      </div>
                          
                    
                   
                    </Card>
            </div>
        </header>
        <ToastContainer />

    </div>
  )
}

export default Login
