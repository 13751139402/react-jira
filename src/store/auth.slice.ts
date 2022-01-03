import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search-pannel";
import * as auth from "auth-provider";
import { AuthForm } from "context/auth-context";
import { AppDispatch } from "store";
interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      // payload是载荷，改动的意思
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const login = (form: AuthForm) => () => (dispatch: AppDispatch) => auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: AuthForm) => () => (dispatch: AppDispatch) => auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)));
