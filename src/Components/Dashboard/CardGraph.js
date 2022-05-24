import React, { useEffect, useState } from 'react';
import RecordChangeGraph from './RecordChangeGraph';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { Stack } from '@mui/material';

function CardGraph(){

  const today_info=useSelector(state=>state.update_mainpage_reducer);//api로부터 불러온 운동정보를 가져옴
  const {part1,part2,part3}=today_info;
  const total_exercises=[...part1,...part2,...part3];
  const [select,set_select]=useState("");//셀렉트바 눌린값

  const CardBackGround={
    backgroundColor:"rgba(255,255,255,0.4)",
    borderRadius:"16px"
  };

  const Pstyled=styled('p')((props)=>({
    fontSize:props.size?props.size:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0",
    color:props.color?props.color:"white"
  }));

  const handleSelectChange=(e)=>{//셀렉트 값 변경시
    set_select(e.target.value);
    console.log(e.target.value )
  }

  console.log("여기무슨값:",select );

  useEffect(()=>{
    if(total_exercises.length!==0){
      set_select(total_exercises[0].eng_name);//위에 바디파트 값을 잘 불러와줬으면 다시 제대로 설정시켜줌
    }
    
  },[today_info])
 
  
        return(
            <div className="col-xl-8 mb-5 mb-xl-0" data-component="CardGraph">
        <div className="card shadow" style={{borderRadius:"16px",backgroundColor:"#5e72e45c"}}>
          <div className="card-header bg-transparent">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="text-uppercase text-light ls-1 mb-1">레코드변화</h4>
                <Pstyled bold="etc" size={"1.5rem"}>
                    {select.name}
                </Pstyled>
                {
                  (select==="pec_dec_fly"||select==="lat_pull_down"||select==="seated_row"||select==="reverse_pec_dec_fly"||select==="cable_push_down"||select==="arm_curl"||select==="leg_extension")
                  &&
                  <span className="badge badge-success" style={{fontSize:"1.0rem",color:"#2dce89"}}>Lbs</span>
                }
                {
                  select==="plank"
                  &&
                  <span className="badge badge-success" style={{fontSize:"1.0rem",color:"#2dce89"}}>초</span>
                }
                {
                  (select==="crunch"||select==="seated_knees_up")
                  &&
                  <span className="badge badge-success" style={{fontSize:"1.0rem",color:"#2dce89"}}>개</span>
                }
                {
                  (select!=="plank"&&select!=="pec_dec_fly"&&select!=="lat_pull_down"&&select!=="seated_row"&&select!=="reverse_pec_dec_fly"&&select!=="cable_push_down"&&select!=="arm_curl"&&select!=="leg_extension"&&select!=="crunch"&&select!=="seated_knees_up")
                  &&
                  <span className="badge badge-success" style={{fontSize:"1.0rem",color:"#2dce89"}}>Kg</span>
                }
              </div>
              <div className="col">
                <form>
                    <div className="form-group">
                        
                        <Stack direction={"row"} style={{alignItems:"end"}}>
                          <Stack direction={"column"}>
                              <label htmlFor="exampleFormControlSelect1" style={{color:"white"}}>운동종류</label>
                              <select className="form-control" id="exampleFormControlSelect1" value={select} onChange={handleSelectChange}  >
                            {
                              total_exercises.map((exercise,index)=>{
                                return(
                                  <option key={exercise.eng_name+"하하"} value={exercise.eng_name}>{exercise.name}</option>
                                );
                              })
                            }
                            </select>
                          </Stack>
                          <div className="arrow_going_down">
                            <i className="fas fa-arrow-down" style={{fontSize:"2rem",color:"#2dce89"}}></i>
                          </div>
                        </Stack>
                       
                       
                       
                    </div>
                </form>
              </div>
            </div>
          </div>
          <div className="card-body" style={{padding:"0.5rem"}}>
             {/* 여기다가 넣자 */}
             <RecordChangeGraph exercise_eng_name={select}/>
          </div>
        </div>
      </div>
        );
    
}
export default CardGraph;