import React,{useEffect, useRef, useState} from 'react';
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

import $ from 'jquery';
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
    });
    const tmp_navigate_year_and_month=useRef({
        year:today_year,
        month:today_month
    })//달력 네비게이터에서의 연과월을 의미
    
    const currentViewNameChange=(currentViewName)=>{//달력 뷰형식 바꿔줌
        set_State({
            ...state,
            currentViewName:currentViewName
        });
    };

   

    const check_which_clicked=(e,props)=>{
        console.log(e.target.innerText);
        console.log(props.startDate);//지금 클릭한 것의 달
        set_clicked_cell({
            ...clicked_cell,
            year:props.startDate.getFullYear(),
            month:props.startDate.getMonth()+1,
            days:props.startDate.getDate()
        })
    }
    const customTimeTableCell = (props) => {   
        return (
          <MonthView.TimeTableCell sx={props.startDate.getFullYear()===clicked_cell.year
            &&
            props.startDate.getMonth()+1===clicked_cell.month
            &&
            props.startDate.getDate()==clicked_cell.days
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
    };

    const StyledNavigator=styled(DateNavigator.Overlay)(()=>({
        ".MuiPaper-root":{backgroundColor:"#5e72e4 !important"},
        ".MuiTableCell-root":{color:"white"},
        ".MuiTableCell-root.Cell-otherMonth":{color:"rgb(255 252 252 / 38%) !important"},
        ".MuiIconButton-root.NavigationButton-button":{color:"white !important"},
        ".MuiTypography-root":{color:"white"}
    }));

    const change_date=(e,props)=>{
        
        if($(e.target).data('testid')){
            if($(e.target).data('testid')==="ChevronLeftIcon"){//이전 달 버튼
                if(tmp_navigate_year_and_month.current.month===1){//만약에 1월달이면 12월달로 전환 후 1년을 빼준다
                    tmp_navigate_year_and_month.current.month=12;
                    tmp_navigate_year_and_month.current.year-=1;
                }
                else{
                    tmp_navigate_year_and_month.current.month-=1;//그게 아닐경우 한달씩 감소
                }
            }
            else{//오른쪽 달 버튼
                if(tmp_navigate_year_and_month.current.month===12){//만약에 12월달이면 1월달로 전환 후 1년을 더해준다
                    tmp_navigate_year_and_month.current.month=1;
                    tmp_navigate_year_and_month.current.year+=1;
                }
                else{
                    tmp_navigate_year_and_month.current.month+=1;//그게 아닐경우 한달씩 증가
                }
            }
        }
        else if($(e.target).attr("d")){
            if($(e.target).attr("d").includes("M15")){//이전 달 버튼
                if(tmp_navigate_year_and_month.current.month===1){//만약에 1월달이면 12월달로 전환 후 1년을 빼준다
                    tmp_navigate_year_and_month.current.month=12;
                    tmp_navigate_year_and_month.current.year-=1;
                }
                else{
                    tmp_navigate_year_and_month.current.month-=1;//그게 아닐경우 한달씩 감소
                }
            }   
            else{//오른쪽 달 버튼
                if(tmp_navigate_year_and_month.current.month===12){//만약에 12월달이면 1월달로 전환 후 1년을 더해준다
                    tmp_navigate_year_and_month.current.month=1;
                    tmp_navigate_year_and_month.current.year+=1;
                }
                else{
                    tmp_navigate_year_and_month.current.month+=1;//그게 아닐경우 한달씩 증가
                }
            }
        }
        else if($(e.target).attr("class").includes("MuiBackdrop-root")){
            tmp_navigate_year_and_month.current.month=today_month;
            tmp_navigate_year_and_month.current.year=today_year;
        }
        else{//화살표가 아닌 그냥 밑에 날짜들
            let date=e.target.innerText.replace("일","");//순수히 날짜 숫자만 가지게함
            set_clicked_cell({
                ...clicked_cell,
                year:tmp_navigate_year_and_month.current.year,
                month:tmp_navigate_year_and_month.current.month,
                days:date
            })
        }
        
    }
    const customDateNavigator=props=>{
        return(
            <StyledNavigator {...props} onClick={(e)=>change_date(e,props)}/>
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
          {/* 기본적으로 넣어줌 디폴트 날짜 선정 view스위치시 변동시켜줌 */}
          <MonthView
            displayName='월별'
            timeTableCellComponent={customTimeTableCell}
           />
           {/* 월별 달력으로서 각 셀들을 커스텀으로 찍어줌 */}
          <DayView
            displayName='일별'
            startDayHour={7}
            endDayHour={23}
           />
           {/* 일별 달력 */}
          <Toolbar />
          {/* 걍 애는 필수인것같음 */}
          <DateNavigator
          overlayComponent={customDateNavigator} />
          {/* 현재 날짜 바꿔주는 것 */}
          <TodayButton messages={{today:"오늘"}}/>
          <ViewSwitcher/>
          {/* 월간,일간 바꿔줌 */}
          <Appointments />
          {/* 각 일정들을 기재 */}
          <AppointmentTooltip
            showCloseButton
            layoutComponent={customToolTip}
            contentComponent={Content}
          />
          {/* 일정들에 해당하는 툴팁들 자세한 정보를 보여줌 */}
          <AllDayPanel 
            messages={{allDay:"BMI지수"}}
          />
          {/* 일간 달력에 해당하는 맨 위 상단 */}
        </Scheduler>
      </Paper>

      <SwipeInfoTab/>
      </>
    );
}

