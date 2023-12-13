import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { deleteCookie, setCookie } from "cookies-next";

interface globalState {
   isLogin: boolean;
   admin: string;
   isActive: string;
}

const initialState: globalState = {
   isLogin: false,
   admin: "",
   isActive: "Dashboard",
};

export const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setUser: (state, action) => {
         if (action.payload.token === null) {
            deleteCookie("access_token");
         }
         if (action.payload.token) {
            setCookie("access_token", action.payload.token, {
               maxAge: 60 * 60 * 24,
               sameSite: true,
            });
            state.isLogin = true;
         }
         state.admin = action.payload.username;
      },
      logout: (state) => {
         deleteCookie("access_token");
         state.isLogin = false;
         state.admin = "";
      },
      setActive: (state, action: PayloadAction<string>) => {
         state.isActive = action.payload;
      },
   },
});

export const { setUser, logout, setActive } = globalSlice.actions;

// Export Values
export const selectIsLogin = (state: RootState) => state.global.isLogin;
export const selectUser = (state: RootState) => state.global.admin;
export const selectIsActive = (state: RootState) => state.global.isActive;

export default globalSlice.reducer;
