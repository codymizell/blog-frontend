import { createBlog, initializeBlogs } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux/es/exports';

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
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            name='title'
            placeholder='title of the blog'
          />
        </div>
        <div>
          author
          <input
            name='author'
            placeholder='author of the blog'
          />
        </div>
        <div>
          url
          <input
            name='url'
            placeholder='url of the blog'
          />
        </div>
        <button id='create-button' type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;