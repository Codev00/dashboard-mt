"use client";
import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/media.api";
import userApi from "@/api/modules/user.api";
import UserList from "@/components/UserList";
import { selectIsLogin, setUser } from "@/hook/global.slice";
import { MovieType } from "@/types/media.type";
import { UserType } from "@/types/user.type";
import { Image, Listbox, ListboxItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
   const dispatch = useDispatch();
   const router = useRouter();
   const [movies, setMovies] = useState<MovieType[] | any>(null);
   const [users, setUsers] = useState<UserType[] | any>(null);

   useLayoutEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.listMovie();
         if (res) setMovies(res);
         if (error) console.log(error);
      })();
      (async () => {
         const { res, error } = await userApi.listUser();
         if (res) setUsers(res);
         if (error) console.log(error);
      })();
   }, [dispatch]);

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
                     <span>{users?.length}</span>
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
                     <span>{movies?.length}</span>
                  </div>
               </div>
            </div>
            <div className=" w-[33%] h-24 rounded-3xl flex items-center py-[15px] px-[20px]">
               <div className="flex w-full gap-5"></div>
            </div>
         </div>
         <div className="flex flex-row gap-5">
            <div className="w-[66%] overflow-hidden">
               <UserList users={users} />
            </div>
            <div className="w-[33%] bg-sidebar p-5 flex- flex-col rounded-md">
               <h1>Top views</h1>
               <div className="max-h-[500px] overflow-y-scroll">
                  <Listbox aria-label="Actions">
                     {movies?.map((item: any, index: number) => (
                        <ListboxItem key={index}>
                           <div className="flex gap-3">
                              <Image
                                 src={tmdbConfig.posterPath(item?.poster_path)}
                                 width={75}
                                 radius="none"
                              />
                              <div className="w-[70%] whitespace-nowrap overflow-hidden text-ellipsis">
                                 <h1>{item?.name}</h1>
                              </div>
                           </div>
                        </ListboxItem>
                     ))}
                  </Listbox>
               </div>
            </div>
         </div>
      </main>
   );
}
