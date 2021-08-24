import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login.js';
import MyForms from './MyForms.js'
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
//import reportWebVitals from './reportWebVitals';

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/myforms" component={MyForms} />
    </Switch>
  </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
