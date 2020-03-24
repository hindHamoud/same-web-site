import React from "react";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import NavbarH from "./components/NavbarH";
import Home from './view';
import Login from './view/login';
import Signup from './view/signup';
import Dashboard from './view/dashboard';
import Add from './view/users/add'

import "./App.css";

function App() {
  return (
    <Router>
      <NavbarH />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/user/add" component={Add} />
      </Switch>
    </Router>
  );
}

export default App;
