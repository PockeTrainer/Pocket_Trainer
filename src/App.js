import './App.css';
import Dashboard from './Components/Dashboard/DashBoard';
import { useScript1 } from "./hook";
import React, { useEffect,componentDidMount } from 'react';
import { Route,BrowserRouter,Routes } from 'react-router-dom';
import ExerciseCounter from './Components/ExerciseCounter/ExerciseCounter';
import SideNavBar from './Components/SameLayout/SideNavbar';

import $ from "jquery"
import MainContent from './Components/Sign/MainContent';
import WithCamera from './Components/ExerciseCounter/WithCamera/WithCamera';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      after_login:false
    }
  }

  componentDidMount(){
    //An array of assets
    let scripts = [
        { src: "./assets/js/plugins/jquery/dist/jquery.min.js" },
        { src: "./assets/js/plugins/bootstrap/dist/js/bootstrap.bundle.min.js" },
        { src: "./assets/js/plugins/chart.js/dist/Chart.min.js" },
        { src: "./assets/js/plugins/chart.js/dist/Chart.extension.js" },
        { src: "./assets/js/argon-dashboard.js" },
        { src: "./assets/js/modal_popup.js" }
    ]
    // 대시보드 min에서 그냥 js로 수정봄
    //Append the script element on each iteration
    scripts.forEach(item => { 
        const script = document.createElement("script")
        script.src = item.src
        script.async = false
        document.body.appendChild(script)
    })    
  }


  render(){
    return (
      <div className="App">
        
        <BrowserRouter>
        {this.state.after_login?<SideNavBar/>:null}
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/account/:subtitle" element={<MainContent/>}/>
            <Route path="/main/exercise_counter" element={<ExerciseCounter/>} />
            <Route path="/test/*" element={<WithCamera/>}/>
          </Routes>
        </BrowserRouter>
      </div>
      

    );
  }

}
export default App;