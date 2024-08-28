import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
import {
  setNotification,
  removeNotification,
} from "./redux/reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const newBlogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortBlogsByLikes(blogs)));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("localUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const sortBlogsByLikes = (blogsToSort) => {
    return blogsToSort.toSorted((a, b) => b.likes - a.likes);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const createBlog = async (newBlog) => {
    const { title, author, url } = newBlog;
    try {
      const blog = { title, author, url };
      const response = await blogService.saveNewBlog(blog);
      setBlogs(sortBlogsByLikes(blogs.concat(response)));
      dispatch(
        setNotification(
          `Successfully added blog ${response.title} by ${response.author}`
        )
      );
      newBlogFormRef.current.toggleVisibility();
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (exception) {
      dispatch(setNotification("Failed to create blog"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  const updateLikesCount = async (updatedBlog) => {
    try {
      const response = await blogService.updateLikesCount(updatedBlog);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === response.data.id
          ? { ...blog, likes: response.data.likes }
          : blog
      );
      const sortedBlogs = sortBlogsByLikes(updatedBlogs);
      setBlogs(sortedBlogs);
      dispatch(
        setNotification(
          `You liked blog ${updatedBlog.title} by ${updatedBlog.author}`
        )
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (exception) {
      dispatch(setNotification("Failed to update like count"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete.id);
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id);
      setBlogs(sortBlogsByLikes(updatedBlogs));
      dispatch(
        setNotification(
          `Successfully deleted blog ${blogToDelete.title} by ${blogToDelete.author}`
        )
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (exception) {
      dispatch(setNotification("Failed to delete blog"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("localUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("localUser");
    setUser(null);
    dispatch(setNotification("Logged out"));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h1>Blogs list</h1>
      <Notification />
      {user === null ? (
        <Login
          handleLogin={handleLogin}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
        />
      ) : (
        <Blogs
          createBlog={createBlog}
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          newBlogFormRef={newBlogFormRef}
          updateLikesCount={updateLikesCount}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  );
};

export default App;
