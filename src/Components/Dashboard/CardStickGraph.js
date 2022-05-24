import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import FoodGraph from './FoodGraph';
import { Stack } from '@mui/material';

const Pstyled=styled('p')((props)=>({
    fontSize:props.size?props.size:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0",
    color:props.color?props.color:"white"
  }));
function CardStickGraph(){

    const [select,set_select]=useState("carbohydrate_list");

    const handleSelectChange=(e)=>{//셀렉트 값 변경시
        set_select(e.target.value);
      }
    
    const name={
        carbohydrate_list:"탄수화물",
        protein_list:"단백질",
        province_list:"지방"
    }

        return(
            <div className="col-xl-4" data-component="CardStickGraph">
                <div className="card shadow" style={{borderRadius:"16px",backgroundColor:"#2dce89"}}>
                    <div className="card-header bg-transparent">
                            <div className="row align-items-center">
                                    <div className="col">
                                        <h5 className="text-uppercase text-white ls-1 mb-1">영양소별 주간변화량</h5>
                                        <Pstyled bold="etc" size={"1.5rem"}>
                                            {name[select]}
                                        </Pstyled>
                                        <span className="badge badge-success" style={{fontSize:"1.0rem"}}>g</span>
                                    </div>
                                    <div className="col">
                                        <form>
                                            <div className="form-group">
                                                <Stack direction={"row"} style={{alignItems:"end"}}>
                                                    <Stack direction={"column"} style={{marginLeft:"2rem"}}>
                                                        <label htmlFor="exampleFormControlSelect1" style={{color:"white"}}>영양소종류</label>
                                                        <select className="form-control" id="exampleFormControlSelect1" value={select} onChange={handleSelectChange} >
                                                            <option value={"carbohydrate_list"} key={"carbohydrate_list"}>탄수화물</option>
                                                            <option value={"protein_list"} key={"protein_list"}>단백질</option>
                                                            <option value={"province_list"} key={"province_list"}>지방</option>
                                                        </select>
                                                    </Stack>
                                                    <div className="arrow_going_down">
                                                        <i className="fas fa-arrow-down" style={{fontSize:"2rem",color:"#5e72e4"}}></i>
                                                    </div>
                                                </Stack>
                                                
                                            </div>
                                        </form>
                                    </div>
                            </div>
                    </div>
                <div className="card-body" style={{padding:"0.5rem"}}>
                   {/* 여기다가 식단 그래프 */}
                   <FoodGraph food={select}/>
                </div>
                </div>
          </div> 
        );
    
}
export default CardStickGraph;