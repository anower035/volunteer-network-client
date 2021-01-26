import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from './component/Admin/Admin';
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import Header from './component/Header/Header';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import NotFound from './component/NotFound/NotFound';
import Registration from './component/Registration/Registration';
import RegistrationList from './component/RegistrationList/RegistrationList';
import AdminEvent from './component/AdminEvent/AdminEvent';




export const UserContext = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <Router>
          <Header>
          </Header>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <PrivateRoute path="/admin">
              <Admin/>
            </PrivateRoute>
            <PrivateRoute exact path="/addEvent">
              <AdminEvent/>
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/registration/:volunteerItem">
              <Registration/>
            </PrivateRoute>
            <Route path="/registrationList">
              <RegistrationList/>
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
