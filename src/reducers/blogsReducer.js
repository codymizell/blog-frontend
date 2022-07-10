import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const changedBlog = action.payload;
      return state.map(b => b.id !== id ? b : changedBlog);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter(b => b.id !== id);
    }
  }
});

export const {
  setBlogs,
  appendBlog,
  updateBlog,
  deleteBlog,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    let blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const addLike = (blog) => {
  return async dispatch => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.update(changedBlog);
    dispatch(updateBlog(returnedBlog));
  };
};

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export const addComment = (id, comment) => {
  return async dispatch => {
    const returnedBlog = await blogService.createComment(id, comment);
    dispatch(updateBlog(returnedBlog));
  };
};

export default blogSlice.reducer;