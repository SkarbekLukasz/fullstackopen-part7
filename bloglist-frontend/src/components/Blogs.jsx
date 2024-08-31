import { ToggleButton, Typography } from "@mui/material";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const Blogs = ({ blogs, createBlog, newBlogFormRef }) => {
  const styles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: "block",
    borderColor: "black",
  };
  return (
    <div>
      <Typography sx={{ mt: 2 }} variant="h4">
        Blogs
      </Typography>
      <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <br />
      <Typography variant="h5">List of blogs</Typography>
      {blogs.map((blog) => (
        <Link
          variant="body2"
          sx={{ display: "block" }}
          component={RouterLink}
          key={blog.id}
          to={`/blogs/${blog.id}`}
        >
          {blog.title} {blog.author}
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
