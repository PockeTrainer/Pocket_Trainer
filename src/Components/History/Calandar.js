import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  DayView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  TodayButton,
  AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../../demo-data/appointments';
import SwipeInfoTab from './SwipeInfoTab';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';

const PREFIX = 'Demo';

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

export default function Calandar() {
    const today=new Date();

    const today_year=today.getFullYear();
    const today_month=today.getMonth()+1;
    const today_date=today.getDate();

    const today_data=today_year+"-"+today_month+"-"+today_date;

    const [state,set_State]=useState({//일정들과 기본 스타트 달력형식을 담아줌
        data: appointments,
        currentViewName: 'Month'
    });
    const [clicked_cell,set_clicked_cell]=useState({//눌린 셀의 정보를 담아줌
        year:today_year,
        month:today_month,
        days:today_date
    })
    
    const currentViewNameChange=(currentViewName)=>{//달력 뷰형식 바꿔줌
        set_State({
            ...state,
            currentViewName:currentViewName
        });
    };

   

    const check_which_clicked=(e,props)=>{
        console.log(e.target.innerText);
        console.log(props.startDate.getMonth()+1);//지금 클릭한 것의 달
        set_clicked_cell({
            ...clicked_cell,
            year:props.startDate.getYear(),
            month:props.startDate.getMonth()+1,
            days:props.startDate.getDate()
        })
    }
    const customTimeTableCell = (props) => {    
        return (
          <MonthView.TimeTableCell sx={props.startDate.getYear()===clicked_cell.year
            &&
            props.startDate.getMonth()+1===clicked_cell.month
            &&
            props.startDate.getDate()===clicked_cell.days
            ?
            {backgroundColor:"#5e72e4"}
            :
            null
            } 
            {...props} onClick={(e)=>{check_which_clicked(e,props)} }/>
        );
    };

    const customToolTip=props=>{
        return(
            <AppointmentTooltip.Layout {...props} sx={{".MuiPaper-root":{backgroundColor:"white !important"}}}/>
        );
    }


    const StyledGrid = styled(Grid)(() => ({
        [`&.${classes.textCenter}`]: {
          textAlign: 'center',
        },
      }));
      
      const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
        [`&.${classes.icon}`]: {
          color: palette.action.active,
        },
      }));

    const Content = (({
        children, appointmentData, ...restProps
      }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData} sx={{".Content-text":{color:'black'}}}>
          <Grid container alignItems="center">
            <StyledGrid item xs={2} className={classes.textCenter}>
              <StyledRoom className={classes.icon} />
            </StyledGrid>
            <Grid item xs={10} sx={{color:"black"}}>
              <span>{appointmentData.location}</span>
            </Grid>
          </Grid>
        </AppointmentTooltip.Content>
      ));


    return (
        <>
      <Paper sx={{backgroundColor:"white !important"}}>
        <Scheduler
          data={state.data}
          locale={"ko-KR"}
        >
          <ViewState
            defaultCurrentDate={today_data}
            currentViewName={state.currentViewName}
            onCurrentViewNameChange={currentViewNameChange}
          />
          <MonthView
            displayName='월별'
            timeTableCellComponent={customTimeTableCell}
           />
          <DayView
            displayName='일별'
            startDayHour={7}
            endDayHour={23}
           />
          <Toolbar />
          <DateNavigator />
          <TodayButton messages={{today:"오늘"}}/>
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            layoutComponent={customToolTip}
            contentComponent={Content}
          />
          <AllDayPanel 
            messages={{allDay:"BMI지수"}}
          />
        </Scheduler>
      </Paper>

      <SwipeInfoTab/>
      </>
    );
}

