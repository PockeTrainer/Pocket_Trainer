import React, { Component } from 'react';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:'Login',
      login: 'LoginPage',
      onBoarding: 'BodyInfoPage',
      history: 'HistoryPage',
      myPage: 'CheckPwPage',

    }
  }

  getLoginPage() {
    var _page = null;
    if (this.state.login === 'LoginPage') {
      _page = <LoginPage goIdSearchPage={function(){
          this.setState({login:'IdSearchPage'});
        }.bind(this)} goPwSearchPage={function(){
          this.setState({login:'PwSearchPage'});
        }.bind(this)} goSignUpPage={function(){
          this.setState({login:'SignUpPage'});
        }.bind(this)} goOnBoarding={function(){
          this.setState({mode:'OnBoarding'});
        }.bind(this)} goMain={function(){
          this.setState({mode:'Main'});
        }.bind(this)} goHistory={function(){
          this.setState({mode:'History'});
        }.bind(this)} goMyPage={function(){
          this.setState({mode:'MyPage'});
        }.bind(this)}
      >
      </LoginPage>;
    } else if (this.state.login === 'IdSearchPage') {
      _page = <IdSearchPage goYourIdPage={function(){
          this.setState({login:'YourIdPage'});
        }.bind(this)}
      >
      </IdSearchPage>;   
    } else if (this.state.login === 'YourIdPage') {
      _page = <YourIdPage goLoginPage={function(){
          this.setState({login:'LoginPage'});
        }.bind(this)}
      >
      </YourIdPage>
    } else if (this.state.login === 'PwSearchPage') {
      _page = <PwSearchPage goYourPwPage={function(){
          this.setState({login:'YourPwPage'});
        }.bind(this)}
      >
      </PwSearchPage>;   
    } else if (this.state.login === 'YourPwPage') {
      _page = <YourPwPage goLoginPage={function(){
          this.setState({login:'LoginPage'});
        }.bind(this)}
      >
      </YourPwPage>;  
    } else if (this.state.login === 'SignUpPage') {
      _page = <SignUpPage onChangePage={function(){
          this.setState({page:'SignUpPage'});
        }.bind(this)}
      >
      </SignUpPage>;   
    }

    return _page;
  }

  getOnBoardingPage() {
    var _page = null;
    if (this.state.onBoarding === 'BodyInfoPage') {
      _page = <BodyInfoPage goScanPage={function(){
        this.setState({onBoarding:'ScanPage'});
      }.bind(this)}></BodyInfoPage>;   
    } else if (this.state.onBoarding === 'ScanPage') {
      _page = <ScanPage goResultPage={function(){
        this.setState({onBoarding:'ResultPage'});
      }.bind(this)}></ScanPage>;
    } else if (this.state.onBoarding === 'ResultPage') {
      _page = <ResultPage></ResultPage>;
    }
     
    return _page;
  }

  getHistoryPage() {
    var _page = null;
    _page = <HistoryPage></HistoryPage>;   
    return _page;
  }

  getMyPage() {
    var _page = null;
    if (this.state.myPage === 'CheckPwPage') {
      _page = <CheckPwPage goUpdatePage={function(){
        this.setState({myPage:'UpdatePage'});
      }.bind(this)}></CheckPwPage>;   
    } else if (this.state.myPage === 'UpdatePage') {
      _page = <UpdatePage></UpdatePage>;
    }
    return _page;
  }

  getView() {
    var _view = null;
    if (this.state.mode === 'Login') {
      _view = this.getLoginPage();
    } else if (this.state.mode === 'OnBoarding') {
      _view = this.getOnBoardingPage();
    } else if (this.state.mode === 'History') {
      _view = this.getHistoryPage();
    } else if (this.state.mode === 'MyPage') {
      _view = this.getMyPage();
    }

    return _view;
  }

  render() {
    return (
      <div className="App">
        {this.getView()}
      </div>
    );
  }

}

export default App;