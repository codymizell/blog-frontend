import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogList from './components/BlogList';
import { logout } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blogFormRef = useRef();



  if (user === null) {
    return <>
      <Notification />
      <LoginForm />
    </>;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        logged in as <strong>{user.username}</strong>{'  '}
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;