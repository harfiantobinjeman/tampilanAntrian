import React,{useEffect} from 'react';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Panggil from './Card';
import Button from '@mui/material/Button';
import manual from './manual.json';
import axios from 'axios';
import './style-tampilan.css'


const cards = [
  {
    antrian: 'UMUM',
    title: 'LOKET 1',
    noAntrian: 'A-7',
  },
];


const cards2 = [
  {
    antrian: 'UMUM',
    title: 'LOKET 1',
    noAntrian: 'A-7',
  },
  {
    antrian: 'BPJS',
    title: 'LOKET 1',
    noAntrian: 'A-7',
  },
  {
    antrian: 'ASURANSI',
    title: 'LOKET 1',
    noAntrian: 'A-7',
  },
  {
    antrian: 'ASURANSI',
    title: 'LOKET 1',
    noAntrian: 'A-7',
  },
  {
    antrian: 'ASURANSI',
    title: 'LOKET 1',
    noAntrian: 'A-7',
  },
];



export default function Tampilan() {
  const socket3 = new WebSocket(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL_WS}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/loket/user-id`);
  
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
 
  const [dataMaster, setDataMaster] = React.useState([])

   const [fetchLagi, setFetchLagi] = React.useState(false)
      
   useEffect(()=>{
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
         
          setFetchLagi(aaa=>!aaa)
              if(data?.type==="panggil"){
                start(data?.data?.tipe_pasien_name,data?.data?.tipe_pasien_code+"-"+data?.data?.number,data?.data?.loket_name)
                // document.getElementById(data?.data?.loket_name).click()
              }
         
      
            
          }
      };

   },[])
          
      
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/loket/list?row_perpage=3`).then(res=>{
      setData(res?.data?.data)
    }).catch(err=>{
      console.log(err)
    });;
  },[fetchLagi])

  useEffect(()=>{
  
    axios.get(`${process.env.REACT_APP_BACKEND_HOST_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}/antrian/v1/loket/list-data?page=1&row_perpage=10`,{headers:{"Authorization":"Bearer "+token}}).then(res=>{
    //  console.log(res?.data?.data)
      setDataMaster(res?.data?.data)
    }).catch(err=>{
      console.log(err)
    });
  
  },[])
  console.log(fetchLagi,"aaaa")
   

