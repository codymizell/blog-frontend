import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { removeBlog, initializeBlogs, addLike, addComment } from '../reducers/blogsReducer';
import { Link, Navigate, useParams } from 'react-router-dom';
import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';

export const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blog = useSelector(state => {
    return state.blogs.find(blog => blog.id === id);
  });
  const [likes, setLikes] = useState(blog ? blog.likes : undefined);

  if (!blog) return (
    <Navigate replace to="/" />
  );

  const own = blog.user && user.username === blog.user.username;
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous';

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
      <h1>{blog.title} - {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {likes} likes <button onClick={() => likeBlog()}>like</button>
      </div>
      added by {addedBy + ' '}
      {own && <button onClick={() => deleteBlog(blog.id)}>
        remove
      </button>}

      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input name="comment" placeholder="add a comment" />
        <button type="submit">add comment</button>
      </form>

      <ul>
        {blog.comments.map(comment => <li key={generateKey()}>{comment}</li>)}
      </ul>
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