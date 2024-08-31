import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";

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
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={newBlogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <br />
      <h3>List of blogs</h3>
      {blogs.map((blog) => (
        <Link style={styles} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
