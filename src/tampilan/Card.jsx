import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import axios from 'axios';
// import useSWR from "swr";

import PanggilanSelanjutnya from './PanggilanSelanjutnya.jsx';

const drawerWidth = 500;
const socket3 = new WebSocket('wss://antrian-online.onrender.com/antrian/v1/loket/user-id');

const RecipeReviewCard = ()=> {
  const [data, setData] = React.useState([])
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
    axios.get("https://antrian-online.onrender.com/antrian/v1/loket/list").then(res=>{
      setData(res?.data?.data)
    });
  },[fetchLagi])
   


  if (!data) {
      return <h2>loading ..... ....... ......</h2>
  }

  return (
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop:'70px'
          },
        }}
        variant="permanent"
        anchor="right"
      >
        {data?.map((panggilans, index)=>(
          <>
            <Divider />
              <Card sx={{ maxWidth: 430,height:200, marginTop:2, marginLeft:4,border:"4px solid black", borderRadius:10,backgroundColor:"#90caf9" }}>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                  <Divider/>
                    <b style={{ color:"#fb8c00" }}>{panggilans.name + "("+panggilans.tipe_pasien_id+")"}</b>
                  <Divider/>
                  </Typography>
                  <Typography variant="h2" sx={{ color: 'text.secondary' }}>
                    {panggilans.number}
                  </Typography>
                </CardContent>
              </Card>
            <Divider />
          </>
        ))}
        <PanggilanSelanjutnya/>
    </Drawer>
  );
}

export default RecipeReviewCard
