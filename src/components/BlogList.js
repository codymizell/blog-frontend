import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { removeBlog, initializeBlogs, addLike, addComment } from '../reducers/blogsReducer';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';
import {
  List, ListItem, ListItemAvatar, ListItemText, Avatar,
  ListItemButton, Typography, IconButton, TextField,
  Button,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';

const TextButtonContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: '10px'
}));

export const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector(state => {
    return state.blogs.find(blog => blog.id === id);
  });

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const user = useSelector(state => state.user);
  const [likes, setLikes] = useState(blog ? blog.likes : undefined);

  if (!blog) return null;

  const own = blog.user && user.username === blog.user.username;

  const likeBlog = () => {
    dispatch(addLike(blog));
    dispatch(setNotification(`liked blog '${blog.title}'`));
    setLikes(blog.likes + 1);
  };

  const deleteBlog = () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.user.username}?`);
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

      <TextButtonContainer>
        <Typography variant="caption" component="div" color="#b2b2b2">
          by {blog.user.username}
        </Typography>
        {
          own && <IconButton aria-label="delete" size="small" color='error' onClick={() => deleteBlog()}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        }
      </TextButtonContainer>


      <Typography variant="subtitle1" component='div' color=''  >
        {blog.content}
      </Typography>

      <TextButtonContainer sx={{ marginTop: '12px' }}>
        <Typography variant="caption" component="div" color="white">
          {likes}
        </Typography>
        <IconButton aria-label="delete" size="small" onClick={() => likeBlog()}>
          <ThumbUpIcon sx={{ color: 'white' }} fontSize="inherit" />
        </IconButton>
      </TextButtonContainer>

      <Typography variant="h6" component='div' color='#c9c9c9' marginTop='20px' >
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
            <ListItem key={generateKey()} style={{ display: 'flex', alignItems: 'center' }}>
              <ListItemAvatar style={{ alignSelf: 'flex-start' }}>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={comment} primaryTypographyProps={{ style: { whiteSpace: 'normal', wordWrap: 'break-word' } }} />
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
      <ListItemButton component={RouterLink} to={`/blogs/${blog.id}`}>
        <ListItemAvatar>
          <Avatar>
            <ArticleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={blog.title} secondary={blog.user.username} secondaryTypographyProps={{ color: '#ababab' }} />
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
  }, []);

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

