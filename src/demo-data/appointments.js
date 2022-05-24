import {red,lightGreen,amber} from "@mui/material/colors";

export const appointments = [
    {
      title: '클리어',
      startDate: new Date(2022, 3, 1, 9, 35),//실제로는 4월을 의미함
      endDate: new Date(2022, 3, 1, 11, 30),
      id: 1,
      location: '어깨+삼두+복근',
      roomId:1
    }, {
      title: '20.9',
      startDate: new Date(2022, 3,1,0,0),
      endDate: new Date(2022, 3, 2,0,0),
      id: 2,
      location: 'bmi지수',
      roomId:3
    },
    {
      title: '19.5',
      startDate: new Date(2022, 3,2,0,0),
      endDate: new Date(2022, 3, 3,0,0),
      id: 3,
      location: 'bmi지수',
      roomId:3
    },{
      title: '실패',
      startDate: new Date(2022, 3,2, 9, 35),
      endDate: new Date(2022, 3, 2,11, 30),
      id: 4,
      location: '가슴+이두',
      roomId:2
    }
  ];

  export const resourcesData = [
    {
      text: '3부위 클리어',
      id: 1,
      color: lightGreen,
    }, {
      text: '2부위 클리어',
      id: 2,
      color: red,
    }, {
      text: '1부위 클리어',
      id: 3,
      color: red,
    }, {
      text: "올Fail",
      id: 4,
      color: red,
    }, {
      text: 'bmi지수',
      id: 5,
      color: amber,
    },
    {
      text: '클리어',
      id: 6,
      color: lightGreen,
    }, {
      text: '실패',
      id: 7,
      color: red,
    }

  ];
  