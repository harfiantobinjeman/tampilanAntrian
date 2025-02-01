import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import useSWR from "swr";


const PanggilanSelanjutnya =()=>{

    const fetcher = async()=>{
      const response = await axios.get("http://192.168.16.108:5000/api/antrianNull",);
      return response.data;
    };
  
    const { data } = useSWR('antrianNull', fetcher);
    if (!data) {
        return <h2>loading ..... ....... ......</h2>
    }
    console.log(data)
    return(
      <>
      {data.map((panggilans,index)=>(
        <>
        <Divider />
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
              <Divider/>
                <b style={{ color:"#fb8c00" }}>ANTRIAN SELANJUTNYA</b>
              <Divider/>
              </Typography>
              <Typography variant="h2" sx={{ color: 'text.secondary' }}>
              <b>{panggilans.noAntrian}</b>
              </Typography>
            </CardContent>
          </Card>
        <Divider />
        </>
      ))}
      </>
    )
  }

  export default PanggilanSelanjutnya