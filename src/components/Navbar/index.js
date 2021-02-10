import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import './styles.scss';
import logo from '../../assets/logo.png';
import avatar from '../../assets/user-avatar.png';
import authService from '../../services/authService';
import UserContext from '../../contexts/UserContext';
import { initialUserState } from '../../utils/initialStates';

const Navbar = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isLoggedIn
  );

  const onLogout = () => {
    setIsAuthenticated(false);
    setUser(initialUserState);
    authService.logoutCurrentUser();
    history.push('/login');
  };

  useEffect(() => {
    setIsAuthenticated(authService.isLoggedIn);
  }, [user]);

  return (
    <AppBar position="static" className="appbar flex-row justify-between">
      <Toolbar
        className="toolbar container w-100 mx-auto text-uppercase
                   flex-row justify-between align-center"
      >
        <div className="logo">
          <Link to="/game">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <nav className="toolbar-nav flex-row align-center">
          {isAuthenticated && (
            <NavLink
              to="/game"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              Game
            </NavLink>
          )}
          <NavLink
            to="/rankings"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            Rankings
          </NavLink>
        </nav>

        {isAuthenticated && (
          <div className="profile-controls flex-row align-center">
            <div className="user-avatar flex-col justify-center align-center">
              <img className="user-avatar-img" src={avatar} alt="user-avatar" />
              <span className="user-avatar-name">{user.name}</span>
            </div>
          </div>
        )}

        {isAuthenticated ? (
          <Button
            color="inherit"
            className="nav-link btn-logout"
            onClick={onLogout}
          >
            Logout
          </Button>
        ) : (
          <NavLink
            to="/login"
            className="nav-link"
            activeClassName="nav-link-active"
          >
            Login
          </NavLink>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
