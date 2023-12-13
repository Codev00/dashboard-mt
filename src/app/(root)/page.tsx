"use client";
import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/media.api";
import userApi from "@/api/modules/user.api";
import UserList from "@/components/UserList";
import { selectIsLogin, selectUser, setUser } from "@/hook/global.slice";
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

   return (
      <main className="flex text-slate-200 pl-5 pt-5 flex-col gap-5">
         <div className="w-full flex flex-nowrap gap-5">
            <div className="bg-sidebar w-[33%] h-24 rounded-3xl flex items-center py-[15px] px-[20px]">
               <div className="flex w-full gap-5">
                  <div className="flex items-center justify-center">
                     <i className="fi fi-rr-portrait text-[40px] text-slate-300"></i>
                  </div>
                  <div className="flex flex-col   font-extrabold text-3xl">
                     <h1>User:</h1>
                     <span>{users?.length}</span>
                  </div>
               </div>
            </div>
            <div className="bg-sidebar w-[33%] h-24 rounded-3xl flex items-center py-[15px] px-[20px]">
               <div className="flex w-full gap-5">
                  <div className="flex items-center justify-center">
                     <i className="fi fi-rr-film text-[40px] text-slate-300"></i>
                  </div>
                  <div className="flex flex-col   font-extrabold text-3xl">
                     <h1>Movies:</h1>
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
            <div className="w-[33%] bg-sidebar px-5 py-0 flex- flex-col rounded-md">
               <h1 className="text-2xl py-2 text-danger font-medium tracking-widest border-b-2 border-danger">
                  Top views :
               </h1>
               <div className="max-h-[500px] overflow-y-scroll scrollbar-hide">
                  <Listbox
                     aria-label="Actions"
                     variant="bordered"
                     color="danger"
                  >
                     {movies
                        ?.sort((a: any, b: any) => b?.views - a?.views)
                        .slice(0, 10)
                        .map((item: any, index: number) => (
                           <ListboxItem key={index}>
                              <div className="flex gap-3 w-full">
                                 <h1 className="text-base font-medium">
                                    {index + 1}.{" "}
                                 </h1>
                                 <Image
                                    src={tmdbConfig.posterPath(
                                       item?.poster_path
                                    )}
                                    width={75}
                                    radius="none"
                                 />
                                 <div className="w-[60%] h-full block ">
                                    <h1 className="block whitespace-break-spaces text-ellipsis text-base font-medium">
                                       {item?.name}
                                    </h1>
                                    <p>{item?.views} views</p>
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
