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
import { set_info_from_dayinfo } from '../../modules/action';
import { useDispatch } from 'react-redux';

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
    const dispatch=useDispatch();
    
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
        console.log("달력이름:",currentViewName);

        if(currentViewName==="Day"){//일별 달력모드로 갈때 
            get_daily_calandar_info();
        }
        else{//월별 달력으로 갈때
            console.log("월로 가자");
            get_month_info();
        }

        set_State({
            ...state,
            currentViewName:currentViewName
        });
    };


    const set_what_im_looking=(date)=>{//현재 달력상에서 내가 보구 있는 페이지의 연과 달을 변경시켜줌-실제 달력상에서 현재날짜가 바뀔시 호출됨
        console.log("눌린날짜:",date);
        set_tmp_date_what_im_looking({//현재 내가 보구있는 연과 월도 업데이트
            ...tmp_date_what_im_looking,
            year:date.getFullYear(),
            month:date.getMonth()+1
        })
        set_clicked_cell({//클릭되어야하는 셀도 업데이트
            ...clicked_cell,
            year:date.getFullYear(),
            month:date.getMonth()+1,
            days:date.getDate()
        })

    }

    const count=useRef(1);//랜더링 횟수카운트

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
        console.log(e.target);
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

      const get_today_info=async()=>{
            await axios.get(`http://127.0.0.1:8000/history/day/${clicked_cell.year+"-"+clicked_cell.month+"-"+clicked_cell.days}/${id}`)//클릭한 날짜의 오늘날의 정보를 가져와준다
            .then((res) => {
                console.log(res.data);

                dispatch(set_info_from_dayinfo(res.data));//받은 정보를 리덕스에 올리자
        }).catch((err) => {
            console.log(err)
        })
    }   
        const get_daily_calandar_info=async()=>{//일별 그래프 때 해당일에만 해당하는 정보를 가져와준다
            console.log("클릭된셀:",clicked_cell);
            await axios.get(`http://127.0.0.1:8000/history/day/${clicked_cell.year+"-"+clicked_cell.month+"-"+clicked_cell.days}/${id}`)//클릭한 날짜의 오늘날의 정보를 가져와준다
            .then((res) => {
                console.log(res.data);

                dispatch(set_info_from_dayinfo(res.data));//받은 정보를 리덕스에 올리자
                let day_total_list=[];//해당 일에 모든 appointment 박스들을 담는 리스트
                let module= require("../../ExercisesInfo/ExerciseInfo.js");//한글운동명을 불러와줘야함

                if(res.data.day_bmi!==null){
                    let tmp={   
                        title: res.data.day_bmi,
                        startDate: new Date(clicked_cell.year,clicked_cell.month-1,clicked_cell.days , 0, 0),
                        endDate: new Date(clicked_cell.year,clicked_cell.month-1,clicked_cell.days, 23, 59),
                        id: clicked_cell.days+"_daily_bmi",//아마 해당아이디가 그대로 key값으로 쓰이나 봄 따라서 밑에 운동쪽이랑 겹치지 않게 하기위해 _daily_bmi 붙임
                        location: 'bmi지수',
                        roomId:5
                    }

                    day_total_list.push(tmp);
                }
                for(const exercise of res.data.day_history_workout){
                    if(exercise.workout_time!==null){//즉 운동시간이 있던 것들로만 기록을 할 것임
                        let start_datetime=new Date(exercise.start_datetime);
                        let end_datetime=new Date(exercise.end_datetime);

                        let tmp={   
                            title: module[exercise.workout_name.workout_name].name,
                            startDate: new Date(start_datetime.getFullYear(),start_datetime.getMonth(),start_datetime.getDate() , start_datetime.getHours(), start_datetime.getMinutes()),
                            endDate: new Date(end_datetime.getFullYear(),end_datetime.getMonth(),end_datetime.getDate() ,end_datetime.getHours(),end_datetime.getMinutes()),
                            id: clicked_cell.days+"_daily_workoutTime",//아마 해당아이디가 그대로 key값으로 쓰이나 봄 따라서 밑에 운동쪽이랑 겹치지 않게 하기위해 _daily_workoutTime 붙임
                            location: exercise.workout_name.body_part,
                            roomId:exercise.is_clear?6:7//클리어하면 6 실패하면 7
                        }

                        day_total_list.push(tmp);
                    }
                }

                console.log("리스트:",day_total_list)
                set_State({
                ...state,
                data:day_total_list,
                currentViewName:"Day"
            })



            }).catch((err) => {
                console.log(err)
            })
        }

      const get_day_info=async(date,data)=>{//일별 info 가져오기 툴팁 열릴때
        let start_datetime_arr=[];//시작시간 배열
        let end_datetime_arr=[];//종료시간 배열
        let start_Date;
        let end_Date;
        let tmp_location;
        let bodypart=new Set();
        let clear_Map=new Map();//각 부위별로 클리어 여부를 알기 위해 사용됨
        let how_many_clear=0;//몇 부위나 클리어 했는지
        let tmp_room;
        let tmp;//임시객체
        let final_start_time;
        let final_end_time;
        await axios.get(`http://127.0.0.1:8000/history/day/${date.getFullYear()+"-"+parseInt(date.getMonth()+1)+"-"+date.getDate()}/${id}`)//해당 누른 appointment 날짜의 정보를 가져와줌
        .then((res) => {
            console.log(res.data);

            dispatch(set_info_from_dayinfo(res.data));//받은 정보를 리덕스에 올리자

            if(res.data.day_history_workout[0].workout_name.body_part==="가슴"){//맨 앞의 운동을 가지고 미리 clear_map을 초기화해두자
                clear_Map.set("가슴",0).set("삼두",0).set("복근",0);
            }
            else if(res.data.day_history_workout[0].workout_name.body_part==="등"){
                clear_Map.set("등",0).set("이두",0).set("복근",0);
            }
            else{
                clear_Map.set("어깨",0).set("하체",0).set("복근",0);
            }

            for(const exercise of res.data.day_history_workout){
                if(exercise.start_datetime!==null){
                    start_datetime_arr.push(new Date(exercise.start_datetime));
                }
                if(exercise.end_datetime!==null){
                    end_datetime_arr.push(new Date(exercise.end_datetime));
                }

                bodypart.add(exercise.workout_name.body_part);//해당일에 할당된 부위

                
                if(exercise.is_clear){
                    clear_Map.set(exercise.workout_name.body_part,clear_Map.get(exercise.workout_name.body_part)+1);
                    
                }
                

            }

            if(start_datetime_arr.length===0||end_datetime_arr.length===0){//아예 시작한 운동이 없을 때
                final_start_time=data.startDate;
                final_end_time=data.endDate;//이 때에는 시간이 안나오게 표현 해주면 어떨까??..결국 안되는걸로,,,판단
            }
            else{
                final_start_time=new Date(Math.min.apply(null,start_datetime_arr));//가장 이른시간을 시작시간으로 설정
                final_end_time=new Date(Math.max.apply(null,end_datetime_arr));//가장 늦은 시간을 끝나는시간으로 설정

            }

            
            clear_Map.forEach((value,key) => {
                if(value===3&&(key==="가슴"||key==="등"||key==="어깨"||key==="하체")){
                    how_many_clear+=1;
                }
                else if(value===1&&(key==="이두"||key==="삼두"||key==="복근")){
                    how_many_clear+=1;
                }
            });


            console.log("시작시간: ",final_start_time);
            console.log("엔딩시간: ",final_end_time);


            if(data.location==="bmi지수"){//bmi지수일 때에는 그냥 초기로 설정되어 있는 값을 쭉 유지해주자
                start_Date=data.startDate;
                end_Date=data.endDate;
                tmp_location="bmi지수";
                tmp_room=5;
            }
            else{
                start_Date= new Date(final_start_time.getFullYear(),final_start_time.getMonth(),final_start_time.getDate(),final_start_time.getHours(),final_start_time.getMinutes());
                end_Date= new Date(final_end_time.getFullYear(),final_end_time.getMonth(),final_end_time.getDate(),final_end_time.getHours(),final_end_time.getMinutes());
                tmp_location=[...bodypart][0]+"+"+[...bodypart][1]+"+"+[...bodypart][2];
                if(how_many_clear===0){
                    tmp_room=4//올Fail을 의미
                }
                else if(how_many_clear===1){
                    tmp_room=3;//1부위 클리어
                }
                else if(how_many_clear===2){
                    tmp_room=2;//2부위 클리어
                }
                else{
                    tmp_room=3;//올클리어
                }
            }

 
            tmp={   
                title: data.title,
                startDate:start_Date,
                endDate:end_Date ,
                id: data.id,
                location: tmp_location,
                roomId:tmp_room
            } 

            
            // let tmp_list=[...state.data];
            // tmp_list[tmp_list.indexOf(data)]=tmp;//원래 있던 state의 data를 가져와서 해당 지금 눌린 data의 인덱스를 찾아서 해당 인덱스 값만 새로운걸로 치환

            // console.log(tmp_list)

            // set_State({
            //     ...state,
            //     data:tmp_list
            // })



        })
        .catch((err) => {
            console.log(err)
        })

        return tmp
   
    }

    const get_month_info=async()=>{//월별 info들 쭉 받아오기
        await axios.get(`http://127.0.0.1:8000/history/month/${tmp_date_what_im_looking.year+"-"+tmp_date_what_im_looking.month}/${id}`)
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
                        endDate: new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,date , 23,59),
                        id: date+"_hello",//아마 해당아이디가 그대로 key값으로 쓰이나 봄 따라서 밑에 운동쪽이랑 겹치지 않게 하기위해 _hello 붙임
                        location: 'bmi지수',
                        roomId:5
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
                        startDate: new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,date , 0, 0),//먼저 툴팁이 눌리기전까지는 그냥 8시로 디폴트로 해두자
                        endDate: new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,date ,23, 59),
                        id: date,
                        location: '어깨+삼두+복근',//이것도 그냥 디폴트로 해놓자
                        roomId:item===true?1:4//1이면 올클리어 2이면 2부위클리어 3이면 1부위클리어 4이면 올Fail
                      }
                      tmp_clear_list.push(tmp);
                }
                date+=1;
            }
            
            let entire_appointment_list=[...tmp_bmi_list,...tmp_clear_list];//bmi리스트랑 클리어리스트 합친거
            // console.log(entire_appointment_list);
            set_State({
                ...state,
                data:entire_appointment_list,
                currentViewName:"Month"
            });
            
        })
        .catch((err) => {
            console.log(err)
        })

    }

    const customAppointMent=useCallback(({children,data,...restProps})=>{//useCallback을 사용해 자식에서 발생하는 불필요한 랜더링을 막음-이것 안하면 타겟위치로 할수없음
        return(
            <Appointments.Appointment {...restProps} onClick={async(e) => {
                let new_data;
                let data_to_show;//최종적으로 툴팁에서 보여줄 데이터
                // console.log(data);
                // let  tmp={   
                //     title: "실패",
                //     startDate:new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,13, 9, 0),
                //     endDate:new Date(tmp_date_what_im_looking.year, tmp_date_what_im_looking.month-1,13 , 23, 0),
                //     id: 13,
                //     location: "운동",
                //     roomId:3
                // } 

                if(state.currentViewName==="Day"){//일별 달력시에는 그냥 갖고있는거 보여줌 
                    data_to_show=data;
                }
                else{//월별 달력시에는 새로운 데이터 업데이트 해줘서 보여주기
                    new_data= await get_day_info(data.startDate,data)//api로 일별 정보 불러오기-인자로 날짜를 전달
                    console.log(new_data);
                    data_to_show=new_data;
                }
                
                set_clicked_cell({//appointment박스를 눌러도 클릭셀도 같이 이동시켜야하므로
                    ...clicked_cell,
                    year:data.startDate.getFullYear(),
                    month:parseInt(data.startDate.getMonth())+1,
                    days:data.startDate.getDate()
                })
                set_visible(true);
                setAppointmentMeta({
                    ...appointmentMeta,
                    target:e.target,
                    data:data_to_show
                });
              }}>
                {children}
            </Appointments.Appointment>
        );
    },[set_visible,setAppointmentMeta,state.data,state.currentViewName])
    
    const Content = (({//툴팁에서 컨텐츠를 맡던 것
        children, appointmentData, ...restProps
      }) => {
        // console.log(appointmentData)
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


    useEffect(()=>{
        if(state.currentViewName==="Month"){
            get_month_info();//월별 info불러와주기
        }
    },[tmp_date_what_im_looking])


    useEffect(()=>{//클릭한 셀이 달라질 때마다 정보 불러오기 +처음들어왔을 때 오늘날 정보로 업데이트
        if(state.currentViewName==="Month"){
            get_today_info();
        }
        else{
            get_daily_calandar_info();
        }
        
    },[clicked_cell])

    console.log(clicked_cell);

    return (
        <>
      <Paper sx={{backgroundColor:"white !important"}}>
        <Scheduler
          data={state.data}
          locale={"ko-KR"}
        >
          <ViewState
            defaultCurrentDate={today_data}
            currentDate={clicked_cell.year+"-"+clicked_cell.month+"-"+clicked_cell.days}
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

      <SwipeInfoTab clicked_date={clicked_cell} />
      </>
    );
}