import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from '../component/Navbar.jsx';
import CardMedia from '@mui/material/CardMedia';
import RecipeReviewCard from './Card.jsx';
import IsiDalam from './IsiDalam.jsx';


const drawerWidth = 900;

export default function Tampilan() {
  return (
    <>
    {/* <ResponsiveAppBar /> */}
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
      >
      </AppBar> */}
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
      >
        <Typography sx={{ marginBottom: 2,width:1100,marginLeft:15}}>
          <CardMedia
            component="video"
            image="/TrainingDex02.mp4"
            autoPlay muted
            sx={{ border:"4px solid black", borderRadius:10 }}
          />
          <Box display={'flex'}>
            <IsiDalam />
          </Box>
        </Typography>
      </Box> */}
      <RecipeReviewCard />
    </Box>
    </>
  );
}
