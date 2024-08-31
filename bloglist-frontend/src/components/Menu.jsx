import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";

const Menu = () => {
  return (
    <div>
      <AppBar color="info" position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={RouterLink} to={"/"}>
            Blog list
          </Button>
          <Button color="inherit" component={RouterLink} to={"/users"}>
            Users
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
