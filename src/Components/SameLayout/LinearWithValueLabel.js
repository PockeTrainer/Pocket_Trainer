import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress sx={{"&.MuiLinearProgress-root":{backgroundColor:"rgb(50 50 93 / 11%)"},".MuiLinearProgress-bar":{backgroundColor:"#2dce89"}}} variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{
          props.value}%</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({where}) {
  const [progress, setProgress] = React.useState(0);
  const timer=React.useRef();

//   이건 각 프로그레스바를 채워줄 1초동안 단위변화량이라 볼수있다
  const setting={
    Press_and_3major:10000,
    etc:9000,
    shoulder_and_arm:4000
  }


  React.useEffect(()=>{
    timer.current = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 10));
      }, setting[where]);
      return () => {
        clearInterval(timer);
      };
  },[])
  
  React.useEffect(() => {

    console.log(progress)
    // 게이지 꽉 차면 빼주자
    if(progress>=100){
        clearInterval(timer.current);
    }

    
  }, [progress]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
