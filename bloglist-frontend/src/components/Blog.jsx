const Blog = ({ blog, deleteBlog, updateLikes }) => {
  const addLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateLikes(updatedBlog);
  };

  const isUserCreator = () => {
    const user = JSON.parse(window.localStorage.getItem("localUser"));
    console.log(user);
    return user.name === blog.user.name ? true : false;
  };

  const deleteThis = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog);
    }
  };

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div className="blogDetails">
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes} <button onClick={addLikes}>like</button>
        </p>
        <p>Added by {blog.user.name}</p>
      </div>
      {isUserCreator && <button onClick={deleteThis}>remove</button>}
    </div>
  );
};

export default Blog;
