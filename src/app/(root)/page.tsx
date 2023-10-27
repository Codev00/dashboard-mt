"use client";
import { selectIsLogin, setUser } from "@/hook/global.slice";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
   const dispatch = useDispatch();
   const router = useRouter();

   useLayoutEffect(() => {
      const user = {
         token: localStorage.getItem("access_token"),
         username: localStorage.getItem("username"),
      };
      if (user.token) {
         dispatch(setUser(user));
      } else {
         router.push("/sign-in");
      }
   }, []);

   return <main className="flex text-white">Main</main>;
}
