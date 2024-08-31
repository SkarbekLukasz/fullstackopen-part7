import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
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
import Menu from "./components/Menu";
import Users from "./components/Users";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import User from "./components/User";
import Blog from "./components/Blog";
import { getAllUsers } from "./redux/reducers/usersReducer";
import { Box, Button, Container } from "@mui/material";

const App = () => {
  const blogs = useSelector((store) => store.blog);
  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.users);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const newBlogFormRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const match = useMatch("/users/:id");
  const matchBlogId = useMatch("/blogs/:id");
  const userInfo = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const blogInfo = matchBlogId
    ? blogs.find((blog) => blog.id === matchBlogId.params.id)
    : null;

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getAllUsers());
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
      navigate("/");
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
      navigate("/");
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
    <Container>
      <div>
        {user === null ? (
          <div>
            <h1>Blogs list</h1>
            <Notification />
            <Login
              handleLogin={handleLogin}
              handlePasswordChange={handlePasswordChange}
              handleUsernameChange={handleUsernameChange}
            />
          </div>
        ) : (
          <div>
            <Box sx={{ backgroundColor: "peru" }}>
              <Menu />
              {user.name} logged in{" "}
              <Button color="danger" variant="outlined" onClick={handleLogout}>
                logout
              </Button>
            </Box>
            <Notification />
            <Routes>
              <Route
                path={"/"}
                element={
                  <Blogs
                    createBlog={createBlog}
                    blogs={blogs}
                    user={user}
                    handleLogout={handleLogout}
                    newBlogFormRef={newBlogFormRef}
                    updateLikesCount={updateLikesCount}
                    deleteBlog={deleteBlog}
                  />
                }
              />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User userInfo={userInfo} />} />
              <Route
                path="/blogs/:id"
                element={
                  <Blog
                    blog={blogInfo}
                    deleteBlog={deleteBlog}
                    updateLikes={updateLikesCount}
                  />
                }
              />
            </Routes>
          </div>
        )}
      </div>
    </Container>
  );
};

export default App;
