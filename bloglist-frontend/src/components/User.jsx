import { Container, List, ListItem, Typography } from "@mui/material";

const User = ({ userInfo }) => {
  if (!userInfo) return null;
  return (
    <div>
      <Typography sx={{ mt: 2 }} variant="h4">
        {userInfo.name}
      </Typography>
      <Typography variant="h6">added blogs</Typography>
      <List sx={{ listStyleType: "disc" }}>
        {userInfo.blogs.map((blog) => (
          <ListItem sx={{ display: "list-item" }} key={blog.id}>
            {blog.title}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
