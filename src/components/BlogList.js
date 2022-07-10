import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { removeBlog, initializeBlogs, addLike, addComment } from '../reducers/blogsReducer';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';
import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';

import { List, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemButton, Typography, Link, IconButton, TextField, Button, } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';


export const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blog = useSelector(state => {
    return state.blogs.find(blog => blog.id === id);
  });
  const [likes, setLikes] = useState(blog ? blog.likes : undefined);


  if (!blog) {
    console.log('error');
    return (
      <Navigate replace to="/" />
    );
  }
  const own = blog.user && user.username === blog.user.username;

  const likeBlog = () => {
    dispatch(addLike(blog));
    dispatch(setNotification(`liked blog '${blog.title}'`));
    setLikes(blog.likes + 1);
  };

  const deleteBlog = () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`);
    if (!ok) return;

    try {
      dispatch(removeBlog(blog.id));
      dispatch(setNotification(`blog '${blog.title}' removed`));
    } catch (err) {
      dispatch(setNotification(`there was an error removing this blog: ${err.response.data.err}`));
    }
  };

  const handleComment = (event) => {
    event.preventDefault();

    const comment = {
      comment: event.target.comment.value,
    };

    dispatch(addComment(blog.id, comment));

    event.target.comment.value = '';
  };

  const generateKey = () => {
    return Math.floor(Math.random() * 100000);
  };

  return (
    <div>

      <Typography variant="h4" component='div' color='' marginTop='40px' >
        {blog.title}
      </Typography>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '10px'
      }}>
        <Typography variant="caption" component="div" color="#b2b2b2">
          by {blog.author}
        </Typography>
        {
          own && <IconButton aria-label="delete" size="small" color='error' onClick={() => deleteBlog()}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        }
      </div>

      <Link href={blog.url}>{blog.url}</Link>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '10px'
      }}>
        <Typography variant="caption" component="div" color="white">
          {likes}
        </Typography>
        <IconButton aria-label="delete" size="small" onClick={() => likeBlog()}>
          <ThumbUpIcon sx={{ color: 'white' }} fontSize="inherit" />
        </IconButton>
      </div>

      <Typography variant="h6" component='div' color='#c9c9c9' marginTop='40px' >
        comments
      </Typography>

      <form onSubmit={handleComment} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <TextField
          name='comment'
          label='comment'
          size='small'
          sx={{ 'label': { color: 'gray' }, marginBottom: '10px' }}
        />

        <Button type="submit" color='primary' variant='contained' size='small'>comment</Button>
      </form>

      <List dense={true}>
        {blog.comments.map(comment => {
          return (
            <ListItem key={generateKey()}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={comment} />
            </ListItem >
          );
        })}
      </List>
    </div >
  );
};

const Blog = ({ blog }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <ArticleIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemButton component={RouterLink} to={`/blogs/${blog.id}`}>
        <ListItemText primary={blog.title} secondary={blog.author} secondaryTypographyProps={{ color: '#ababab' }} />
      </ListItemButton>
    </ListItem >
  );
};

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const blogFormRef = useRef();


  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch, blogs]);

  return (
    <div>

      <Typography variant="h3" component="div" color="" sx={{ margin: '40px 0 40px 0' }}>
        blogs
      </Typography>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <List id='blogs' dense={true}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </List>
    </div>
  );
};

export default BlogList;

