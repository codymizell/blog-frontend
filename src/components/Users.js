import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { initializeUserList } from '../reducers/userListReducer';



const tableData = {
  padding: '15px',
  textAlign: 'center',
};

const Users = () => {
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
        <tr>
          <th style={tableData}>user</th>
          <th style={tableData}>blogs created</th>
        </tr>

        {userList.map(user => {
          return (
            <tr key={user.id}>
              <td style={tableData}>{user.username}</td>
              <td style={tableData}>{user.blogs.length}</td>
            </tr>
          );
        })}
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