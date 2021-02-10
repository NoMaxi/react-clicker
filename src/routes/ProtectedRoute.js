import { Route, Redirect } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) => {
      return authService.isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }}
  />
);

export default ProtectedRoute;
