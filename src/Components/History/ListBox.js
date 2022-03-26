import React,{useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



//한글 바이트 별로 잘라는 함수
String.prototype.cut = function(len) {

    var str = this;
    var s = 0;
    for (var i=0; i<str.length; i++) {
    s += (str.charCodeAt(i) > 128) ? 2 : 1;
    if (s > len) return str.substring(0,i);
    }
    return str;
  
  }
export default function ListBox({where,set_tmp_list}) {
  const [foods,setFoods]=useState([
    "현미밥",
    "닭가슴살",
    "사과",
    "오리구이",
    "빵"
  ]);
 const copy_foods=foods;

if(where==="exercise_calander"){
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {["덤벨숄더프레스","사이드레터럴레이즈","리버스팩덱플라이"].map((value,index) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <CheckCircleIcon/>
            }
            disablePadding
          >
            <ListItemButton onClick={()=>set_tmp_list(index)}>
              <ListItemAvatar>
                <Avatar>{value.cut(2)}</Avatar>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={value} secondary={"5kg"} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

else{
  const popFood=(index)=>{
    copy_foods.splice(index,1);
    setFoods([...copy_foods]);
  }

  return (
    <>
      <span className="badge badge-secondary" style={{fontSize:"1.5em",marginTop:"0.5em",backgroundColor:"#dee2e6",color:"black"}}>아침</span>

      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {foods.map((value,index) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton aria-label="delete" onClick={()=>popFood(index)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton >
                <ListItemAvatar>
                  <Avatar>{value.cut(2)}</Avatar>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value} secondary={"5kg"} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      
    </>
  );
}
  
}
