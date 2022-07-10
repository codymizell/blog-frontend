import { useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';
import './App.css';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import BlogList, { BlogDetails } from './components/BlogList';
import Users, { User } from './components/Users';
import NavBar from './components/NavBar';

import { Container } from '@mui/material';

const App = () => {
  const user = useSelector(state => state.user);
  const userList = useSelector(state => state.userList);

  const userMatch = useMatch('/users/:id');
  const matchedUser = userMatch
    ? userList.find(user => user.id === userMatch.params.id)
    : null;

  if (user === null) {
    return <>
      <Notification />
      <LoginForm />
    </>;
  }

  return (
    <div>
      <Container>
        <NavBar user={user} />
        <Notification />

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User user={matchedUser} />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/" element={<BlogList />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;