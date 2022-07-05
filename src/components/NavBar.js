import { Link } from 'react-router-dom';

const NavBar = () => {

  const padding = {
    padding: 5
  };

  return (
    <>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/users">users</Link>
    </>
  );
};

export default NavBar;