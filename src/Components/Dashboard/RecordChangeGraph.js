import React,{useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';

import axios from "axios";
import ErrorIcon from '@mui/icons-material/Error';



const PREFIX = 'Demo';

const classes = {
  title: `${PREFIX}-title`,
  chart: `${PREFIX}-chart`,
};

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);

var data= [
  {
    when: '05/01', target_data: 5
  },{ 
    when: '05/02', target_data: 10
  }, {
    when: '05/03', target_data: 12
  }, {
    when: '05/04', target_data: 80
  },
];




const CustomArgumentAxis=props=>(
  <ArgumentAxis.Label {...props} sx={{fill:"white !important",fontFamily:"Noto Sans KR"}} />
);

const CustomValueAxis=props=>(
  <ValueAxis.Label {...props} sx={{fill:"white !important",fontFamily:"Noto Sans KR"}} />
);


const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: '30px',
    height:"300px"
  },
}));


const compare = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;


const Pstyled=styled('p')((props)=>({
  fontSize:"1.0rem",
  fontWeight:props.bold=="lighter"?"lighter":"600",
  lineWeight:"1.0",
  marginBottom:"0",
  color:props.color?props.color:"white"
}));

export default function RecordChangeGraph({exercise_eng_name}) {
    const id=sessionStorage.getItem("user_id");

    const [state,setState]=useState({
      data,
      selection:[]
    });


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
             <Tooltip.Content {...props} sx={{color:"black"}} text={data[props.targetItem.point].target_data+"Kg"} />
        </>
      );
     
    }

    const CustomToolTipOverlay=props=>(
      <Tooltip.Overlay {...props} sx={{".MuiPaper-root.Target-root":{backgroundColor:"white !important"}}} />
    );
    
   


    useEffect(async()=>{
      if(exercise_eng_name===""){
          return;
      }
      await axios.get(`http://127.0.0.1:8000/api/history/workoutGraph/${exercise_eng_name}/${id}`)//그래프정보를 불러온다
      .then((res) => {//루틴이 성공적생성가능하다는 것 결국->이미 한 번 평가를 봤다는 뜻 
          console.log(res.data);

          let tmp_data_list=[];

          for(let i=0;i<=7;i++){
            if(res.data.workout_graph.clearworkout_target_avg_lst[i]!==-1){
              let tmp_obj={
                when:res.data.workout_graph.last_8months_lst[i].replace("_","/"),
                target_data:res.data.workout_graph.clearworkout_target_avg_lst[i]
              }
              tmp_data_list.push(tmp_obj);
            }
            
          }
          data=tmp_data_list;
    
          setState({
            ...state,
            data:tmp_data_list
          })
      })
      .catch((err) => {
          console.log(err.response.data)
      })    
    },[exercise_eng_name])


    const { data: chartData,selection } = state;

    return (

      <>

      {
        data.length===0
        &&
        <div className="alert alert-warning" role="alert" style={{padding:"1em 1em",marginBottom:"0em"}}>
          <Pstyled bold="ligther">
            <ErrorIcon/>해당 운동의 한달치 평균데이터가 없습니다
          </Pstyled>
        </div>
      }
      {
        data.length>0
        &&

        <Paper sx={{backgroundColor:"transparent"}}>
        <StyledChart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis labelComponent={CustomArgumentAxis}
          showGrid={true}
           />
          <ValueAxis
            showGrid={false}
            labelComponent={CustomValueAxis}
           />

          <LineSeries
            name="target_data-electric"
            valueField="target_data"
            argumentField="when"
            seriesComponent={Line}
            color="#2dce89"
          />

        
        
          <Pstyled bold="etc">{selection.length ? data[selection[0].point].target_data  : undefined}</Pstyled>
          <EventTracker onClick={click} />
          <SelectionState selection={selection} />
          <Tooltip targetItem={selection.length ? selection[0]  : undefined} 
            contentComponent={CustomToolTipContent}
            overlayComponent={CustomToolTipOverlay}
           />
          <Animation />
          
        </StyledChart>
      </Paper>
        
      }
      

      

      </>
      
    );
  
}
