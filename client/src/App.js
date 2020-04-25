import React, { useEffect, useState } from 'react';
import Landing from './components/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Reset from './components/Reset';
import Terms from './components/Terms';
import Policy from './components/Policy';
import Dashboard from './components/Dashboard';
import AddProfileImage from './components/AddProfileImage';
import EnterCode from './components/EnterCode';
import AddSocials from './components/AddSocials';
import Bio from './components/Bio';
import EditProfile from './components/EditProfile';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/registerUser';
import PrivateRoute from './components/routing/PrivateRoute';
import PublicProfile from './components/PublicProfile';
import ResetPassword from './components/ResetPassword';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Landing}></Route>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/add_profile_image">
            <AddProfileImage />
          </Route>
          <Route path="/add_socials">
            <AddSocials />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard/:id">
            <Dashboard />
          </Route>
          <Route path="/reset_password">
            <Reset />
          </Route>
          <Route path="/enter_code">
            <EnterCode />
          </Route>
          <Route path="/new_password">
            <ResetPassword />
          </Route>

          <Route path="/terms_and_conditions">
            <Terms />
          </Route>
          <Route path="/privacy_policy">
            <Policy />
          </Route>
          <Route path="/edit_profile">
            <EditProfile />
          </Route>
          <Route path="/bio">
            <Bio />
          </Route>
          <Route path="/dashboard">
            <Login />
          </Route>
          <Route path="/profile/:id">
            <PublicProfile />
          </Route>
          <Route path="/profile">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
