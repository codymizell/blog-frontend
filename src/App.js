import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogList from './components/BlogList';
import { logout } from './reducers/userReducer';
import Users from './components/Users';
import NavBar from './components/NavBar';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);



  if (user === null) {
    return <>
      <Notification />
      <LoginForm />
    </>;
  }

  return (
    <div>
      <NavBar />


      <h2>blogs</h2>
      <Notification />
      <div>
        logged in as <strong>{user.username}</strong>{'  '}
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  );
};

export default App;