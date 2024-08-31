import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableContainer,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
} from "@mui/material";

const Users = () => {
  const users = useBlogs();
  if (!users) return null;

  return (
    <div>
      <Typography component={Paper} variant="h4">
        Users
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.user}</Link>
                </TableCell>
                <TableCell>{user.blogs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
