"use client";
import { logout, selectIsLogin, selectUser } from "@/hook/global.slice";
import { useAppSelector } from "@/hook/store";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Sidebar = () => {
   const [select, setSelect] = useState("Dashboard");
   const dispatch = useDispatch();
   const router = useRouter();
   const user = useAppSelector(selectUser);

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
               className={`flex items-center gap-2 w-full text-xl ml-5 hover:bg-violet-500 pl-4 transition-all duration-200  ease-in-out cursor-pointer hover:rounded-tl-xl hover:rounded-bl-xl ${
                  select === "Dashboard" &&
                  "bg-violet-500 rounded-tl-xl rounded-bl-xl font-bold"
               }`}
            >
               <Link
                  href={"/"}
                  className="w-full h-full flex items-center gap-2 leading-[44px]"
                  onClick={() => setSelect("Dashboard")}
               >
                  <i className="fi fi-rr-home text-xl"></i>
                  <span>Dashboard</span>
               </Link>
            </div>
            <div
               className={`flex items-center  gap-2 w-full text-xl ml-5 hover:bg-violet-500 hover:rounded-tl-xl hover:rounded-bl-xl pl-4   transition-all duration-200 leading-[44px] ease-in-out cursor-pointer ${
                  select === "Movie" &&
                  "bg-violet-500 rounded-tl-xl rounded-bl-xl font-bold"
               }`}
            >
               <Link
                  href={"/movie"}
                  className="w-full h-full flex items-center gap-2 leading-[44px]"
                  onClick={() => setSelect("Movie")}
               >
                  <i className="fi fi-rr-clapperboard-play text-xl"></i>
                  <span>Movie</span>
               </Link>
            </div>
            <div
               className={`flex items-center  gap-2 w-full text-xl ml-5 hover:bg-violet-500 hover:rounded-tl-xl hover:rounded-bl-xl pl-4   transition-all duration-200 leading-[44px] ease-in-out cursor-pointer ${
                  select === "Censorship" &&
                  "bg-violet-500 rounded-tl-xl rounded-bl-xl font-bold"
               }`}
            >
               <Link
                  href={"/censorship"}
                  className="w-full h-full flex items-center gap-2 leading-[44px]"
                  onClick={() => setSelect("Censorship")}
               >
                  <i className="fi fi-rr-camera-movie text-xl"></i>
                  <span>Censorship</span>
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
