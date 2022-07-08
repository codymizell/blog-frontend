import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';


const NavBar = ({ user }) => {
  const dispatch = useDispatch();


  const NavBarStyle = {
    padding: 5,
    backgroundColor: 'lightgrey',
  };

  const NavItemStyle = {
    padding: 5,
  };

  return (
    <div style={NavBarStyle}>
      <Link style={NavItemStyle} to="/">blogs</Link>
      <Link style={NavItemStyle} to="/users">users</Link>
      <strong>{user.username}</strong>{' logged in  '}
      <button onClick={() => dispatch(logout())}>logout</button>

    </div>
  );
};

export default NavBar;