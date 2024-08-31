import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  return { value, onChange, type };
};

export default useField;
