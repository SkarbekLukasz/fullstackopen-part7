import { createSlice } from "@reduxjs/toolkit";
import usersService from "../../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const getAllUsers = () => {
  return async (dispatch) => {
    const usersData = await usersService.getUsers();
    dispatch(setUsers(usersData));
  };
};

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
