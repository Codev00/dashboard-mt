import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface globalState {
   isLogin: boolean;
   username: string;
}

const initialState: globalState = {
   isLogin: false,
   username: "",
};

export const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setUser: (state, action) => {
         console.log(action.payload);

         if (action.payload === null) {
            localStorage.removeItem("access_token");
         }
         if (action.payload) {
            localStorage.setItem("access_token", action.payload.token);
            localStorage.setItem("username", action.payload?.username);
            state.isLogin = true;
            state.username = action.payload?.username;
         }
      },
      logout: (state) => {
         localStorage.removeItem("access_token");
         state.isLogin = false;
      },
   },
});

export const { setUser, logout } = globalSlice.actions;

// Export Values
export const selectIsLogin = (state: RootState) => state.global.isLogin;
export const selectUser = (state: RootState) => state.global.username;

export default globalSlice.reducer;
