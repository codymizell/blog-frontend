import { useDispatch } from 'react-redux';
import { login, } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

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
      <h2>Log in to application</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            name='username'
            id='username'
          />
        </div>
        <div>
          password
          <input
            type="password"
            name='password'
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;