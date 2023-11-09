"use client";
import adminApi from "@/api/modules/admin.api";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import React, { useEffect, useLayoutEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, useAppDispatch, useAppSelector } from "@/hook/store";
import { setUser } from "@/hook/global.slice";

const SignIn = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const isLogin = useAppSelector((state: RootState) => state.global.isLogin);

   useLayoutEffect(() => {
      if (isLogin || sessionStorage.getItem("access_token")) {
         router.push("/");
      }
   });
   const formData = useFormik({
      initialValues: {
         username: "",
         password: "",
      },
      onSubmit: async (values) => {
         const { res, error } = await adminApi.signin(values);
         if (res) {
            dispatch(setUser(res));
            toast.success("Sign in success!!!");
         }
         if (error) toast.error(error?.message);
      },
   });
   useEffect(() => {
      if (isLogin || sessionStorage.getItem("access_token")) {
         setTimeout(() => {
            router.push("/");
         }, 3000);
      }
   }, [isLogin]);
   return (
      <div className="w-full h-screen flex justify-center items-center bg-cyan-950  text-white shadow-lg">
         <div className="w-80 h-96 bg-gradient-to-tr from-pink-500 to-yellow-500 flex flex-col items-center  rounded-2xl">
            <h1 className="h-10 mt-10 mb-8 text-2xl ">
               <span className="font-bold text-3xl">ADMIN</span>{" "}
               <span className="italic">Signin</span>
            </h1>
            <form
               onSubmit={formData.handleSubmit}
               className="w-60 flex flex-col gap-3"
            >
               <Input
                  label="username"
                  labelPlacement="outside"
                  isClearable
                  radius="lg"
                  id="username"
                  onChange={formData.handleChange}
                  value={formData.values.username}
                  classNames={{
                     label: "text-black/50 dark:text-white/90",
                     input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                     ],
                     innerWrapper: "bg-transparent",
                     inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                     ],
                  }}
                  placeholder="username"
               />
               <Input
                  label="password"
                  labelPlacement="outside"
                  isClearable
                  radius="lg"
                  type="password"
                  id="password"
                  onChange={formData.handleChange}
                  value={formData.values.password}
                  classNames={{
                     label: "text-black/50 dark:text-white/90",
                     input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                     ],
                     innerWrapper: "bg-transparent",
                     inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                     ],
                  }}
                  placeholder="password"
               />
               <Button
                  type="submit"
                  color="secondary"
                  radius="full"
                  className="mt-2"
               >
                  Signin
               </Button>
            </form>
         </div>
      </div>
   );
};

export default SignIn;
