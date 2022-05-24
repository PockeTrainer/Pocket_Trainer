import React,{useState} from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} sx={{height:"1rem",backgroundColor:"rgb(246 246 246 / 30%)",".MuiLinearProgress-bar":{backgroundColor:"#2dce89"}}} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography sx={{color:"white",fontSize:"1.875rem",fontWeight:"600"}} variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
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

export default function LinearWithValueLabel() {
  // const [progress, setProgress] = useState(10);

  const LinearStyle={
    height:"1rem",
    
  }
  const anglePercentage=useSelector(state=>state.update_angle_reducer.angle);//현재프레임의 앵글을 받아옴


  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Box sx={{ width: '100%',transform:"rotate(-90deg)",position:"absolute !important",top:"15rem",left:"9rem"}}>
      <LinearProgressWithLabel value={anglePercentage} />
    </Box>
  );
}
