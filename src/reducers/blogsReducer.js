import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const sortBlogs = (blogs) => {
  const newBlogs = [...blogs];
  return newBlogs.sort((b1, b2) => {
    if (b2.likes > b1.likes) {
      return 1;
    } else if (b1.likes > b2.likes) {
      return -1;
    }
    return 0;
  });
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return sortBlogs(action.payload);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const changedBlog = action.payload;
      return sortBlogs(state.map(b => b.id !== id ? b : changedBlog));
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

export default blogSlice.reducer;