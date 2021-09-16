import React, { Component } from 'react';
import LoginPage from './components_pt/Login/LoginPage';
import IdSearchPage from './components_pt/Login/IdSearchPage';
import YourIdPage from './components_pt/Login/YourIdPage';
import PwSearchPage from './components_pt/Login/PwSearchPage';
import YourPwPage from './components_pt/Login/YourPwPage';
import SignUpPage from './components_pt/Login/SignUpPage';

import BodyInfoPage from './components_pt/OnBoarding/BodyInfoPage';
import ResultPage from './components_pt/OnBoarding/ResultPage';
import ScanPage from './components_pt/OnBoarding/ScanPage';

import HistoryPage from './components_pt/History/HistoryPage';

import CheckPwPage from './components_pt/Mypage/CheckPwPage';
import UpdatePage from './components_pt/Mypage/UpdatePage';
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
// import React, { Component } from 'react';
// import TOC from './components/TOC';
// import Control from './components/Control';
// import ReadContent from './components/ReadContent';
// import CreateContent from './components/CreateContent';
// import UpdateContent from './components/UpdateContent';
// import Subject from './components/Subject';
// import './App.css';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.max_content_id = 3;
//     this.state = {
//       mode:'welcome',
//       selected_content_id:1,
//       subject:{title:'WEB', sub:'world wide web!!'},
//       welcome:{title:'welcome', desc:'Hello, React!!'},
//       contents:[
//         {id:1, title:'HTML', desc:'HTML is for imformation'},
//         {id:2, title:'CSS', desc:'CSS is for design'},
//         {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
//       ]
//     }
//   }

//   getReadContent() {
//     var i = 0;
//     while(i < this.state.contents.length) {
//       var data = this.state.contents[i];
//       if(data.id === this.state.selected_content_id) {
//         return data;
//         break;
//       }
//       i+=1;
//     }
//   }

//   getContent() {
//     var _title, _desc, _article = null;
//     if (this.state.mode === 'welcome') {
//       _title = this.state.welcome.title;
//       _desc = this.state.welcome.desc;
//       _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
//     } else if (this.state.mode === 'read') {
//       var _content = this.getReadContent();
//       _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
//     } else if (this.state.mode === 'create') {
//       _article = <CreateContent onSubmit={function(_title, _desc){
//         this.max_content_id += 1;
//         var _contents = this.state.contents.concat(
//           {id:this.max_content_id, title:_title, desc:_desc}
//         );
//         this.setState({
//           contents:_contents,
//           mode:'read',
//           selected_content_id: this.max_content_id
//         });
//       }.bind(this)}></CreateContent>;
//     } else if (this.state.mode === 'update') {
//       var _content = this.getReadContent();
//       _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
//         var _contents = Array.from(this.state.contents);
//         var i = 0;
//         while (i < _contents.length) {
//           if (_contents[i].id === _id) {
//             _contents[i] = {id:_id, title:_title, desc:_desc};
//             break;
//           }
//           i += 1
//         }
//         this.setState({
//           contents:_contents,
//           mode: 'read'
//         });
//       }.bind(this)}></UpdateContent>;
//     }
//     return _article;
//   }
//   render() {
//     return (
//       <div className="App">
//         <Subject 
//           title={this.state.subject.title} 
//           sub={this.state.subject.sub}
//           onChangePage={function(){
//             this.setState({mode: 'welcome'});
//           }.bind(this)}
//         >
//         </Subject>
//         <Control onChangeMode={function(_mode){
//           if (_mode === 'delete') {
//             if (window.confirm('really?')) {
//               var _contents = Array.from(this.state.contents);
//               var i = 0;
//               while (i < _contents.length) {
//                 if (_contents[i].id === this.state.selected_content_id) {
//                   _contents.splice(i, 1);
//                   break;
//                 }
//                 i += 1
//               }
//               this.setState({
//                 mode:'welcome',
//                 contents:_contents
//               })
//             }
//           } else {
//             this.setState({
//               mode:_mode
//             })
//           }
//         }.bind(this)}></Control>
//         <TOC
//           onChangePage={function(id){
//             this.setState({
//               mode:'read',
//               selected_content_id:Number(id)
//             });
//           }.bind(this)}
//           data={this.state.contents}
//         ></TOC>
//         {this.getContent()}
//       </div>
//     );
//   }

// }

// export default App;

{/*
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/2');
      const posts = await res.json();
      this.setState({
        posts
      });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
          <div key={this.state.posts.id}>
            <h1>{this.state.posts.title}</h1>
            <span>{this.state.posts.content}</span>
          </div>
        {/*
        {this.state.posts.map(item => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <span>{item.content}</span>
          </div>
        ))}
        ---------------------------------
      </div>
    );
  }
}

export default App;
*/}

