import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import LoginPage from './components/Login/LoginPage';
import IdSearchPage from './components/Login/IdSearchPage';
import YourIdPage from './components/Login/YourIdPage';
import PwSearchPage from './components/Login/PwSearchPage';
import YourPwPage from './components/Login/YourPwPage';
import SignUpPage from './components/Login/SignUpPage';

import BodyInfoPage from './components/OnBoarding/BodyInfoPage';
import ResultPage from './components/OnBoarding/ResultPage';
import ScanPage from './components/OnBoarding/ScanPage';

import HistoryPage from './components/History/HistoryPage';

import CheckPwPage from './components/MyPage/CheckPwPage';
import UpdatePage from './components/MyPage/UpdatePage';
import './App.css';

function App () {
  // state = {
  //   id: 2017
  // }
  return (
    <div className="App">
      <Switch>
        {/* Login Page */}
        {/* <Route exact path="/">
          <LoginPage change={ (new_id) => this.setState({id:new_id}) }/>
        </Route> */}
        <Route exact path="/">
          <LoginPage />
        </Route>

        <Route path="/Login/IdSearchPage" component={IdSearchPage}></Route>
        <Route path="/Login/YourIdPage" component={YourIdPage}></Route>
        <Route path="/Login/PwSearchPage" component={PwSearchPage}></Route>
        <Route path="/Login/YourPwPage" component={YourPwPage}></Route>
        <Route path="/Login/SignUpPage" component={SignUpPage}></Route>

        {/* OnBoarding Page */}
        <Route path="/OnBoarding/BodyInfoPage" component={BodyInfoPage}></Route>
        <Route path="/OnBoarding/ScanPage" component={ScanPage}></Route>
        <Route path="/OnBoarding/ResultPage" component={ResultPage}></Route>

        {/* History Page */}
        <Route path="/History/HistoryPage" component={HistoryPage}></Route>
        
        {/* My Page */}
        <Route path="/MyPage/CheckPwPage" component={CheckPwPage}></Route>
        <Route path="/MyPage/UpdatePage" component={UpdatePage}></Route>

      </Switch>
    </div>
  );

}

export default App;