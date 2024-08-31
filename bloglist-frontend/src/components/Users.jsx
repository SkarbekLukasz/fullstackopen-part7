import { useBlogs } from "../hooks/useBlogs";

const Users = () => {
  const users = useBlogs();

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
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.user}</td>
              <td>{user.blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
