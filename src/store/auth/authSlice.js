import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.token = action.payload?.data?.token;
      state.user = action.payload?.data?.user;
      state.isAuthenticated = true;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    logout: () => initialState,
  },
});
export const { updateUser, logout, setEmail, setPassword } = authSlice.actions;
export default authSlice.reducer;