// console.log(data, dataMaster)
//   if (!dataMaster?.length) {
//       return <h2>loading ..... ....... ......</h2>
//   }


  return (
    <div style={{width:'100vw', height:'100vh',background:""}}>
    <div style={{ display:'flex', gap:'40px',padding:'10px', justifyContent:'center',width:'calc(100vw)',backgroundColor:'',alignContent:'center',height:'auto'}}>
       <Box sx={{ width:'calc(50% - 40px)',bgcolor:'', display:'flex', justifyContent:'start',alignItems:'center',paddingLeft:'40px', }}>
      {dataMaster.map((card, index) => {
        // {dataMaster?.map((panggilans, index)=>(
          // <Card sx={{
          //   width:'100%',
          //   margin:'10px',
          //   height:'300px',
          //   border:"4px solid #AD88C6"}}>
          //   <CardActionArea
          //   onClick={() => 
          //     (start(
          //       card.antrian,
          //       card.noAntrian,
          //       card.title))
          //   }
          //     sx={{
          //       height: '300px',
          //         backgroundColor: 'action.selected',
          //         '&:hover': {
          //           backgroundColor: 'action.selectedHover',
          //         },
          //     }}
          //   >
          //     <CardContent sx={{
          //       height: '300px',
          //       padding :0}}>
          //       <Typography variant="h5" component="div" sx={{
          //         fontSize:'40px',
          //         fontWeight:'bold',
          //         borderBottom:"4px solid",
          //         bgcolor:'#C65BCF'}}>
          //         {card.title}
          //       </Typography>
          //       <Typography variant="body2" color="text.secondary"sx={{
          //         fontSize:'20px',
          //         height:'auto',
          //         bgcolor:'#F8C794',
          //         borderBottom:"4px solid black"}}>
          //                            {card.antrian}

          //       </Typography>
          //       <Typography className='Monitor-wrapper' sx={{
          //         height:'204px',
          //         display:'flex',justifyContent:'center',alignItems:'center',
          //         fontSize:'80px', color:'black'}}>
          //         {card.noAntrian}
          //         {/* {data?.length && data?.findIndex(aa=>aa.name==panggilans.name)!=-1?
          //         ("("+data[data.findIndex(aa=>aa.name==panggilans.name)].tipe_pasien_name+") " + 
          //         data[data.findIndex(aa=>aa.name==panggilans.name)].number):""} */}
          //       </Typography>
          //       {/* <CardMedia
          //         component="audio"
          //         image ={`/sound/${card.title}.wav`}
          //         id='panggil'
          //         autoPlay>
          //       </CardMedia> */}
          //     </CardContent>
          //   </CardActionArea>
            
          // </Card>
  if(index==0){
      return(
          <div id={card.name}
          

         
          
          
          class="card-wrap" style={{height:'300px', width:'100%'}}>
              <div class="card-header2 mm0" style={{height:'160px',fontSize:'80px',color:'white', fontWeight:'800'}}>
              {data?.length && data?.findIndex(aa=>aa.name==card.name)!=-1?
                  (data[data.findIndex(aa=>aa.name==card.name)].tipe_pasien_code+"-" + 
                  data[data.findIndex(aa=>aa.name==card.name)].number):""} 
              </div>
              <div class="card-content">
                <h1 class="card-title" style={{fontSize:'40px', fontWeight:'800'}}>{card.name}</h1>
                <p class="card-text" style={{fontSize:'30px',marginTop:'0px'}}>{data?.length && data?.findIndex(aa=>aa.name==card.name)!=-1?
                  data[data.findIndex(aa=>aa.name==card.name)].tipe_pasien_name:""}</p>
               
            </div>
          </div>)}
          
})}
      </Box>
      <Box sx={{ width:'50%',bgcolor:'', margin:'10px',}}>
      <CardMedia
          component="video"
          image="/video.mp4"
          loop
          autoPlay muted
          sx={{
            boxShadow:"rgba(0, 0, 0, 0.19) 0px 10px 20px,rgba(0, 0, 0, 0.23) 0px 6px 6px",
            border:"4px solid white",
            borderRadius:'20px',
            height:'330px',
            width:'590px',
            objectFit:'cover',
            display:'flex',
            justifyContent:'center'
            }}
        />
        {/* <Panggil /> */}
      </Box>
     
     
    </div>
    <div style={{display:'flex', gap:'20px', height:'30%', padding:'0px 30px', justifyContent:'center', alignItems:'center'}}>
    {dataMaster.map((card, index) => {
        // {dataMaster?.map((panggilans, index)=>(

          if(index>0){
            return(
            
          <div 
        id={card.name} class="card-wrap" style={{height:'180px'}}>
  <div class={`card-header2 mm${index}`} style={{height:'80px', fontSize:'50px', color:'white', fontWeight:'700'}}>
  {data?.length && data?.findIndex(aa=>aa.name==card.name)!=-1?
                  (data[data.findIndex(aa=>aa.name==card.name)].tipe_pasien_code+"-" + 
                  data[data.findIndex(aa=>aa.name==card.name)].number):""} 

  </div>
  <div class="card-content">
    <h1 class="card-title" style={{fontSize:'25px', fontWeight:700, }}>{card.name}</h1>
    <p class="card-text" style={{fontSize:'18px', fontWeight:600}}>  {data?.length && data?.findIndex(aa=>aa.name==card.name)!=-1?
                  data[data.findIndex(aa=>aa.name==card.name)].tipe_pasien_name:""} </p>
    
 </div>
</div>
  
)
}
})}
    </div>
    {manual.map((manuals, index) => (
      <marquee style={{
          fontSize:'20px',
          fontWeight:'bold',
          position: 'fixed',
          left:0,
          width: '100%',
          bottom: '0px',
          color:'gray',
          borderBottom:"4px solid #d32f2f" }}>
            { manuals.textBerjalan }
          </marquee> 
          ))}
      <Button variant="contained" style={{ position: 'fixed',bottom: '0px', left:0, }} color="error">Info   : </Button>

    </div>
  );
}
