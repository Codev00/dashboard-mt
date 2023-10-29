import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface globalState {
   isLogin: boolean;
   admin: string;
}

const initialState: globalState = {
   isLogin: false,
   admin: "",
};

export const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setUser: (state, action) => {
         if (action.payload.token === null) {
            localStorage.removeItem("access_token");
         }
         if (action.payload.token) {
            localStorage.setItem("access_token", action.payload.token);
            state.isLogin = true;
         }
         state.admin = action.payload.username;
      },
      logout: (state) => {
         localStorage.removeItem("access_token");
         state.isLogin = false;
         state.admin = "";
      },
   },
});

export const { setUser, logout } = globalSlice.actions;

// Export Values
export const selectIsLogin = (state: RootState) => state.global.isLogin;
export const selectUser = (state: RootState) => state.global.admin;

export default globalSlice.reducer;
