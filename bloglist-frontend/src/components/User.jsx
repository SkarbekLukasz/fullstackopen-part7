const User = ({ userInfo }) => {
  if (!userInfo) return null;
  return (
    <div>
      <h2>{userInfo.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {userInfo.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
