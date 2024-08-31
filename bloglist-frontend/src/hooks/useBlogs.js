import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useBlogs = () => {
  const users = useSelector((state) => state.users);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        const userObjects = users.map((user) => ({
          user: user.name,
          blogs: user.blogs.length,
          id: user.id,
        }));
        setUserData(userObjects);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAndSetUsers();
  }, [users]);

  return userData;
};
