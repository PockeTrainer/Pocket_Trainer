import * as React from 'react';
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

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      selection: [],
    };

    this.click = ({ targets }) => {
      const target = targets[0];
      if (target) {
        this.setState(({ selection }) => ({
          selection: selection[0] && compare(selection[0], target) ? [] : [target],
        }));
      }
    };
  }

  render() {
    const { data: chartData, selection } = this.state;

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
            <EventTracker onClick={this.click} />
            <SelectionState selection={selection} />
          </Chart>
        </Paper>
      </div>
    );
  }
}
