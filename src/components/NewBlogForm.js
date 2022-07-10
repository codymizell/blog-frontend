/* eslint-disable no-unused-vars */
import { createBlog, initializeBlogs } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux/es/exports';
import { Box, Button, createStyles, Input, Stack, TextField, Typography, } from '@mui/material';

const NewBlogForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    try {
      dispatch(createBlog({ title, author, url, likes: 0 }));
      dispatch(initializeBlogs());
      dispatch(setNotification(`you added a new blog '${title}' by ${author}`, 7));
    } catch (err) {
      dispatch(setNotification(`adding blog failed: ${err.response.data.error}`, 7));
    }

    clearFields(event.target);
  };

  const clearFields = ({ title, author, url }) => {
    title.value = '';
    author.value = '';
    url.value = '';
  };

  return (
    <Stack marginBottom='8px'>
      <Typography variant="h6" component="div">
        create blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack alignItems='flex-start' spacing={0.5} >

          <TextField
            name='title'
            label='title'
            variant='filled'
            size='small'
            sx={{ 'label': { color: 'white' }, bgcolor: '#414551' }}
          />
          <TextField
            name='author'
            label='author'
            variant='filled'
            size='small'
            sx={{ 'label': { color: 'white' }, bgcolor: '#414551' }}
          />
          <TextField
            name='url'
            label='url'
            variant='filled'
            size='small'
            sx={{ 'label': { color: 'white' }, bgcolor: '#414551' }}
          />
          <Button variant="contained" color="primary" id='create-button' type='submit'>
            create
          </Button>
        </Stack>
      </form >
    </Stack >
  );
};

export default NewBlogForm;