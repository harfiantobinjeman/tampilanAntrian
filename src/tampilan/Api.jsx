import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Panggil from './Card';
import Button from '@mui/material/Button';
import manual from './manual.json';
import axios from 'axios';

const socket3 = new WebSocket('wss://antrian-online.onrender.com/antrian/v1/loket/user-id');


const cards = [
  {
    antrian: 'ANTRIAN',
    title: 'LOKET 1',
    noAntrian: 'A-7',
  },{
    antrian: 'ANTRIAN',
    title: 'LOKET 2',
    noAntrian: 'A-9',
  },{
    antrian: 'ANTRIAN',
    title: 'LOKET 3',
    noAntrian: 'A-7',
  }
];



export default function Tampilan() {

  const start = (a,b,c) => {

    let strNoAntri = b.split("")
    console.log(strNoAntri[0])
    console.log(strNoAntri[2])

    let angLoket = c.match(/(\d+)/);
    console.log(angLoket[0]);
    
    let noAntrian = new Audio(`/sound/antrian.wav`);
    let abjdAntrian = new Audio(`/sound/${strNoAntri[0]}.wav`);
    let description = new Audio(`/sound/${strNoAntri[2]}.wav`);
    let title = new Audio(`/sound/${c}.wav`);
    let bunyi = new Audio(`/sound/in.wav`);
    let loket = new Audio(`/sound/loket.wav`);
    let nomorLoket = new Audio(`/sound/${angLoket[0]}.wav`)
    //noAntrian.play(SkipNext), description.play(); title.play()
    bunyi.play()
    bunyi.addEventListener('ended',function(){
        noAntrian.play();
        noAntrian.addEventListener('ended',function(){
          abjdAntrian.play();
          abjdAntrian.addEventListener('ended',function(){
            description.play();
            description.addEventListener('ended',function(){
              loket.play();
              loket.addEventListener('ended',function(){
                  nomorLoket.play();
                })
              })
            })
          })
    })
  }

  const [data, setData] = React.useState([])
  const [token, setToken] = React.useState("")
  React.useEffect(()=>{
    setToken(localStorage.getItem("token"))
  },[])
  const [dataMaster, setDataMaster] = React.useState([])

   const [fetchLagi, setFetchLagi] = React.useState(false)
      
   
          socket3.onclose = () => {
              console.log('WebSocket connection closed');
          };
          socket3.onopen = () => {
            console.log('WebSocket connection open');
        };
          socket3.onmessage = (event) => {
              const data = JSON.parse(event.data);
              console.log('Real-time update:', data);
              if(data.type==="selesai" || data.type==="panggil" || data.type==="insert-antrian"){
                  setFetchLagi(!fetchLagi)
              }
          };
      
      
  React.useEffect(()=>{
    axios.get("https://antrian-online.onrender.com/antrian/v1/loket/list-data?row_perpage=3").then(res=>{
      setData(res?.data?.data)
    });
  },[fetchLagi])

  React.useEffect(()=>{
    if(token){
    axios.get("https://antrian-online.onrender.com/antrian/v1/admin/loket/list?page=1&row_perpage=10",{headers:{"Authorization":"Bearer "+token}}).then(res=>{
    //  console.log(res?.data?.data)
      setDataMaster(res?.data?.data)
    });
  }
  },[token])
   

console.log(data, dataMaster)
  if (!dataMaster?.length) {
      return <h2>loading ..... ....... ......</h2>
  }


  return (
    <div style={{ display:'flex', width:'100%',backgroundColor:'purple',alignContent:'center',height:'10000px'}}>
      <Box sx={{ width:'70%',bgcolor:'purple', margin:'10px' }}>
      <CardMedia
          component="video"
          image="/video.mp4"
          loop
          autoPlay muted
          sx={{
            border:"4px solid white",
            // height:'500px',
            display:'flex',
            justifyContent:'center'
            }}
        />
        <Panggil />
      </Box>
      <Box sx={{ width:'30%',bgcolor:'purple' }}>
      {cards.map((card, index) => (
        // {data.map((card, index) => (
          <Card sx={{
            width:'90%',
            margin:'10px',
            height:'190px',
            border:"4px solid #AD88C6"}}>
            <CardActionArea
            onClick={() => 
              (start(
                card.antrian,
                card.noAntrian,
                card.title))
            }
              sx={{
                height: '100%',
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selectedHover',
                  },
              }}
            >
              <CardContent sx={{
                height: '100%',
                padding :0}}>
                <Typography variant="h5" component="div" sx={{
                  fontSize:'40px',
                  fontWeight:'bold',
                  borderBottom:"4px solid",
                  bgcolor:'#C65BCF'}}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary"sx={{
                  fontSize:'20px',
                  bgcolor:'#F8C794',
                  borderBottom:"4px solid black"}}>
                  ANTRIAN
                </Typography>
                <Typography className='Monitor-wrapper' sx={{
                  fontSize:'80px', color:'black'}}>
                  {card.noAntrian}
                </Typography>
                {/* <CardMedia
                  component="audio"
                  image ={`/sound/${card.title}.wav`}
                  id='panggil'
                  autoPlay>
                </CardMedia> */}
              </CardContent>
            </CardActionArea>
            
          </Card>
          
        ))}
      </Box>
      {manual.map((manuals, index) => (
      <marquee style={{
          fontSize:'20px',
          fontWeight:'bold',
          position: 'fixed',
          width: '100%',
          bottom: '0px',
          color:'white',
          borderBottom:"4px solid #d32f2f" }}>
            { manuals.textBerjalan }
          </marquee> 
          ))}
      <Button variant="contained" style={{ position: 'fixed',bottom: '0px' }} color="error">Info   : </Button>
    </div>
  );
}
