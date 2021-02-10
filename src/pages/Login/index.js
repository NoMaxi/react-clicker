import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import './styles.scss';
import { validateForm } from '../../utils/validation';
import UserContext from '../../contexts/UserContext';
import authService from '../../services/authService';
import userService from '../../services/userService';

const Login = () => {
  const [formValue, setFormValue] = useState({ name: '' });
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (authService.isLoggedIn) {
      history.push('/game');
    }
  }, []);

  useEffect(() => {
    const validation = validateForm(formValue);
    setErrors(validation.errors);
    setFormValid(validation.isFormValid);
  }, [formValue]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const { name } = formValue;

    if (userService.isNewUser(name)) {
      userService.addNewUser(name);
    }

    const loggedInUser = userService.getUserByName(name);
    authService.currentUser = loggedInUser;
    setUser(loggedInUser);
    history.push('/game');
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="card flex-col align-center mt-3">
        <Typography component="h2" variant="h4" className="card-title">
          Login
        </Typography>
        <form className="w-100 mt-1" noValidate onSubmit={onFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoFocus
            error={!!errors.name}
            helperText={errors.name}
            value={formValue.name}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="btn btn-login"
            disabled={!isFormValid}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
