import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { initializeUserList } from '../reducers/userListReducer';
import { Link } from 'react-router-dom';

export const User = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h1>{`${user.username}'s profile`}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  );
};

const Users = () => {
  const tableData = {
    padding: '15px',
    textAlign: 'center',
  };

  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch, userList]);

  return (
    <div>
      <div>
        <h1>Users</h1>
      </div>
      <table>
        <thead>
          <tr>
            <th style={tableData}>user</th>
            <th style={tableData}>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => {
            return (
              <tr key={user.id}>
                <td style={tableData}>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td style={tableData}>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;


// Users

//        blogs created
// name1       5
// name2       10
// name3       4
// name4       0