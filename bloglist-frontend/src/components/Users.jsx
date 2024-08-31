import { useDispatch } from "react-redux";
import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
import { getAllUsers } from "../redux/reducers/usersReducer";
import { useEffect } from "react";

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const users = useBlogs();
  if (!users) return null;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.user}</Link>
              </td>
              <td>{user.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
