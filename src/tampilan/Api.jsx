import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Panggil from './Card';

const cards = [
  {
    id: 1,
    title: 'LOKET 1',
    description: 'No Antrian',
    noAntrian: 'A-1',
  },{
    id: 1,
    title: 'LOKET 2',
    description: 'No Antrian',
    noAntrian: 'B-1',
  },{
    id: 1,
    title: 'LOKET 3',
    description: 'No Antrian',
    noAntrian: 'C-1',
  }
];


export default function Tampilan() {
  const [selectedCard, setSelectedCard] = React.useState(0);
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
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? '' : undefined}
              sx={{
                height: '100%',
                '&[data-active]': {
                  backgroundColor: 'action.selected',
                  '&:hover': {
                    backgroundColor: 'action.selectedHover',
                  },
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
                  {card.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                  fontSize:'80px',
                  bgcolor:'#F8C794'}}>
                  {card.noAntrian}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          
        ))}
      </Box>
      <marquee style={{
          fontSize:'20px',
          fontWeight:'bold',
          position: 'fixed',
          width: '100%',
          bottom: '10px',
          border: '3px solid #8AC007;' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio voluptate animi iusto minima, temporibus aut harum adipisci consequuntur maiores, illum corporis nam sint laborum, nostrum eum quas. Ab, quidem delectus.
          </marquee>
    </div>
  );
}
