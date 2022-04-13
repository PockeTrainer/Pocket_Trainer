import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  MonthView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from '@devexpress/dx-react-scheduler';

import { appointments,resourcesData } from '../../demo-data/appointments';

const TooltipLayout = props => {
  return (
    <AppointmentTooltip.Layout
      {...props}
      useLayerForClickAway={false}
      style={{ pointerEvents: "none" }}
    />
  );
};

export default function Demo(){
    const today=new Date();

    const today_year=today.getFullYear();
    const today_month=today.getMonth()+1;
    const today_date=today.getDate();

    const today_data=today_year+"-"+today_month+"-"+today_date;

  const [tooltipVisible, setTooltipVisibility] = React.useState(false);
  const [appointmentMeta, setAppointmentMeta] = React.useState({
    target: null,
    data: {}
  });
  const Appointment = React.useCallback(
    ({ onClick, data, ...restProps }) => {
      return (
        <Appointments.Appointment
          data={data}
          onClick={onClick}
          {...restProps}
          onMouseEnter={({ target }) => {
            setTooltipVisibility(true);
            setAppointmentMeta({ target, data });
          }}
          onMouseLeave={() => {
            setTooltipVisibility(false);
            setAppointmentMeta({ target: null, data: {} });
          }}
        />
      );
    },
    [setTooltipVisibility, setAppointmentMeta]
  );

  return (
    <Paper>
      <Scheduler data={appointments} height={660}>
      <ViewState
            defaultCurrentDate={today_data}
            currentViewName="Month"
          />
        <WeekView startDayHour={9} endDayHour={19} />
        <MonthView
            displayName='월별'
        />

        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip
          visible={tooltipVisible}
          onVisibilityChange={setTooltipVisibility}
          appointmentMeta={appointmentMeta}
          onAppointmentMetaChange={setAppointmentMeta}
          layoutComponent={TooltipLayout}
        />
      </Scheduler>
    </Paper>
  );
};
