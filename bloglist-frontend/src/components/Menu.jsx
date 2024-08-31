import { Link } from "react-router-dom";

const Menu = () => {
  const styles = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={styles} to={"/"}>
        Blog list
      </Link>
      <Link style={styles} to={"/users"}>
        Users
      </Link>
    </div>
  );
};

export default Menu;
