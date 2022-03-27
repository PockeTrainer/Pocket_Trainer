import React, { useEffect,useRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";

import Stack from '@mui/material/Stack';
import { styled } from "@mui/system";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import Chip from '@mui/material/Chip';

import axios from "axios";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import CircularProgress from '@mui/material/CircularProgress';
import {Meal} from "../MealsInfo/MealsInfo";


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



function SearchModal({where}){

    const closeRef=useRef("");
    const [how_many_people,set_how_many_people]=useState(1);//몇 인분인지 
    const [meals_idx,set_Meals_idx]=useState(0);//끼니의 인덱스를 의미함
    const [keyword,change_keyword]=useState("");//검색어
    const [data_from_api,set_data_from_api]=useState([""]);//api로부터 받은 식단 데이터

    const [data_searching,set_data_searching]=useState("not_yet");//검색상황을 받음-미검색,로딩중,검색완료,검색결과 없음

    const [checked, setChecked] = useState([]);//검색된기록들중에 체크가 되었는지-지속적으로 체크된 것들의 객체자체를 추가해줌

    const cancelTokensource=useRef();//취소토큰을 담아준다
    const cancel_or_not=useRef(false);//처음들어오는 입력에대해서는 취소할 요청이 없기에 요청취소의 기준이 됨



    const check_toggle=(value,where)=>{//과연 checked에 해당 값이 존재하는지
        let idx=0;
        let currentIndex=-1;
        for (const item of checked){
            if(item.Info_from_api==value){
                currentIndex=idx;
                break;
            }
            idx+=1;
        }
        if(where===undefined){
            return currentIndex
        }
        else{
            return currentIndex===-1?false:true
        }
    }
    const handleToggle = (value) => () => {
        const currentIndex =check_toggle(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            let meal=new Meal(value,how_many_people);//api데이터+기본 디폴트 인분 수를 담은 객체생성
            newChecked.push(meal);
        
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
      };
    
    const handleDelete = () => {
    console.info('You clicked the delete icon.');
    };
    
    
    const handle_howMany=(where)=>{
        if(where==="increase"){
            set_how_many_people(prev=>prev+1);
        }
        else{
            if(how_many_people!==1){
                set_how_many_people(prev=>prev-1);
            }
        }
    }

    const handle_meals=(where)=>{
        if(where==="next"){
            if(meals_idx!==2){
                set_Meals_idx(prev=>prev+1);
            }
            else{
                set_Meals_idx(0)
            }
        }
        else{
            if(meals_idx!==0){
                set_Meals_idx(prev=>prev-1);
            }
            else{
                set_Meals_idx(2)
            }
        }
    }

    const searchAPI = async (keyWord) => {
        if(cancel_or_not.current){//만약에 처음으로 요청한 상황이 아니라면 전에 요청했던 axios를 토큰으로 접근해서 요청취소시켜줌
            cancelTokensource.current.cancel();
        }
        cancel_or_not.current=true;
        cancelTokensource.current=axios.CancelToken.source();//캔슬 토큰을 생성해준다
         axios.get(`/api/4283446d9a824d28a909/I2790/json/1/50/DESC_KOR=${keyWord}`,{
             cancelToken:cancelTokensource.current.token
         })
            .then(res => {
                if (res.data.I2790.total_count != 0) {
                    console.log(res.data.I2790.row);
                    set_data_from_api(res.data.I2790.row);//api로부터 받아온 정보들-음식배열
                    set_data_searching("completed");//검색완료
                } else {
                    console.log("검색결과가 없습니다");
                    set_data_searching("no_result");//결과 없음
                }
            })
            .catch((err)=>{
                set_data_searching("loading");//로딩중
                console.log(err)
            })

    }



    const handleChangeKeyword=(event)=>{//검색을 입력받을때
        // change_keyword(event.target.value);
        if(event.target.value===""){//만약에 아무것도 입력이 없는 상태라면 아직 미입력상태로 전환
            set_data_searching("not_yet");
            cancel_or_not.current=false;
            return;
        }
        searchAPI(event.target.value);
    }

    const meals=[
        "아침",
        "점심",
        "저녁"
    ];
    
    const Pstyled=styled('p')((props)=>({
        fontSize:"1.0rem",
        fontWeight:props.bold=="lighter"?"lighter":"600",
        lineWeight:"1.0",
        marginBottom:"0"
    }))
        
    const searching_result={
        not_yet:"",
        loading:<CircularProgress color="success" />,
        no_result:<Pstyled bold="lighter">검색결과가 없습니다</Pstyled>
    }


    console.log(checked)
   
        return(
            <div className="modal fade" id="modal-search-meals" tabIndex={-1} role="dialog" aria-labelledby="modal-default" aria-hidden="true">
                <div className="modal-dialog modal- modal-dialog-centered modal-" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="modal-title-default">포켓트레이너알리미</h6>
                            <button ref={closeRef} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{padding:"1rem",paddingBottom:"0rem"}}>
                            <div className="text-center">
                                <ManageSearchIcon sx={{fontSize:"3.5rem",color:"#2dce89"}}/>
                            </div>
                            <Pstyled bold="lighter">섭취하신 음식을 검색해주세요</Pstyled>
                            
                            <form className="d-md-none">
                                <div className="input-group input-group-rounded input-group-merge">
                                    <input type="search" className="form-control form-control-rounded form-control-prepended" onChange={handleChangeKeyword}  placeholder="ex)음식검색" aria-label="Search" />
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fa fa-search" onClick={()=>searchAPI(keyword)} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>


                        <Stack direction="row" spacing={1} sx={{justifyContent:"space-around"}}>
                            <Stack direction="column" spacing={1}>
                                <Pstyled bold="etc">인분</Pstyled>
                                <Stack direction="row" spacing={1}>
                                    <IconButton aria-label="decrease" onClick={()=>handle_howMany("decrease")}>
                                        <RemoveCircleIcon/>
                                    </IconButton>
                                    <Pstyled bold="etc">{how_many_people}</Pstyled>
                                    <IconButton aria-label="increase" onClick={()=>handle_howMany("increase")}>
                                        <AddCircleIcon/>
                                    </IconButton>

                                </Stack>
                            </Stack>

                            <Stack direction="column" spacing={1}>
                                <Pstyled bold="etc">식사</Pstyled>
                                <Stack direction="row" spacing={1}>
                                    <IconButton aria-label="previous" onClick={()=>handle_meals("previous")}>
                                        <ArrowCircleLeftIcon/>
                                    </IconButton>
                                    <Pstyled bold="etc">{meals[meals_idx]}</Pstyled>
                                    <IconButton aria-label="next" onClick={()=>handle_meals("next")}>
                                        <ArrowCircleRightIcon/>
                                    </IconButton>

                                </Stack>
                            </Stack>
                        </Stack>

                        {/* 검색기록 */}

                            <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem"}}>

                                {
                                    data_searching==="completed"
                                    ?
                                        <>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', position: 'relative',overflow: 'auto',maxHeight: 300, }}>
                                            {data_from_api.map((value,index) => {
                                                const labelId = `checkbox-list-label-${value}`;

                                                return (
                                                <ListItem
                                                    key={index}
                                                    secondaryAction={
                                                        check_toggle(value,"from_checked")
                                                        ?
                                                        <>
                                                            <Stack direction="row" spacing={1}>
                                                                <IconButton aria-label="decrease" onClick={()=>handle_howMany("decrease")}>
                                                                    <RemoveCircleIcon sx={{fontSize:"1.0rem"}}/>
                                                                </IconButton>
                                                                <Pstyled bold="etc">{how_many_people}</Pstyled>
                                                                <IconButton aria-label="increase" onClick={()=>handle_howMany("increase")}>
                                                                    <AddCircleIcon sx={{fontSize:"1.0rem"}}/>
                                                                </IconButton>

                                                            </Stack>
                                                        </>
                                                        :
                                                        <>
                                                            <IconButton edge="end" aria-label="comments">
                                                                <CommentIcon />
                                                            </IconButton>
                                                        </>

                                                       
                                                    }
                                                    sx={
                                                        check_toggle(value,"from_checked")
                                                        ?
                                                        {".MuiListItemSecondaryAction-root":{
                                                            right:"0px"
                                                        }}
                                                        :
                                                        {".MuiListItemSecondaryAction-root":{
                                                        right:"16px"
                                                        }}}
                                                    disablePadding
                                                >
                                                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                        edge="start"
                                                        checked={check_toggle(value,"from_checked")}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={value.DESC_KOR} secondary={"1회제공량:"+value.SERVING_SIZE+"g"}/>
                                                    </ListItemButton>
                                                </ListItem>
                                                );
                                            })}
                                            </List>

                                        </>
                                    :
                                    <>
                                        {searching_result[data_searching]}
                                    </>
                                }
                                
                            </div>
                            
                        

                       
                        <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem",marginTop:"2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1em",display:"block",margin:"0rem 4rem"}}>선택음식-아침</span>
                            <Chip
                                label="밥"
                                onClick={handleClick}
                                onDelete={handleDelete}
                            />
                            <Chip
                                label="닭"
                                onClick={handleClick}
                                onDelete={handleDelete}
                            />
                            <Chip
                                label="빵"
                                onClick={handleClick}
                                onDelete={handleDelete}
                            />
                        </div>

                        <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1em",display:"block",margin:"0rem 4rem"}}>선택음식-점심</span>
                            <Pstyled>
                                추가한 음식이 없습니다
                            </Pstyled>
                        </div>

                        <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1em",display:"block",margin:"0rem 4rem"}}>선택음식-저녁</span>
                            <Pstyled>
                                추가한 음식이 없습니다
                            </Pstyled>
                        </div>

                        
                        
                        
                        <div className="modal-footer" style={{justifyContent:"space-between"}}>
                            <button type="button" className="btn btn-primary"><i className="ni ni-check-bold"></i>완료</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" ><i className="ni ni-fat-remove"></i>취소</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    
}
export default SearchModal