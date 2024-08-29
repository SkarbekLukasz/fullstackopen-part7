import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blogs";
import loginService from "../../services/login";

const usersSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export default usersSlice.reducer;
