import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let weight = 72
let height = 180

function reducer1 (state=weight, action) {
  
  if (action.type === '증가') {
    weight++;
  } else if (action.type === '감소') {
    weight--;
  }
  
  return weight;
}

function reducer2 (state=height, action) {
  
  if (action.type === '키증가') {
    height++;
  } else if (action.type === '키감소') {
    height--;
  }

  return height;
}

let store = createStore(combineReducers({
    reducer1, reducer2
  }));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
