import { useDispatch } from 'react-redux';
import { login, } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import '../App.css';
import { Button, TextField, Typography } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    const user = await dispatch(login(credentials));
    if (!user) {
      clearFields(event.target);
      dispatch(setNotification(`welcome back, ${credentials.username}`));
      return;
    }
    clearFields(event.target);
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
            sx={{ 'label': { color: '#9aa4bf' }, bgcolor: '#414551' }}
          />
        </div>
        <div>
          <TextField
            name='password'
            label='password'
            variant='filled'
            size='small'
            type='password'
            sx={{ 'label': { color: '#9aa4bf' }, bgcolor: '#414551', }}
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