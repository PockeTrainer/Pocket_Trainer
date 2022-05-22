import React from 'react';
import Demo from './RecordChangeGraph';
import { styled } from '@mui/material/styles';

function CardGraph(){

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
  
        return(
            <div className="col-xl-8 mb-5 mb-xl-0" data-component="CardGraph">
        <div className="card shadow" style={{borderRadius:"16px",backgroundColor:"#5e72e45c"}}>
          <div className="card-header bg-transparent">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="text-uppercase text-light ls-1 mb-1">레코드변화</h4>
                <Pstyled bold="etc" size={"1.5rem"}>
                    벤치프레스
                </Pstyled>
                <span className="badge badge-success" style={{fontSize:"1.0rem"}}>Kg</span>
              </div>
              <div className="col">
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1" style={{color:"white"}}>운동종류</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                          <option>벤치프레스</option>
                          <option>인클라인프레스</option>
                          <option>덤벨플라이</option>
                          <option>케이블크로스오버</option>
                          <option>딥스</option>
                        </select>
                    </div>
                </form>
              </div>
            </div>
          </div>
          <div className="card-body" style={{padding:"0.5rem"}}>
             {/* 여기다가 넣자 */}
             <Demo/>
          </div>
        </div>
      </div>
        );
    
}
export default CardGraph;