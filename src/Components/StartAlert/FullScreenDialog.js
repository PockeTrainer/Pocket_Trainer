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

import { useDispatch, useSelector } from 'react-redux';
import { First_clear_page } from '../../modules/action';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);//열기용

  const dispatch=useDispatch();
  const ref_v=useSelector(state=>state.Appref.ref);//맨 위에 App.js의 있는 모달버튼에 접근해서 가져옴

  const [InputState,setInputState]=React.useState({
    height:30,
    weight:10,
    goalWeight:10
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(First_clear_page());//닫기나 저장하기 버튼을 누르면 다음스텝으로 이동함을 알려준다
    setOpen(false);
    ref_v.current.click()//모달버튼 ref를 스토어에서 가져와 클릭 해줘서 다시 보여줌
  };

  const handleChange = (event,child) => {
    console.log(child.props.select)
    setInputState({
      ...InputState,
      [child.props.select]:event.target.value
    })
  };

  const rendering=(end,select_id,unit)=>{//몸무게와 체중을 쭈욱 랜더링해줌
    const result=[];
    let i=1;
    for(let i=30;i<=end;i++){
      result.push(<MenuItem select={select_id} key ={i} value={i}>{i+unit}</MenuItem>)
    }
    return result;
  };


  React.useEffect(()=>{
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
                <i className="fas fa-id-card" style={{fontSize:"4em",color:"#5e72e4"}}></i>
                <h2 className="text-gray-dark display-4" >신체정보입력</h2>
                <hr></hr>


                <span className="badge badge-pill badge-primary">cm단위</span>
                <h2 className="text-gray-dark" >신장</h2>
                <FormControl sx={{  minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">신장입력</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={InputState.height}
                    onChange={handleChange}
                    autoWidth
                    label="Height"
                  >
                   {rendering(200,"height","cm")}
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
                    value={InputState.weight}
                    onChange={handleChange}
                    autoWidth
                    label="weight"
                  >

                    {rendering(150,"weight","kg")}
                  </Select>
                  <FormHelperText>회원님의 현재체중을 입력해주세요</FormHelperText>
                </FormControl>

                <hr></hr>
                <span className="badge badge-pill badge-primary">kg단위</span>
                <h2 className="text-gray-dark" >목표체중</h2>
                <FormControl sx={{  minWidth: 80 }}>
                  <InputLabel id="demo-simple-select-autowidth-label_2">체중입력</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label_2"
                    id="demo-simple-select-autowidth_2"
                    value={InputState.goalWeight}
                    onChange={handleChange}
                    autoWidth
                    label="goalWeight"
                  >

                    {rendering(150,"goalWeight","kg")}
                  </Select>
                  <FormHelperText>회원님의 목표체중을 골라주세요</FormHelperText>
                </FormControl>

            </div>
      </div>
      </Dialog>
    </div>
  );
}
