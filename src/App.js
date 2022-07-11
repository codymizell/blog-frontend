import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Notification from './components/Notification';
import BlogList, { BlogDetails } from './components/BlogList';
import Users, { User } from './components/Users';
import NavBar from './components/NavBar';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';


const App = () => {
  const user = useSelector(state => state.user);

  if (user === null) {
    return <>
      <Notification />
      <Routes>
        <Route path='/' element={
          <div>
            <LoginForm />
            <Typography sx={{ color: '#9595ad', marginTop: '20px' }}>no account? register here instead</Typography>
            <Button variant="contained" color="primary" id='create-button' component={RouterLink} to='/register'>
              register
            </Button>
          </div>
        } />
        <Route path='/register' element={<SignupForm />} />
      </Routes>

    </>;
  }

  return (
    <div>
      <Container>
        <NavBar user={user} />
        <Notification />

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/" element={<BlogList />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;