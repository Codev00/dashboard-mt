"use client";
import mediaApi from "@/api/modules/media.api";
import userApi from "@/api/modules/user.api";
import {
   logout,
   selectIsActive,
   selectIsLogin,
   selectUser,
   setActive,
   setUser,
} from "@/hook/global.slice";
import { useAppSelector } from "@/hook/store";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Sidebar = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const user = useAppSelector(selectUser);
   const isActive = useSelector(selectIsActive);
   const p = usePathname().split("/")[1];

   useLayoutEffect(() => {
      if (p === "") dispatch(setActive("Dashboard"));
      if (p === "movie") dispatch(setActive("Movie"));
      if (p === "censorship") dispatch(setActive("Censorship"));
   }, [p]);
   const handleLogout = () => {
      dispatch(logout());
      router.push("sign-in");
   };
   return (
      <div className="w-60 bg-sidebar text-slate-200">
         <div className="h-32 flex items-center justify-center border-b-2 border-slate-700">
            <span className="text-2xl font-medium ">Manager</span>
         </div>

         <div className="w-full py-10 flex flex-col gap-5">
            <div
               className={`flex items-center gap-2 w-full text-xl ml-5 group pl-4 transition-all duration-200  ease-in-out cursor-pointer  ${
                  isActive === "Dashboard" && " font-semibold"
               }`}
            >
               <Link
                  href={"/"}
                  className="w-full h-full flex items-center gap-2 leading-[44px]"
                  onClick={() => {
                     dispatch(setActive("Dashboard"));
                  }}
               >
                  <i
                     className={`fi fi-rr-home text-xl group-hover:text-danger ${
                        isActive === "Dashboard" && " text-danger"
                     }`}
                  ></i>
                  <span className="group-hover:font-semibold">Dashboard</span>
               </Link>
            </div>
            <div
               className={`flex items-center  gap-2 w-full text-xl ml-5 group pl-4 transition-all duration-200 leading-[44px] ease-in-out cursor-pointer ${
                  isActive === "Movie" && " font-semibold"
               }`}
            >
               <Link
                  href={"/movie"}
                  className="w-full h-full flex items-center gap-2 leading-[44px]"
                  onClick={() => dispatch(setActive("Movie"))}
               >
                  <i
                     className={`fi fi-rr-clapperboard-play text-xl group-hover:text-danger ${
                        isActive === "Movie" && " text-danger"
                     }`}
                  ></i>
                  <span className="group-hover:font-semibold">Movie</span>
               </Link>
            </div>
            <div
               className={`flex items-center  gap-2 w-full text-xl ml-5  pl-4 group transition-all duration-200 leading-[44px] ease-in-out cursor-pointer ${
                  isActive === "Censorship" && " font-semibold"
               }`}
            >
               <Link
                  href={"/censorship"}
                  className="w-full h-full flex items-center gap-2 leading-[44px]"
                  onClick={() => dispatch(setActive("Censorship"))}
               >
                  <i
                     className={`fi fi-rr-camera-movie text-xl group-hover:text-danger ${
                        isActive === "Censorship" && " text-danger"
                     }`}
                  ></i>
                  <span className="group-hover:font-semibold">Censorship</span>
               </Link>
            </div>
         </div>
         <div className="flex justify-center flex-col items-center gap-3">
            <h1 className="text-slate-400">Hi, {user?.toLocaleUpperCase()}</h1>
            <Button
               variant="ghost"
               color="danger"
               radius="full"
               onClick={() => handleLogout()}
            >
               Logout
            </Button>
         </div>
      </div>
   );
};

export default Sidebar;
