import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { removeBlog, initializeBlogs, addLike } from '../reducers/blogsReducer';
import { Link, Navigate } from 'react-router-dom';
import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';

export const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  if (!blog) return (
    <Navigate replace to="/" />
  );

  const own = blog.user && user.username === blog.user.username;
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous';

  const likeBlog = () => {
    dispatch(addLike(blog));
    dispatch(setNotification(`liked blog '${blog.title}'`));
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

  return (
    <div>
      <h1>{blog.title} - {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog()}>like</button>
      </div>
      added by {addedBy + ' '}
      {own && <button onClick={() => deleteBlog(blog.id)}>
        remove
      </button>}
    </div>
  );
};

const Blog = ({ blog }) => {

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  };

  return (
    <div style={style} className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title}, by {blog.author}</Link>
    </div>
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
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>
      <div id='blogs'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  );
};

export default BlogList;