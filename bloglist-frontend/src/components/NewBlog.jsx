import { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAuthorChange = (event) => {
    const changedAuthor = event.target.value;
    setAuthor(changedAuthor);
  };

  const handleTitleChange = (event) => {
    const changedTitle = event.target.value;
    setTitle(changedTitle);
  };

  const handleUrlChange = (event) => {
    const changedUrl = event.target.value;
    setUrl(changedUrl);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      author: author,
      title: title,
      url: url,
    });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <Typography variant="h5">Add new</Typography>
      <form onSubmit={addBlog}>
        <TextField
          sx={{ display: "block", mb: 2 }}
          size="small"
          value={title}
          onChange={handleTitleChange}
          label="Title"
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          size="small"
          value={author}
          onChange={handleAuthorChange}
          label="Author"
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          size="small"
          value={url}
          onChange={handleUrlChange}
          label="URL"
        />
        <Button color="primary" variant="contained" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default NewBlog;
