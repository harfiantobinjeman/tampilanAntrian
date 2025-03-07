import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import axios from 'axios';

const socket3 = new WebSocket(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL_WS}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/loket/user-id`);


const cards = [
  {
    antrian: 'ANTRIAN',
    title: 'LOKET-UMUM',
    noAntrian: 'B-111',
  },{
    antrian: 'ANTRIAN',
    title: 'LOKET 5',
    noAntrian: 'A-72',
  },{
    antrian: 'ANTRIAN',
    title: 'LOKET 6',
    noAntrian: 'A-84',
  }
];

const Panggil = () => {
  const [selectedCard, setSelectedCard] = React.useState(0);

  const start = (a,b,c) => {

    //console.log(a,b,c)

    let strNoAntri = b.split("")
    let intNoAntri = b.match(/(\d+)/);
    let sisa20 ="";
    let sisa30 ="";
    let sisa40 ="";
    let sisa50 ="";
    let sisa60 ="";
    let sisa70 ="";
    let sisa80 ="";
    let sisa90 ="";
    let sisa100 ="";
    if (intNoAntri[0]> 100) {
      sisa100 = intNoAntri[0]-100;
      console.log(sisa100 +"iniii")
    }else if(intNoAntri[0]> 90){
      console.log(sisa90 +"iniii")
      sisa90 = intNoAntri[0]-90;
    }else if(intNoAntri[0]> 80){
      console.log(sisa80 +"iniii")
      sisa80 = intNoAntri[0]-80;
    }else if(intNoAntri[0]> 70){
      console.log(sisa70 +"iniii")
      sisa70 = intNoAntri[0]-70;
    }else if(intNoAntri[0]> 60){
      console.log(sisa60 +"iniii")
      sisa60 = intNoAntri[0]-60;
    }else if(intNoAntri[0]> 50){
      sisa50 = intNoAntri[0]-50;
    }else if(intNoAntri[0]> 40){
      sisa40 = intNoAntri[0]-40;
    }else if(intNoAntri[0]> 30){
      sisa30 = intNoAntri[0]-30;
    }else if(intNoAntri[0]> 20){
      sisa20 = intNoAntri[0]-20;
      console.log(sisa20 +"iniii")
    }
    

    let angLoket =""
    let nomorLoket =""
    if (c.match(/(\d+)/)) {
      angLoket = c.match(/(\d+)/);
      nomorLoket = new Audio(`/sound/${angLoket[0]}.wav`);
      console.log(nomorLoket+"nomor loket")
    }else {
      angLoket = c.split("-");
      console.log(angLoket[1])
      nomorLoket = new Audio(`/sound/${angLoket[1]}.wav`)
    }
    
    //console.log(angLoket[0]);
    
    let noAntrian = new Audio(`/sound/antrian.wav`);
    let abjdAntrian = new Audio(`/sound/${strNoAntri[0]}.wav`);
    let description = new Audio(`/sound/${intNoAntri[0]}.wav`);
    let title = new Audio(`/sound/${c}.wav`);
    let bunyi = new Audio(`/sound/in.wav`);
    let loket = new Audio(`/sound/loket.wav`);
    let duaPuluh = new Audio(`/sound/20.wav`);
    let tigaPuluh = new Audio(`/sound/30.wav`);
    let empatPuluh = new Audio(`/sound/40.wav`);
    let limaPuluh = new Audio(`/sound/50.wav`);
    let enamPuluh = new Audio(`/sound/60.wav`);
    let tujuhPuluh = new Audio(`/sound/70.wav`);
    let delapanPuluh = new Audio(`/sound/80.wav`);
    let sembilanPuluh = new Audio(`/sound/90.wav`);
    let seratus = new Audio(`/sound/100.wav`);
    let sis20 = new Audio(`/sound/${sisa20}.wav`);
    let sis30 = new Audio(`/sound/${sisa30}.wav`);
    let sis40 = new Audio(`/sound/${sisa40}.wav`);
    let sis50 = new Audio(`/sound/${sisa50}.wav`);
    let sis60 = new Audio(`/sound/${sisa60}.wav`);
    let sis70 = new Audio(`/sound/${sisa70}.wav`);
    let sis80 = new Audio(`/sound/${sisa80}.wav`);
    let sis90 = new Audio(`/sound/${sisa90}.wav`);
    let sis100 = new Audio(`/sound/${sisa100}.wav`);

    //noAntrian.play(SkipNext), description.play(); title.play()
    bunyi.play()
    bunyi.addEventListener('ended',function(){
        noAntrian.play();
        noAntrian.addEventListener('ended',function(){
          abjdAntrian.play();
          abjdAntrian.addEventListener('ended',function(){
            if(intNoAntri[0]> 100){
              seratus.play();
              seratus.addEventListener('ended',function(){
                sis100.play();
                sis100.addEventListener('ended',function(){
                  loket.play();
                  loket.addEventListener('ended',function(){
                      nomorLoket.play();
                  })
                })
              })
            }else if(intNoAntri[0]> 90){
              sembilanPuluh.play();
              sembilanPuluh.addEventListener('ended',function(){
                sis90.play();
                sis90.addEventListener('ended',function(){
                  loket.play();
                  loket.addEventListener('ended',function(){
                      nomorLoket.play();
                  })
                })
              })
            }else if(intNoAntri[0]> 80){
              delapanPuluh.play();
              delapanPuluh.addEventListener('ended',function(){
                sis80.play();
                sis80.addEventListener('ended',function(){
                  loket.play();
                  loket.addEventListener('ended',function(){
                      nomorLoket.play();
                  })
                })
              })
            }else if(intNoAntri[0]> 70){
              tujuhPuluh.play();
              tujuhPuluh.addEventListener('ended',function(){
                sis70.play();
                sis70.addEventListener('ended',function(){
                  loket.play();
                  loket.addEventListener('ended',function(){
                      nomorLoket.play();
                  })
                })
              })
            }else if(intNoAntri[0]> 60){
              enamPuluh.play();
              enamPuluh.addEventListener('ended',function(){
                sis60.play();
                sis60.addEventListener('ended',function(){
                  loket.play();
                  loket.addEventListener('ended',function(){
                      nomorLoket.play();
                  })
                })
              })
            }else if(intNoAntri[0]> 50){
              limaPuluh.play();
              limaPuluh.addEventListener('ended',function(){
                sis50.play();
                sis50.addEventListener('ended',function(){
                  loket.play();
                  loket.addEventListener('ended',function(){
                      nomorLoket.play();
                  })
                })
              })
            }else if(intNoAntri[0]> 40){
              empatPuluh.play();
              empatPuluh.addEventListener('ended',function(){
                sis40.play();
                sis40.addEventListener('ended',function(){
                  loket.play();
                  loket.addEventListener('ended',function(){
                      nomorLoket.play();
                  })
                })
              })
            }else if (intNoAntri[0]> 30) {
              tigaPuluh.play();
              tigaPuluh.addEventListener('ended',function(){
              sis30.play();
              sis30.addEventListener('ended',function(){
                loket.play();
                loket.addEventListener('ended',function(){
                    nomorLoket.play();
                })
              })
            })
            }else if(intNoAntri[0]> 20){
              duaPuluh.play();
              duaPuluh.addEventListener('ended',function(){
                sis20.play();
                sis20.addEventListener('ended',function(){
                  loket.play();
                  loket.addEventListener('ended',function(){
                      nomorLoket.play();
                  })
                })
              })
            }else{
            description.play();
            description.addEventListener('ended',function(){
              loket.play();
              loket.addEventListener('ended',function(){
                  nomorLoket.play();
                })
              })
            }
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
      axios.get(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/loket/list-data?row_perpage=3`).then(res=>{
        setData(res?.data?.data)
      });
    },[fetchLagi])
  
    React.useEffect(()=>{
      if(token){
      axios.get(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/admin/loket/list?page=1&row_perpage=10`,{headers:{"Authorization":"Bearer "+token}}).then(res=>{
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
    <div style={{ display:'flex', flexWrap:'wrap', width:'100%' }}>
      {/*  {dataMaster?.map((panggilans, index)=>( */}
      {cards.map((card, index) => (
          <Card sx={{
            width:'30%',
            margin:'10px',
            alignContent:'center',
            height:'100%',
            border:"4px solid #AD88C6"}}>
            <CardActionArea
              onClick={() => 
                (start(
                  card.antrian,
                  card.noAntrian,
                  card.title))
              }
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
                  bgcolor:'#F8C794',
                  borderBottom:"4px solid black"}}>
                  ANTRIAN
                </Typography>
                <Typography className='Monitor-wrapper' sx={{
                  fontSize:'80px', color:'black'}}>
                  {card.noAntrian}
                  {/* {data?.length && data?.findIndex(aa=>aa.name==panggilans.name)!=-1?
                  ("("+data[data.findIndex(aa=>aa.name==panggilans.name)].tipe_pasien_name+") " + 
                  data[data.findIndex(aa=>aa.name==panggilans.name)].number):""} */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          
        ))}
        
    </div>
  )
}

export default Panggil
