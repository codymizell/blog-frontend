import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { removeBlog, initializeBlogs, addLike } from '../reducers/blogsReducer';

const BlogDetails = ({ blog, visible }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  if (!visible) return null;

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
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={() => likeBlog()}>like</button>
      </div>
      {addedBy}
      {own && <button onClick={() => deleteBlog(blog.id)}>
        remove
      </button>}
    </div>
  );
};

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
  };

  return (
    <div style={style} className='blog'>
      {blog.title}, by {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <BlogDetails
        blog={blog}
        visible={visible}
      />
    </div>
  );
};

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch, blogs]);

  return (
    <div id='blogs'>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default BlogList;