import { TextField, Typography, Button } from "@mui/material";
const Login = ({ handleLogin, handlePasswordChange, handleUsernameChange }) => {
  return (
    <div>
      <Typography sx={{ mb: 2 }} variant="h4">
        Log in to application
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          sx={{ display: "block", mb: 2 }}
          label="username"
          size="small"
          type="text"
          onChange={handleUsernameChange}
        />
        <TextField
          sx={{ display: "block", mb: 2 }}
          size="small"
          label="password"
          type="password"
          onChange={handlePasswordChange}
        />
        <Button sx={{ mb: 2 }} variant="contained" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default Login;
