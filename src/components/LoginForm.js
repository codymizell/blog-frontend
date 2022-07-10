import { useDispatch } from 'react-redux';
import { login, } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import '../App.css';
import { Button, TextField, Typography } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    try {
      dispatch(login(credentials));
      clearFields(event.target);
      dispatch(setNotification(`welcome back, ${credentials.username}`));
    } catch (err) {
      dispatch(setNotification(`login failed: ${err.response.data.error}`));
    }
  };

  const clearFields = ({ username, password }) => {
    username.value = '';
    password.value = '';
  };

  return (
    <div>
      <Typography variant="h6" component="div">
        login
      </Typography>

      <form onSubmit={handleLogin}>
        <div>
          <TextField
            name='username'
            label='username'
            variant='filled'
            size='small'
            sx={{ 'label': { color: 'white' }, bgcolor: '#414551' }}
          />
        </div>
        <div>
          <TextField
            name='password'
            label='password'
            variant='filled'
            size='small'
            type='password'
            sx={{ 'label': { color: 'white' }, bgcolor: '#414551', }}
          />
        </div>
        <Button variant="contained" color="primary" id='create-button' type='submit'>
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;