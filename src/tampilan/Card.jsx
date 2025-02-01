import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import useSWR from "swr";

import PanggilanSelanjutnya from './PanggilanSelanjutnya.jsx';

const drawerWidth = 500;

const RecipeReviewCard = ()=> {

  const fetcher = async()=>{
    const response = await axios.get("http://192.168.16.108:5000/api/antrianDM");
    return response.data;
  };

  const { data } = useSWR('antrianDM', fetcher);
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
        {data.map((panggilans, index)=>(
          <>
            <Divider />
              <Card sx={{ maxWidth: 430,height:200, marginTop:2, marginLeft:4,border:"4px solid black", borderRadius:10,backgroundColor:"#90caf9" }}>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                  <Divider/>
                    <b style={{ color:"#fb8c00" }}>{panggilans.loket.namaLoket}</b>
                  <Divider/>
                  </Typography>
                  <Typography variant="h2" sx={{ color: 'text.secondary' }}>
                    {panggilans.noAntrian}
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
