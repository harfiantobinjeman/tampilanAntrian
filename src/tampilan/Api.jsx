import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

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
  },{
    id: 1,
    title: 'LOKET 4',
    description: 'No Antrian',
    noAntrian: 'A-2',
  },{
    id: 1,
    title: 'LOKET 5',
    description: 'No Antrian',
    noAntrian: 'B-1',
  },
];

export default function Tampilan() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
  <>
  <div style={{width:'100%' }}>
    <Box sx={{
      width:'100%',
      display:'flex',
      justifyContent:'center',
      flexWrap:'wrap', }}>
      <Box sx={{width:'67%', margin:'10px' }}>
        <CardMedia
          component="video"
          image="/video.mp4"
          loop
          autoPlay muted
          sx={{
            border:"4px solid",
            // height:'500px',
            display:'flex',
            justifyContent:'center'
            }}
        />
      </Box>
    {cards.map((card, index) => (
        <Card sx={{
          width:'30%',
          margin:'8px',
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
  </div>
  </>
  );
}
