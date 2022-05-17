import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

import { Slide } from '@mui/material';
import { EventTracker, SelectionState } from '@devexpress/dx-react-chart';
import { styled } from '@mui/system';



const compare = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;

var data = [
    { when: '5/1', target_data: 0 }//디폴트 그냥 아무값이나 넣어놓음
    
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


export default function ChartGraph({unit_name,target_list,date_list,today_target_value,clicked_date}) {

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
    
  

    const { data:chartData, selection } = state;
    //상단은 그래프에서 기본적으로 제공되는 것들

    const [showChecked, setShowChecked] = useState(false);//선택한 바 그래프 보여주는 transition
    const handleShowSetChange = () => {//선택한 바 그래프  보여주는용도
        setShowChecked((prev) => !prev);
    };


    const sec_convert=(value)=>{//플랭크시 초로 변경해서 리턴해주는 함수    
        let regex=/[^0-9]/g;

        let tmp_list=value.split(regex);
        return parseInt(tmp_list[0])*60+parseInt(tmp_list[1]);
    }

    useEffect(()=>{
        let tmp_data_list=[];
        let tmp_obj;
        let tmp_target;
        
        let regex=/[^0-9]/g;//today_target_value의 형태에서 숫자만 뽑아내기 위한 정규표현식
       

        if(date_list.length===0){//아무것도 최근운동날이 없다면 그냥 오늘날만 보여주자
            if(unit_name==="시간"){//플랭크가 들어왔음을 의미
                tmp_target=sec_convert(today_target_value); //ex)1분 30초면 한글 떼고 90 리턴
            }
            else{
                tmp_target=today_target_value.replace(regex,"");//숫자만 추출 단위떼고
            }

            tmp_obj={
                when:clicked_date.month+"/"+clicked_date.days,
                target_data:parseInt(tmp_target)
            }
            tmp_data_list.push(tmp_obj);
        }
        else{
            for(let idx=0;idx<date_list.length;idx++){
                let date=new Date(date_list[idx]);//날짜객체 만들어서 접근할려고,,

                if(unit_name==="시간"){//플랭크가 들어왔음을 의미
                    let tmp_list=target_list[idx].split(":");
                    let sec_converted=parseInt(tmp_list[1])*60+parseInt(tmp_list[2]);
                    tmp_target=sec_converted;
                }
                else{
                    tmp_target=target_list[idx]
                }

                tmp_obj={
                    when:parseInt(date.getMonth()+1)+"/"+date.getDate(),
                    target_data:parseInt(tmp_target)
                }

                tmp_data_list.push(tmp_obj)
            }
           
        }

        data=tmp_data_list
        console.log(data);
        setState({
            ...state,
            data:tmp_data_list,
        })

        
    },[target_list])

    useEffect(()=>{
        if(selection.length>0){
            handleShowSetChange();//열기
            setTimeout(handleShowSetChange,1000);//닫기
        }
    },[state])

    console.log(state);


    const setName={
        position:"absolute",
        color:"black",
        zIndex:"1",
        fontSize:"2rem",
        bottom:"5em",
        left:"0",
        right:"0",
        backgroundColor:"rgb(255 255 255 / 59%)"
    }


    return (
      <div>
        <Pstyled bold="etc">
            {unit_name}변화
        </Pstyled>
        <Paper sx={{backgroundColor:"white !important",margin:"0 -0.5rem"}}>
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
          </Chart>
        </Paper>

        <Slide  mountOnEnter unmountOnExit direction="up"  in={showChecked}>
                <span className="badge badge-primary" style={setName}>
                    ({selection.length ? data[selection[0].point].when  : undefined})
                    {selection.length ? data[selection[0].point].target_data+today_target_value.replace(new RegExp("[(0-9)]", "gi"), "")  : undefined}
                </span>
        </Slide>
      </div>
    );
  
}