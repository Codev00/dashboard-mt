"use client";
import UserList from "@/components/UserList";
import { selectIsLogin, setUser } from "@/hook/global.slice";
import { Listbox, ListboxItem } from "@nextui-org/react";
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

   return (
      <main className="flex text-slate-200 p-5 flex-col gap-5">
         <div className="w-full flex flex-nowrap gap-5">
            <div className="bg-sidebar w-[33%] h-24 rounded-3xl flex items-center py-[15px] px-[20px]">
               <div className="flex w-full gap-5">
                  <div className="flex items-center justify-center">
                     <i className="fi fi-rr-portrait text-[40px] text-slate-300"></i>
                  </div>
                  <div>
                     <h1>User</h1>
                     <span>1000</span>
                  </div>
               </div>
            </div>
            <div className="bg-sidebar w-[33%] h-24 rounded-3xl flex items-center py-[15px] px-[20px]">
               <div className="flex w-full gap-5">
                  <div className="flex items-center justify-center">
                     <i className="fi fi-rr-film text-[40px] text-slate-300"></i>
                  </div>
                  <div>
                     <h1>Movies</h1>
                     <span>1000</span>
                  </div>
               </div>
            </div>
            <div className="bg-sidebar w-[33%] h-24 rounded-3xl flex items-center py-[15px] px-[20px]">
               <div className="flex w-full gap-5">
                  <div className="flex items-center justify-center">
                     <i className="fi fi-rr-film text-[40px] text-slate-300"></i>
                  </div>
                  <div>
                     <h1>Movies</h1>
                     <span>1000</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex flex-row gap-5">
            <div className="w-[66%] overflow-hidden">
               <UserList />
            </div>
            <div className="w-[33%] bg-sidebar p-5 flex- flex-col rounded-md">
               <h1>Top views</h1>
               <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
                  <ListboxItem key="new">New file</ListboxItem>
                  <ListboxItem key="copy">Copy link</ListboxItem>
                  <ListboxItem key="edit">Edit file</ListboxItem>
                  <ListboxItem
                     key="delete"
                     className="text-danger"
                     color="danger"
                  >
                     Delete file
                  </ListboxItem>
               </Listbox>
            </div>
         </div>
      </main>
   );
}
