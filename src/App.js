import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogList, { BlogDetails } from './components/BlogList';
import { logout } from './reducers/userReducer';
import Users, { User } from './components/Users';
import NavBar from './components/NavBar';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userList = useSelector(state => state.userList);
  const blogs = useSelector(state => state.blogs);

  const userMatch = useMatch('/users/:id');
  const matchedUser = userMatch
    ? userList.find(user => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch('/blogs/:id');
  const matchedBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null;

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
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path="/blogs/:id" element={<BlogDetails blog={matchedBlog} />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  );
};

export default App;