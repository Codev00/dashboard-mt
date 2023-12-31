"use client";
import Sidebar from "@/components/Sidebar";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import adminApi from "@/api/modules/admin.api";
import { setUser } from "@/hook/global.slice";

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const dispatch = useDispatch();
   useLayoutEffect(() => {
      (async () => {
         const { res, error } = await adminApi.getInfo();
         if (res) dispatch(setUser(res));
         if (error) console.log(error);
      })();
   }, [dispatch]);

   return (
      <section className="flex w-full">
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
         />
         <Sidebar />
         <div className="bg-main w-full h-screen">{children}</div>
      </section>
   );
}
