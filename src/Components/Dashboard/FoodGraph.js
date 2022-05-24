import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';

import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from "react-redux";
import ErrorIcon from '@mui/icons-material/Error';


const compare = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;

var data = [
    { when: '5/1', target_data: 150 },//디폴트 그냥 아무값이나 넣어놓음
    { when: '5/3', target_data: 200 },
    { when: '5/4', target_data: 220 }
];

const Pstyled=styled('p')((props)=>({
    fontSize:"1.0rem",
    fontWeight:props.bold=="lighter"?"lighter":"600",
    lineWeight:"1.0",
    marginBottom:"0",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
}));


export default function FoodGraph({food}) {

    const today_info=useSelector(state=>state.update_mainpage_reducer);//api로부터 불러온 운동정보를 가져옴
    const{nutrient_graph}=today_info;//부위정보 담아주기

    const [is_All_zero,set_is_All_zero]=useState(false);//다 0인지 파악해줌

    const [state,setState]=useState({
        data,
        selection:[]
    })
    
    const click=({ targets })=>{
        const target = targets[0];
        if (target) {
          setState({
            ...state,
            selection: state.selection[0] && compare(state.selection[0], target) ? [] : [target],
          });
        }
    }
    
    const CustomToolTipContent=props=>{
        return(
          <>
               <Tooltip.Content {...props} sx={{color:"black"}} text={data[props.targetItem.point].target_data+"g"} />
          </>
        );
       
      }
  
      const CustomToolTipOverlay=props=>(
        <Tooltip.Overlay {...props} sx={{".MuiPaper-root.Target-root":{backgroundColor:"white !important"}}} />
      );

    const { data:chartData, selection } = state;
    //상단은 그래프에서 기본적으로 제공되는 것들



    useEffect(()=>{
      if(nutrient_graph===''){
        return;
      }

      let tmp_data_list=[];
      let zero_count=0;//다 0이면 따로 예외처리해줄려구
      

      for(let i=0;i<=5;i++){
        let today=new Date();
        let day=new Date(today.setDate(today.getDate()+(i-5)));

        if(nutrient_graph[food][i]===0){
          zero_count+=1;
        }

        let tmp_obj={
          when:parseInt(day.getMonth()+1)+"/"+day.getDate(),
          target_data:nutrient_graph[food][i]
        }
        tmp_data_list.push(tmp_obj);
      }

      if(zero_count===6){
        set_is_All_zero(true);
        return;
      }else{
        set_is_All_zero(false);
      }

      data=tmp_data_list;
      setState({
        ...state,
        data:tmp_data_list
      })
    },[nutrient_graph,food])
   


    return (
      <div>
        
           {
              is_All_zero===true
            &&
            <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
              <Pstyled bold="ligther">
                <ErrorIcon/>해당 영양소의 주간 기록이 없습니다
              </Pstyled>
            </div>
          }
        {
          is_All_zero===false
          &&

          <Paper sx={{backgroundColor:"white !important"}}>
          <Chart
            data={chartData}
            height="300"
          >
            <ArgumentAxis 
                showGrid={true}
            />
            <ValueAxis
                showGrid={false}
            />

            <BarSeries
              valueField="target_data"
              argumentField="when"
              color='#2dce89'
            />
            <EventTracker onClick={click} />
            <SelectionState selection={selection} />
            <Tooltip targetItem={selection.length ? selection[0]  : undefined} 
            contentComponent={CustomToolTipContent}
            overlayComponent={CustomToolTipOverlay}
           />
          </Chart>
        </Paper>

        }
       
        
      </div>
    );
  
}