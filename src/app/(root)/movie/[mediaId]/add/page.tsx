"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import videoApi from "@/api/modules/video.api";
import { toast } from "react-toastify";

const AddVideo = () => {
   const { mediaId } = useParams();
   const formData = useFormik({
      initialValues: {
         key: "",
         id: mediaId,
         title: "",
      },
      onSubmit: async (values) => {
         const { res, error } = await videoApi.create(values);
         if (res) {
            toast.success("Add video success!!!");
            values.key = "";
            values.title = "";
         }
         if (error) toast.error(error?.message);
      },
   });
   return (
      <div className=" w-full h-full">
         <div className="w-full h-full flex flex-col items-center justify-center gap-5">
            <form
               action=""
               onSubmit={formData.handleSubmit}
               className="flex flex-col gap-5 items-center"
            >
               <Input
                  isRequired
                  type="text"
                  variant="underlined"
                  label="Title"
                  placeholder="Enter your title"
                  className="w-[500px]"
                  id="title"
                  onChange={formData.handleChange}
                  value={formData.values.title}
               />
               <Input
                  isRequired
                  type="text"
                  variant="underlined"
                  label="Key"
                  placeholder="Enter your key"
                  className="w-[500px]"
                  id="key"
                  onChange={formData.handleChange}
                  value={formData.values.key}
               />
               <Button type="submit" color="secondary" className="w-20">
                  Add
               </Button>
            </form>
         </div>
      </div>
   );
};

export default AddVideo;
