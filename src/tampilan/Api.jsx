import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Panggil from './Card';
import Button from '@mui/material/Button';
import manual from './manual.json'
import { SkipNext } from '@mui/icons-material';

const cards = [
  {
    antrian: 'ANTRIAN',
    title: 'LOKET 1',
    noAntrian: '6',
  },{
    antrian: 'ANTRIAN',
    title: 'LOKET 2',
    noAntrian: '9',
  },{
    antrian: 'ANTRIAN',
    title: 'LOKET 3',
    noAntrian: '7',
  }
];



export default function Tampilan() {

  const start = (a,b,c) => {
    let noAntrian = new Audio(`/sound/${a}.wav`);
    let description = new Audio(`/sound/${b}.wav`);
    let title = new Audio(`/sound/${c}.wav`);
    let bunyi = new Audio(`/sound/in.wav`);
    //noAntrian.play(SkipNext), description.play(); title.play()
    bunyi.play()
    bunyi.addEventListener('ended',function(){
        noAntrian.play();
        noAntrian.addEventListener('ended',function(){
        description.play();
        description.addEventListener('ended',function(){
          title.play();
        })
    })
    })
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
          <Card sx={{
            width:'90%',
            margin:'10px',
            height:'200px',
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
                  bgcolor:'#F8C794' }}>
                  {card.antrian}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  fontSize:'80px',
                  bgcolor:'#F8C794'}}>
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
          bottom: '3px',
          color:'white',
          borderBottom:"4px solid pink" }}>
            { manuals.textBerjalan }
          </marquee>
          ))}
      <Button variant="contained" style={{ position: 'fixed',bottom: '0px' }} color="error">Info   : </Button>
    </div>
  );
}
