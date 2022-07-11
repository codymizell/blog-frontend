import { useDispatch } from 'react-redux';
import { register, } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRandomAvatar } from '../resources/avatarHelper';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (event.target.password.value !== event.target.passwordConfirm.value) {
      dispatch(setNotification('passwords do not match'));
      return;
    }

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
      avatar: getRandomAvatar(),
    };

    if (!credentials.username) return;
    const user = await dispatch(register(credentials));
    if (!user) {
      dispatch(setNotification(`hello ${credentials.username} :)`));
      navigate('/');
      return;
    }
    clearFields(event.target);
  };

  const clearFields = ({ username, password, passwordConfirm }) => {
    username.value = '';
    password.value = '';
    passwordConfirm.value = '';
  };

  return (
    <div>
      <Typography variant="h6" component="div">
        create an account
      </Typography>

      <form onSubmit={handleSignup}>
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
        <div>
          <TextField
            name='passwordConfirm'
            label='confirm password'
            variant='filled'
            size='small'
            type='password'
            sx={{ 'label': { color: '#9aa4bf' }, bgcolor: '#414551', }}
          />
        </div>
        <Button variant="contained" color="primary" id='create-button' type='submit'>
          create
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;