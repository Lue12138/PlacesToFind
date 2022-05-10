import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback(uid => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      // The <Switch> component can be wrapped around <Route>s.
      // <Switch> blocks whenever it encounters a fitting <Route>, it will not 
      // evaluate the lines thereafter.
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        {/* exact makes path exactly(only see "/places/new", nothing after) */}
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        {/* "/places/:placeId" should be placed right here, o/w "/new" above would be recognized as a placeId*/}
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        {/* any undefined(unrecognized) path would be redirected to "/" */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    // everything get wrapped into context here have access to authcontext now
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout }}
    >
      {/* Remember to wrap <Router> around every <Route> */}
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;