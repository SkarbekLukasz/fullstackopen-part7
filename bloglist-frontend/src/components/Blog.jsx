import useField from "../hooks/useField";
import { addNewComment } from "../redux/reducers/blogsReducer";
import { useDispatch } from "react-redux";
import {
  Typography,
  Link,
  Button,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
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
      <Typography sx={{ mt: 2 }} variant="h4" gutterBottom>
        {blog.title} {blog.author}
      </Typography>
      <div className="blogDetails">
        <Link href={blog.url}>{blog.url}</Link>
        <Typography sx={{ mt: 2 }} variant="body1" gutterBottom>
          likes {blog.likes}
          <Chip
            color="primary"
            variant="outlined"
            label="like"
            onClick={addLikes}
            sx={{ ml: 2 }}
          />
        </Typography>
        <Typography variant="body1" gutterBottom>
          Added by {blog.user.name}
        </Typography>
      </div>
      {isUserCreator && (
        <Button color="secondary" variant="contained" onClick={deleteThis}>
          remove
        </Button>
      )}
      {blog.comments ? (
        <div>
          <Typography sx={{ mt: 4 }} variant="h5">
            Comments
          </Typography>
          <form>
            <TextField {...comment} />
            <Button
              sx={{ ml: 2 }}
              color="primary"
              variant="contained"
              type="submit"
              onClick={newComment}
            >
              add comment
            </Button>
          </form>
          <List sx={{ listStyleType: "disc" }}>
            {blog.comments.map((comment, index) => (
              <ListItem sx={{ display: "list-item", border: 1 }} key={index}>
                <ListItemText>{comment}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
