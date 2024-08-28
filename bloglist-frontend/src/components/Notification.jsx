import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  const styles = {
    border: "solid blue 2px",
    color: "black",
    backgroundColor: "grey",
    padding: "4px",
  };

  if (message === "") return null;
  return (
    <div>
      <h2 style={styles}>{message}</h2>
    </div>
  );
};

export default Notification;
