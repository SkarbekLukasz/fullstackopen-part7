import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";

const blogsSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload;
      return blogService.sortBlogsByLikes(blogs);
    },
    addBlog(state, action) {
      const blogs = blogService.sortBlogsByLikes(state.concat(action.payload));
      return blogs;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const updatedBlogs = state.map((blog) =>
        blog.id === updatedBlog.id
          ? { ...blog, likes: updatedBlog.likes }
          : blog
      );
      return blogService.sortBlogsByLikes(updatedBlogs);
    },
    removeBlog(state, action) {
      const blogToDelete = action.payload;
      const updatedBlogs = state.filter((blog) => blog.id !== blogToDelete.id);
      return blogService.sortBlogsByLikes(updatedBlogs);
    },
    updateComments(state, action) {
      const updatedBlog = action.payload;
      const updatedBlogs = state.map((blog) =>
        blog.id === updatedBlog.id
          ? { ...blog, comments: updatedBlog.comments }
          : blog
      );
      return blogService.sortBlogsByLikes(updatedBlogs);
    },
  },
});

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const saveBlog = (blog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.saveNewBlog(blog);
    dispatch(addBlog(savedBlog));
  };
};

export const addVote = (blog) => {
  return async (dispatch) => {
    const response = await blogService.updateLikesCount(blog);
    dispatch(updateBlog(response.data));
  };
};

export const deleteBlogs = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);
    dispatch(removeBlog(blog));
  };
};

export const addNewComment = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    };
    const response = await blogService.addComment(updatedBlog);
    dispatch(updateComments(response.data));
  };
};

export const { setBlogs, addBlog, updateBlog, removeBlog, updateComments } =
  blogsSlice.actions;

export default blogsSlice.reducer;
