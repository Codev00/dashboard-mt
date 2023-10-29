"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import adminApi from "@/api/modules/admin.api";
import { setUser } from "@/hook/global.slice";
export default function MovieLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const dispatch = useDispatch();
   const router = useRouter();
   useEffect(() => {
      (async () => {
         const { res, error } = await adminApi.getInfo();
         if (res) dispatch(setUser(res));
         if (error) console.log(error);
      })();
   }, [dispatch]);
   return (
      <div className="p-4 w-full h-full flex flex-col gap-2">
         <div className="h-20  rounded-2xl flex items-center px-10 gap-5">
            <Button
               color="secondary"
               variant="shadow"
               radius="full"
               startContent={<i className="fi fi-rr-apps text-lg"></i>}
               className="flex items-center"
               onClick={() => router.push("/movie")}
            >
               List Movie
            </Button>
            <Button
               color="danger"
               variant="shadow"
               radius="full"
               startContent={<i className="fi fi-rr-apps-add text-lg"></i>}
               className="flex items-center"
               onClick={() => router.push("/movie/created")}
            >
               Created Movie
            </Button>
         </div>
         <div className="w-full h-full bg-sidebar rounded-2xl p-3 text-slate-200 flex justify-center">
            {children}
         </div>
      </div>
   );
}
