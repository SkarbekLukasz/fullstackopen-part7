import useField from "../hooks/useField";
import { addNewComment } from "../redux/reducers/blogsReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog, deleteBlog, updateLikes }) => {
  const comment = useField("text");
  const dispatch = useDispatch();

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

  const newComment = (event) => {
    event.preventDefault();
    dispatch(addNewComment(blog, comment.value));
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
      {blog.comments ? (
        <div>
          <h3>Comments</h3>
          <form>
            <input {...comment} />
            <button type="submit" onClick={newComment}>
              add comment
            </button>
          </form>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
