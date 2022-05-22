/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import styles from "../../CustomCss/Horizontal_DatePicker/DatePicker.module.css";
import {
    addDays,
    addMonths,
    differenceInMonths,
    format,
    isSameDay,
    lastDayOfMonth,
    startOfMonth,
} from "date-fns";
import ko from "date-fns/locale/ko";

const DateView = ({startDate, lastDate, selectDate, getSelectedDay, primaryColor, labelFormat, marked}) => {
    const today=new Date();//오늘 날짜
    const [selectedDate, setSelectedDate] = useState(null);
    const firstSection = {marginLeft: '40px'};
    const selectedStyle = {fontWeight:"bold",width:"3rem",height:"3rem",borderRadius:"50%",border:`2px solid ${primaryColor}`,color:primaryColor};
    const labelColor = {
        color: "rgb(22 20 20)",
        backgroundColor:"#dee2e6",
        borderRadius:"0.575rem",
        padding:"0.15rem 0.15rem"

    };
    const markedStyle = {color: "#8c3737", padding: "2px", fontSize: 12};

    const getStyles = (day) => {
        return isSameDay(day, selectedDate)?selectedStyle:null;
    };

    const getId = (day) => {
        return isSameDay(day, selectedDate)?'selected':"";
    };

    const getMarked = (day) => {
        let markedRes = marked.find(i => isSameDay(i.date, day));
        if (markedRes) {
            if (!markedRes?.marked) {
                return;
            }

            return <div style={{ ...markedRes?.style ?? markedStyle }} className={styles.markedLabel}>
                {markedRes.text}
            </div>;
        }

        return "";
    };

    const renderDays = () => {
        const dayFormat = "E";
        const dateFormat = "d";

        const months = [];
        let days = [];

        // const styleItemMarked = marked ? styles.dateDayItemMarked : styles.dateDayItem;

        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            const month = startOfMonth(addMonths(startDate, i));

            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));

            for (let j = start; j < end; j++) {
                let currentDay = addDays(month, j);

                days.push(
                    <div id={`${getId(currentDay)}`}
                         className={marked ? styles.dateDayItemMarked : styles.dateDayItem}
                         style={getStyles(currentDay)}
                         key={currentDay}
                         onClick={() => onDateClick(currentDay)}
                    >
                        <div className={styles.dayLabel}>{format(currentDay, dayFormat,{locale:ko})}</div>
                        <div className={styles.dateLabel}>{format(currentDay, dateFormat,{locale:ko})}</div>
                        {getMarked(currentDay)}
                    </div>
                );
            }
            months.push(
                <div className={styles.monthContainer}
                     key={month}
                >
                    <span className={styles.monthYearLabel} style={labelColor}>
                        {format(month, labelFormat || "yyyy MMMM",{locale:ko})}
                    </span>
                    <div className={styles.daysContainer} style={i===0?firstSection:null}>
                        {days}
                    </div>
                </div>
            );
            days = [];

        }

        return <div id={"container"} className={styles.dateListScrollable}>{months}</div>;
    }

    const onDateClick = day => {
        if(day.getTime()>today.getTime()){//오늘보다 미래일경우에는 스킵
            return;
        }
        setSelectedDate(day);
        if (getSelectedDay) {
            getSelectedDay(day);
        }
    };

    useEffect(() => {
        if (getSelectedDay) {
            if (selectDate) {
                getSelectedDay(selectDate);
            } else {
                getSelectedDay(startDate);
            }
        }
    }, []);

    useEffect(() => {
        if (selectDate) {
            if (!isSameDay(selectedDate, selectDate)) {
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
                    }
                }, 20);
            }
        }
    }, [selectDate]);

    return <React.Fragment>{renderDays()}</React.Fragment>
}




export { DateView }