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

  return (
    <div>
        <header className="App-header">
            <div className="Karcis-container">
                <Card sx={{ maxWidth: 345, p : 6 }}>
                    <h3>WELCOME BACK</h3>
                    <CardContent>
                      <TextField id="outlined-basic" label="Name" variant="outlined" />
                    </CardContent>
                    <CardContent>
                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      
                    />
                    </CardContent>
                    <CardContent>
                    <Card>
                      <CardActionArea
                        sx={{
                          height: '100%',
                            backgroundColor: '#BED7DC',
                            '&:hover': {
                              backgroundColor: '#7E8EF1',
                            },
                        }}
                      >
                          <Typography variant="h5" component="div" sx={{ p:'6px' }}>
                            Login
                          </Typography>
                      </CardActionArea>
                    </Card>
                    </CardContent>
                    </Card>
            </div>
        </header>
    </div>
  )
}

export default Login
