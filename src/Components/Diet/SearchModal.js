import React, { useEffect,useRef,useState } from "react";
import { useSelector,useDispatch } from "react-redux";

import Stack from '@mui/material/Stack';
import { styled } from "@mui/system";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import IconButton from '@mui/material/IconButton';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import Chip from '@mui/material/Chip';


function sleep(ms){
    return new Promise((r)=>setTimeout(r,ms));
}



function SearchModal({where}){

    const closeRef=useRef("");
    const [how_many_people,set_how_many_people]=useState(1);//몇 인분인지 
    const [meals_idx,set_Meals_idx]=useState(0);//끼니의 인덱스를 의미함


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
                        <div className="modal-body" style={{padding:"1rem"}}>
                            <div className="py-3 text-center">
                                <ManageSearchIcon sx={{fontSize:"3.5rem",color:"#2dce89"}}/>
                            </div>
                            <Pstyled bold="lighter">섭취하신 음식을 검색해주세요</Pstyled>
                            
                            <form className="mb-3 d-md-none">
                                <div className="input-group input-group-rounded input-group-merge">
                                    <input type="search" className="form-control form-control-rounded form-control-prepended" placeholder="ex)음식검색" aria-label="Search" />
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <span className="fa fa-search" />
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

                        <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem",marginTop:"2rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1em",display:"block"}}>선택음식-아침</span>
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
                            <span className="badge badge-success" style={{fontSize:"1em",display:"block"}}>선택음식-점심</span>
                            <Pstyled>
                                추가한 음식이 없습니다
                            </Pstyled>
                        </div>

                        <div className="alert alert-secondary" role="alert" style={{marginBottom:"0em",padding:"0.5rem 0.5rem"}}>
                            <span className="badge badge-success" style={{fontSize:"1em",display:"block"}}>선택음식-저녁</span>
                            <Pstyled>
                                추가한 음식이 없습니다
                            </Pstyled>
                        </div>

                        
                        
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" >운동시작</button>
                            <button type="button" className="btn btn-link  ml-auto" data-dismiss="modal">취소</button>
                        </div>
                    </div>
                </div>
          </div>
        );
    
}
export default SearchModal