import './App.scss';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import UserContext from './contexts/UserContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Game from './pages/Game';
import Rankings from './pages/Rankings';
import authService from './services/authService';

const App = () => {
  const [user, setUser] = useState(authService.currentUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/rankings" component={Rankings} />
          <ProtectedRoute path="/game">
            <Game />
          </ProtectedRoute>
          <Route exact path="*">
            <Redirect to="/game" />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
