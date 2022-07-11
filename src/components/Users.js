import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from 'react';
import { initializeUserList } from '../reducers/userListReducer';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Avatar, Button, List, ListItem, ListItemButton, ListItemText, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => {
    return state.userList.find(user => user.id === id);
  });

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch, user]);

  if (!user) return null;

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        padding: '40px 0 20px 0'
      }}>
        <Avatar alt="avatar" src={user.avatar} sx={{ bgcolor: '#4e5463', padding: .5 }} />
        <Typography variant="h3" component="div" color="" >
          {user.username}
        </Typography>
      </div>

      <Typography variant="subtitle1" component="div" color="#b2b2b2" marginTop='10px'>
        blogs
      </Typography>

      <List dense={true}>
        {user.blogs.map(blog =>
          <ListItem disableGutters={true} key={blog.id}>
            <ListItemButton component={RouterLink} to={`/blogs/${blog.id}`} sx={{ minHeight: 0, minWidth: 0, padding: '6px 6px 6px 0' }}>
              <ListItemText
                primary={blog.title}
                primaryTypographyProps={{ fontSize: '14px' }}
              />
            </ListItemButton>
          </ListItem>)
        }
      </List>
    </div>
  );
};

const Users = () => {

  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList);

  useEffect(() => {
    dispatch(initializeUserList());
  }, [dispatch, userList]);

  return (
    <div>

      <Typography variant="h3" component="div" sx={{ margin: '40px 0 40px 0' }}>
        users
      </Typography>
      <TableContainer >
        <Table size="small" sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: 'none'
          }
        }} >
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ color: 'white' }}>user</TableCell>
              <TableCell align="left" sx={{ color: 'white' }}>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map(user => {
              return (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell sx={{ color: 'white' }}>
                    <Button
                      color='inherit'
                      component={RouterLink}
                      to={`/users/${user.id}`}
                      sx={{ textTransform: 'none', margin: 0, padding: '6px 0 6px 0', minHeight: 0, minWidth: 0 }}
                    >
                      {user.username}
                    </Button>

                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>{user.blogs.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div >
  );
};

export default Users;