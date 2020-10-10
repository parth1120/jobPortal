import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from "./Router/privateRouter";
import { ToastProvider } from 'react-toast-notifications'
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Login from './containers/Auth/Login/Login'
import Signup from './containers/Auth/Signup/Signup'
import ForgotPassword from './containers/Auth/ForgotPassword/ForgotPassword'

import Jobs from './containers/Jobs/Jobs'
import PostJob from './containers/PostJob/PostJob'
import AppliedJob from './containers/AppliedJob/AppliedJob'
import ResetPassword from './containers/Auth/ResetPassword/ResetPassword'

import './App.css';

function App() {
  return (
    <div>
      <ToastProvider autoDismiss autoDismissTimeout={4000}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/home' exact component={Home} />
            <Route path='/Login' exact component={Login} />
            <Route path='/Signup' exact component={Signup} />
            <Route path='/ForgotPassword' exact component={ForgotPassword} />
            <PrivateRoute path='/Jobs' exact component={Jobs} />
            <PrivateRoute path='/PostJob' exact component={PostJob} />
            <PrivateRoute path='/AppliedJob' exact component={AppliedJob} />
            <PrivateRoute path='/ResetPassword' exact component={ResetPassword} />
            <Route path='*' exact={true} component={Home} />
          </Switch>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}


export default App;
