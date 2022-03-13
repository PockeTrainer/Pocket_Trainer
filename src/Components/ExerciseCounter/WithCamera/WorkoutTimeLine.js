import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { fontSize } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

export default function WorkoutTimeline() {

  const useStyles=makeStyles({
    root:{
      width:'4px !important',
      background: '#5e72e4 !important;'
    },
    TimelineConnector:{
      padding: '6px 21px !important'
    },
    TimelineItem:{
      position:'relative',
      right:'1em'
    }
    
  });

  const classes=useStyles();
  return (
    <div>
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          상체
        </TimelineOppositeContent>
        <TimelineSeparator >
          <TimelineConnector className={classes.root}/>
          <TimelineDot sx={{bgcolor:'#ffc107'}}>
            <img src="../assets/img/theme/pushup.png" style={{width:3+"em"}}/>
          </TimelineDot>
          <TimelineConnector className={classes.root}/>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h5" component="span" >
          <span className="badge badge-pill badge-primary">푸시업</span>
          </Typography>
          <Typography>상체<br/>근발달도 측정</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
          className={classes.TimelineConnector}
        >
          복근
        </TimelineOppositeContent>
        <TimelineSeparator >
          <TimelineConnector className={classes.root}/>
          <TimelineDot sx={{bgcolor:'#5e72e4'}}>
            <img src="../assets/img/theme/sit-up.png" style={{width:3+"em"}}/>
          </TimelineDot>
          <TimelineConnector className={classes.root}/>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h5" component="span">
            <span className="badge badge-pill badge-primary">싯업</span>
          </Typography>
          <Typography>복근<br/>근발달도 측정</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          하체
        </TimelineOppositeContent>
        <TimelineSeparator >
          <TimelineConnector className={classes.root} />
          <TimelineDot sx={{bgcolor:'#ffc107'}} >
            <img src="../assets/img/theme/squat.png" style={{width:3+"em"}}/>
          </TimelineDot>
          <TimelineConnector className={classes.root} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h5" component="span">
            <span className="badge badge-pill badge-primary">스쿼트</span>
          </Typography>
          <Typography>하체<br/>근발달도 측정</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem className={classes.TimelineItem}>
        <TimelineSeparator >
          <TimelineConnector className={classes.root}  />
          <TimelineDot sx={{bgcolor:'#5e72e4'}}>
            <AssessmentTwoToneIcon sx={{fontSize:"3.1875rem"}}/>
          </TimelineDot>
          <TimelineConnector className={classes.root}/>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h5" component="span">
            <span className="badge badge-pill badge-primary">결과분석</span>
          </Typography>
          <Typography>추천운동</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
    <Link to="/test/howto/pushup">
      <button type="button" className="btn btn-primary btn-lg btn-block"><i className="ni ni-button-play"></i>상체평가방법</button>
    </Link>
    </div>
  );
}
