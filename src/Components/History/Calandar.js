import React,{useCallback, useEffect, useRef, useState} from 'react';
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
  AllDayPanel,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';

import $ from 'jquery';
import { appointments,resourcesData } from '../../demo-data/appointments';
import SwipeInfoTab from './SwipeInfoTab';
import Grid from '@mui/material/Grid';
import Room from '@mui/icons-material/Room';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import axios from 'axios';

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
    const id=sessionStorage.getItem("user_id");
    
    const today=new Date();

    const today_year=today.getFullYear();
    const today_month=today.getMonth()+1;
    const today_date=today.getDate();

    const today_data=today_year+"-"+today_month+"-"+today_date;
    const [state,set_State]=useState({//일정들과 기본 스타트 달력형식을 담아줌
        data: [],
        currentViewName: 'Month',
        resources:[{
            fieldName: 'roomId',
            title: 'information',
            instances:resourcesData,
        }]
    });
    const [clicked_cell,set_clicked_cell]=useState({//눌린 셀의 정보를 담아줌
        year:today_year,
        month:today_month,
        days:today_date
    });
    const tmp_navigate_year_and_month=useRef({//
        year:today_year,
        month:today_month
    })//달력 네비게이터에서의 연과월을 의미

    const [tmp_date_what_im_looking,set_tmp_date_what_im_looking]=useState({
        year:today_year,
        month:today_month
    })//현재 내가 보구있는달력의 연과월을 의미
    
    const currentViewNameChange=(currentViewName)=>{//달력 뷰형식 바꿔줌
        set_State({
            ...state,
            currentViewName:currentViewName
        });
    };


    const set_what_im_looking=(date)=>{//현재 달력상에서 내가 보구 있는 페이지의 연과 달을 변경시켜줌
        // console.log(date);
        set_tmp_date_what_im_looking({
            ...tmp_date_what_im_looking,
            year:date.getFullYear(),
            month:date.getMonth()+1
        })

    }

    const [visible,set_visible]=useState(false);//툴팁을 열어서 보여줄지 말지
    const [appointmentMeta, setAppointmentMeta] = useState({//일정 즉 appointment를 내려주고 타겟 값을 툴팁에게 알려준다
        target: null,
        data: {}
      });

    const check_which_clicked=(e,props)=>{//지금 눌린 것의 연,월,일 정보 저장
        console.log(props.startDate);//지금 클릭한 것의 달
        set_clicked_cell({
            ...clicked_cell,
            year:props.startDate.getFullYear(),
            month:props.startDate.getMonth()+1,
            days:props.startDate.getDate()
        })
    }
    const customTimeTableCell = (props) => {  //각각의 달력 칸을 랜더링 해주는 역할
        return (
          <MonthView.TimeTableCell sx={props.startDate.getFullYear()===clicked_cell.year
            &&
            props.startDate.getMonth()+1===clicked_cell.month
            &&
            props.startDate.getDate()==clicked_cell.days
            ?
            {backgroundColor:"#9e9e9e61"}
            :
            null
            } 
            {...props} onClick={(e)=>{check_which_clicked(e,props)} }/>
        );
    };

    const customToolTip=props=>{//툴팁의 배경을 하얀색으로 커스텀 바꿔줌
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

    const change_date=(e,props)=>{//네비게이터 달력에서 눌린 것에따라 밑에 동기화 시켜주는 용도
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
        else if($(e.target).attr("class").includes("MuiBackdrop-root")){//네비게이터 달력이 아닌 다른데를 눌렀을경우-즉 모달창 닫힐때
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
        
    };


    const customDateNavigator=props=>{//커스텀 네비게이터 중 달력부분을 맡는다
        return(
            <StyledNavigator {...props} onClick={(e)=>change_date(e,props)}/>
        );
    };






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


      const get_day_info=async(date)=>{//일별 info 가져오기 툴팁 열릴때
        await axios.get(`http://127.0.0.1:8000/api/history/day/${date.getFullYear()+"-"+parseInt(date.getMonth()+1)+"-"+date.getDate()}/${id}`)//루틴정보 불러와서 부위종류,part1,part2,part3 운동을 나눠서 데이터를 나눠줌
        .then((res) => {
            console.log(res.data);  
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    const customAppointMent=useCallback(({children,data,...restProps})=>{//useCallback을 사용해 자식에서 발생하는 불필요한 랜더링을 막음-이것 안하면 타겟위치로 할수없음
        return(
            <Appointments.Appointment {...restProps} onClick={(e) => {
                console.log(data);
                get_day_info(data.startDate);//api로 일별 정보 불러오기-인자로 날짜를 전달
                set_visible(true);
                setAppointmentMeta({
                    ...appointmentMeta,
                    target:e.target,
                    data:data
                });
              }}>
                {children}
            </Appointments.Appointment>
        );
    },[set_visible,setAppointmentMeta])
    
    const Content = (({//툴팁에서 컨텐츠를 맡던 것
        children, appointmentData, ...restProps
      }) => {
        console.log(appointmentData)
        return(
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData} sx={{".Content-text":{color:'black !important'}}}>
          <Grid container alignItems="center">
            <StyledGrid item xs={2} className={classes.textCenter}>
              {
                    appointmentData.location==="bmi지수"
                    ?
                    null
                    :
                    <StyledRoom className={classes.icon} />
                }
            </StyledGrid>
            <Grid item xs={10} sx={{color:"black"}}>
                {
                    appointmentData.location==="bmi지수"
                    ?
                    null
                    :
                    <span>{appointmentData.location}</span>
                }
            </Grid>
          </Grid>
        </AppointmentTooltip.Content>
      )
      }
    );


  
     

      useEffect(async()=>{//월별 info들 쭉 받아오기
        await axios.get(`http://127.0.0.1:8000/api/history/month/${tmp_date_what_im_looking.year+"-"+tmp_date_what_im_looking.month}/${id}`)//루틴정보 불러와서 부위종류,part1,part2,part3 운동을 나눠서 데이터를 나눠줌
        .then((res) => {
            console.log(res.data);
            let date=1;
            let tmp_bmi_list=[];
            let tmp_clear_list=[];
            for(const item of res.data.bmi_list){
                if(item!==-1){
                    let tmp={   
                        title: item,
                        startDate: new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,date , 0, 0),
                        endDate: new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,date+1 , 0, 0),
                        id: date,
                        location: 'bmi지수',
                        roomId:3
                      }

                      tmp_bmi_list.push(tmp);//배열에추가 appointment
                      
                }
                date+=1;
            }

            date=1;
            for(const item of res.data.is_clear_list){
                if(item!==-1){
                    let tmp={
                        title: item===true?"클리어":"실패",
                        startDate: new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,date , 8, 0),//먼저 툴팁이 눌리기전까지는 그냥 8시로 디폴트로 해두자
                        endDate: new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,date ,12, 0),
                        id: date,
                        location: '어깨+삼두+복근',//이것도 그냥 디폴트로 해놓자
                        roomId:item===true?1:2//1이면 올클리어 2이면 일부 클리어
                      }
                      tmp_clear_list.push(tmp);
                }
                date+=1;
            }
            
            let entire_appointment_list=[...tmp_bmi_list,...tmp_clear_list];//bmi리스트랑 클리어리스트 합친거
            set_State({
                ...state,
                data:entire_appointment_list
            });
            
        })
        .catch((err) => {
            console.log(err)
        })


    },[tmp_date_what_im_looking])



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
            onCurrentDateChange={(date)=>set_what_im_looking(date)}
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
          overlayComponent={customDateNavigator}/>
          {/* 현재 날짜 바꿔주는 것 */}
          <TodayButton messages={{today:"오늘"}}/>
          <ViewSwitcher/>
          {/* 월간,일간 바꿔줌 */}
          <Appointments
            appointmentComponent={customAppointMent}
            />
          {/* 각 일정들을 기재 */}
          <AppointmentTooltip
            showCloseButton
            layoutComponent={customToolTip}
            contentComponent={Content}
            visible={visible}
            onVisibilityChange={set_visible}
            appointmentMeta={appointmentMeta}
            onAppointmentMetaChange={setAppointmentMeta}
          />
          {/* 일정들에 해당하는 툴팁들 자세한 정보를 보여줌 */}
          <AllDayPanel 
            messages={{allDay:"BMI지수"}}
          />
          {/* 일간 달력에 해당하는 맨 위 상단 */}
          <Resources
            data={state.resources}
            mainResourceName='roomId'
          />
        </Scheduler>
      </Paper>

      <SwipeInfoTab/>
      </>
    );
}

