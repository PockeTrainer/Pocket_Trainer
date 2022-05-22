import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Legend,
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

const data= [
  {
    country: '05/01', hydro: 5
  },{ 
    country: '05/02', hydro: 10
  }, {
    country: '05/03', hydro: 12
  }, {
    country: '05/04', hydro: 80
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

export default function RecordChangeGraph() {
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
             <Tooltip.Content {...props} sx={{color:"black"}} text={data[props.targetItem.point].hydro+"Kg"} />
        </>
      );
     
    }

    const CustomToolTipOverlay=props=>(
      <Tooltip.Overlay {...props} sx={{".MuiPaper-root.Target-root":{backgroundColor:"white !important"}}} />
    );
    
    

    const { data: chartData,selection } = state;

    return (
      <Paper sx={{backgroundColor:"transparent"}}>
        <StyledChart
          data={chartData}
          className={classes.chart}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis labelComponent={CustomArgumentAxis} />
          <ValueAxis
            showGrid={false}
            labelComponent={CustomValueAxis}
           />

          <LineSeries
            name="Hydro-electric"
            valueField="hydro"
            argumentField="country"
            seriesComponent={Line}
            color="#2dce89"
          />
        
          <Pstyled bold="etc">{selection.length ? data[selection[0].point].hydro  : undefined}</Pstyled>
          <EventTracker onClick={click} />
          <SelectionState selection={selection} />
          <Tooltip targetItem={selection.length ? selection[0]  : undefined} 
            contentComponent={CustomToolTipContent}
            overlayComponent={CustomToolTipOverlay}
           />
          <Animation />
          
        </StyledChart>
      </Paper>
    );
  
}
