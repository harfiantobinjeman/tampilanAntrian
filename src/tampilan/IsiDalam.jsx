import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import useSWR from "swr";


const IsiDalam =()=>{

    const fetcher = async()=>{
      const response = await axios.get("http://localhost:5000/api/antrianDMS");
      return response.data;
    };
  
    const { data } = useSWR('antrianDMS', fetcher);
    if (!data) {
        return <h2>loading ..... ....... ......</h2>
    }
  
    return (
    <>
      {data.map((panggilans,index)=>(
        <>
        <Card sx={{ width: 500,height:220, marginTop:5, marginLeft:3,border:"4px solid black", borderRadius:10,
              backgroundColor:"#90caf9"
             }}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              <Divider/>
              <b style={{ color:"#fb8c00" }}>{panggilans.loket.namaLoket}</b>
              <Divider/>
            </Typography>
            <Typography variant="h2" sx={{ color: "#424242" }}>
            {panggilans.noAntrian}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
      </Card>
        </>
      ))}
      
    </>
    )
  }

  export default IsiDalam