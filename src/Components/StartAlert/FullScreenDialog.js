import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);//열기용

  const [height, setHeight] = React.useState(30);//키
  const [weight,setWeight]=React.useState(10)//현재무게
  const [goalWeight,setGoalWeight]=React.useState(10);//목표무게

  let hi="hi";

  const [InputState,setInputState]=React.useState({
    height:30,
    weight:10,
    goalWeight:10
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event,child) => {
    console.log(child.props.id)
    setInputState({
      ...InputState,
      ["height"]:event.target.value
    })
  };

  const rendering=()=>{
    const result=[];
    let i=1;
    {/* 
    for(let i=30;i<50;i++){
      result.push(<MenuItem key ={i} value={i}>{i+"cm"}</MenuItem>)
    }
    */}
    result.push(<MenuItem value={i}>{i+"cm"}</MenuItem>)
    return result;
  }

  React.useEffect(()=>{
    console.log("hihi");
    handleClickOpen();
  },[])
  return (
    <div>
      
      
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              신체정보기입
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              저장하기
            </Button>
          </Toolbar>
        </AppBar>
        <div className="card" style={{textAlign:"center"}} >
            <div className="card-body">
                <i class="fas fa-id-card" style={{fontSize:"4em",color:"#5e72e4"}}></i>
                <h2 className="text-gray-dark display-4" >신체정보입력</h2>
                <hr></hr>


                <span className="badge badge-pill badge-primary">cm단위</span>
                <h2 className="text-gray-dark" >신장</h2>
                <FormControl sx={{  minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">신장입력</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={height}
                    onChange={handleChange}
                    autoWidth
                    label="Height"
                  >
                    <MenuItem  value={30}>Twenty</MenuItem>
                    <MenuItem id="hi" value={31}>Twenty one</MenuItem>
                    <MenuItem id={3} value={32}>Twenty one and a half</MenuItem>
                  </Select>
                  <FormHelperText>회원님의 신장을 입력해주세요</FormHelperText>
                </FormControl>

                

                <hr></hr>
                <span className="badge badge-pill badge-primary">kg단위</span>
                <h2 className="text-gray-dark" >현재체중</h2>
                <FormControl sx={{  minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label_1">체중입력</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label_1"
                    id="demo-simple-select-autowidth_1"
                    value={weight}
                    onChange={handleChange}
                    autoWidth
                    label="weight"
                  >

                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                  <FormHelperText>With label + helper text</FormHelperText>
                </FormControl>

                <hr></hr>
                <span className="badge badge-pill badge-primary">kg단위</span>
                <h2 className="text-gray-dark" >목표체중</h2>
                <FormControl sx={{  minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label_2">체중입력</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label_2"
                    id="demo-simple-select-autowidth_2"
                    value={goalWeight}
                    onChange={handleChange}
                    autoWidth
                    label="goalWeight"
                  >

                    <MenuItem value={10}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                  <FormHelperText>With label + helper text</FormHelperText>
                </FormControl>

            </div>
      </div>
      </Dialog>
    </div>
  );
}
