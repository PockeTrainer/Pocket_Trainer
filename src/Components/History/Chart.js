import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';

const data = [
  { year: '5/1', population: 5 },
  { year: '5/2', population: 10 },
  { year: '5/3', population: 8 },
  { year: '5/4', population: 12 }
];

const compare = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;



export default function Demo() {

    const [state,setState]=useState({
        data,
        selection:[]
    })
    
    const click=({ targets })=>{
        const target = targets[0];
        if (target) {
          setState(({ selection }) => ({
            selection: selection[0] && compare(selection[0], target) ? [] : [target],
          }));
        }
    }
    
  

    const { data:chartData, selection } = state;

    return (
      <div>
        <span>
          Selected value:
          {' '}
          {selection.length ? data[selection[0].point].population : undefined}
        </span>
        <Paper sx={{backgroundColor:"white !important",margin:"0 -0.5rem"}}>
          <Chart
            data={chartData}
            height="300"
          >
            <ArgumentAxis 
                showLine={true}
            />
            <ValueAxis
                showGrid={false}
            />

            <BarSeries
              valueField="population"
              argumentField="year"
              color='#2dce89'
            />
            <EventTracker onClick={click} />
            <SelectionState selection={selection} />
          </Chart>
        </Paper>
      </div>
    );
  
}
