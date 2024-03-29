import { createBlog, } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux/es/exports';
import { Button, Stack, TextField, Typography, } from '@mui/material';

const NewBlogForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const content = event.target.content.value;

    const blog = dispatch(createBlog({ title, content, likes: 0 }));
    if (blog) {
      dispatch(setNotification(`you added a new blog '${title}'`, 7));
    }
    clearFields(event.target);
  };

  const clearFields = ({ title, content }) => {
    title.value = '';
    content.value = '';
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
            name='content'
            label='content'
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