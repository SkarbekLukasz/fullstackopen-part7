import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  removeNotification,
} from "./redux/reducers/notificationReducer";
import {
  addVote,
  deleteBlogs,
  getBlogs,
  saveBlog,
} from "./redux/reducers/blogsReducer";
import { loginUser, setUser } from "./redux/reducers/userReducer";

const App = () => {
  const blogs = useSelector((store) => store.blog);
  const user = useSelector((store) => store.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const newBlogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("localUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const createBlog = async (newBlog) => {
    const { title, author, url } = newBlog;
    try {
      const blog = { title, author, url };
      dispatch(saveBlog(blog));
      dispatch(
        setNotification(
          `Successfully added blog ${blog.title} by ${blog.author}`
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
      dispatch(addVote(updatedBlog));
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
      dispatch(deleteBlogs(blogToDelete));
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
      dispatch(loginUser(username, password));
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
    dispatch(setUser(null));
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
