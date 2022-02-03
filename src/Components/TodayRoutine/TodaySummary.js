import React,{useState} from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Popover from '@mui/material/Popover';

function TodaySummary(){
    const avatarStyle={
        "&.MuiAvatar-root":{
            margin:"auto",
            width: "60px",
            height:"60px",
            backgroundColor:"#5e72e4",
            fontFamily:"Nanum Gothic",
            fontWeight:"bold"

        }
    }
    const popoverStyle={
        "&.MuiButton-root":{
            display:"flex",
            margin:"auto",
            boxShadow:"0",
            backgroundColor:"rgb(50 50 93 / 0%) "
        }
    }

    const [anchorEl, setAnchorEl] = useState({
        anchor1:null,
        anchor2:null,
        anchor3:null
    });

    const handleClick = (event,select) => {
        console.log(select);
        console.log(event.currentTarget);

        setAnchorEl({
            ...anchorEl,
            [select]:event.currentTarget
        })
        
        // setAnchorEl(event.currentTarget);
    };

    const handleClose = (event,select) => {
        setAnchorEl({
            ...anchorEl,
            [select]:null
        })
    };

    //const open = Boolean(anchorEl);
    const open={
        anchor1:Boolean(anchorEl.anchor1),
        anchor2:Boolean(anchorEl.anchor2),
        anchor3:Boolean(anchorEl.anchor3),
    }
    //const id = open ? 'simple-popover' : undefined;

    const id={
        anchor1:open.anchor1?'simple-popover':undefined,
        anchor2:open.anchor2?'simple-popover':undefined,
        anchor3:open.anchor3?'simple-popover':undefined
    }
    
    return(
        <div className="card bg-secondary shadow mb-3" data-component="AccountInformationCard">
      
        <div className="card-body">
            <i className="far fa-clipboard" style={{fontSize:"4em",color:"#5e72e4"}}></i>
            <h2 className="text-gray-dark display-4" >오늘의부위</h2>
            <hr></hr>

            

            <Button aria-describedby={id.anchor1} variant="contained" onClick={(event)=>handleClick(event,"anchor1")} 
            sx={
                popoverStyle
            }>
                <Avatar sx={avatarStyle}>가슴</Avatar>
            </Button>
            <Popover
                id={id.anchor1}
                open={open.anchor1}
                anchorEl={anchorEl.anchor1}
                onClose={(event)=>handleClose(event,"anchor1")}
                anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
                }}
            >
                {/* <Typography sx={{ p: 2 }}>가슴운동종류:<br></br>1.벤치프레스<br></br>2.인클라인프레스<br></br>3.딥스</Typography> */}
                
                <h3 style={{textAlign:"center",color:"white"}} ><i style={{color:"#f8f9fa"}} className="fas fa-search fa-2x"></i>오늘의 가슴운동</h3>
                
                <p className="card-text">✔벤치프레스</p>
                <p className="card-text">✔인클라인프레스</p>
                <p className="card-text">✔딥스</p>
            </Popover>

            <span className="badge badge-primary btn-lg" style={{fontWeight:"lighter"}}>3종목</span>
            
            <Stack direction="row" spacing={2}>
                <Button aria-describedby={id.anchor2} variant="contained"  onClick={(event)=>handleClick(event,"anchor2")}
                sx={
                    popoverStyle
                }>
                    <Avatar sx={avatarStyle}>삼두</Avatar>
                </Button>
                <Popover
                    id={id.anchor2}
                    open={open.anchor2}
                    anchorEl={anchorEl.anchor2}
                    onClose={(event)=>handleClose(event,"anchor2")}
                    anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                    }}
                >
                    
                    <h3 style={{textAlign:"center",color:"white"}} ><i style={{color:"#f8f9fa"}} className="fas fa-search fa-2x"></i>오늘의 삼두운동</h3>
                    
                    <p className="card-text">✔케이블 푸시다운</p>

                </Popover>

                <Button aria-describedby={id.anchor3} variant="contained" onClick={(event)=>handleClick(event,"anchor3")} select="button3"
                sx={
                    popoverStyle
                }>
                    <Avatar sx={avatarStyle}>복근</Avatar>
                </Button>
                <Popover
                    id={id.anchor3}
                    open={open.anchor3}
                    anchorEl={anchorEl.anchor3}
                    onClose={(event)=>handleClose(event,"anchor3")}
                    anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                    }}
                >
                    
                    <h3 style={{textAlign:"center",color:"white"}} ><i style={{color:"#f8f9fa"}} className="fas fa-search fa-2x"></i>오늘의 복근운동</h3>
                    
                    <p className="card-text">✔크런치</p>
                </Popover>

                
            </Stack>
            <Stack direction="row" spacing={2}>
                <span className="badge badge-primary btn-lg" style={{margin:"auto",fontWeight:"lighter"}}>1종목</span> 
                <span className="badge badge-primary btn-lg" style={{margin:"auto",fontWeight:"lighter"}}>1종목</span> 
            </Stack>
          <p className='card-text' style={{marginTop:"30px"}}>마지막 해당루틴날짜:2022/01/18</p>
          <div className="alert alert-warning" role="alert" style={{padding:"1em 1em"}}>
                <i class="ni ni-like-2"></i>
                <h2><strong>부위별 평균등급</strong></h2>
                <Stack direction="row" spacing={0}>
                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",lineHeight:"2",color:"white"}}>가슴:3등급</span> 
                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2"}}>팔(삼두):2등급</span> 
                <span className="badge badge-default btn-lg" style={{fontWeight:"lighter",color:"white",lineHeight:"2"}}>복근:5등급</span> 
                </Stack>
          </div>
            
        </div>
       
    </div>
    );

}
export default TodaySummary;