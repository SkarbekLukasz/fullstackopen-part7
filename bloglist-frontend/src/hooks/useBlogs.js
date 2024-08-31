import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useBlogs = () => {
  const [users, setUsers] = useState([]);
  const blogs = useSelector((state) => state.blog);

  useEffect(() => {
    const blogsArray = {};

    blogs.forEach((blog) => {
      if (blogsArray[blog.user.name]) {
        blogsArray[blog.user.name]++;
      } else {
        blogsArray[blog.user.name] = 1;
      }
    });

    const blogsToSet = Object.keys(blogsArray).map((user) => ({
      user: user,
      blogs: blogsArray[user],
    }));

    setUsers(blogsToSet);
  }, [blogs]);

  return users;
};
