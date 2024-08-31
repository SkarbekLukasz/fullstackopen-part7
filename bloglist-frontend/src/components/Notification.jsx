import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (message === "") return null;
  return (
    <div>
      <Alert sx={{ mt: 2 }} severity="success">
        {message}
      </Alert>
    </div>
  );
};

export default Notification;
