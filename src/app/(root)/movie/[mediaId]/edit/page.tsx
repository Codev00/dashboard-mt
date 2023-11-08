"use client";
import genresApi from "@/api/modules/genres.api";
import mediaApi from "@/api/modules/media.api";
import EditMovie from "@/components/EditMovie";
import { GenreType, MovieType } from "@/types/media.type";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React, { FormEvent, Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Edit = () => {
   const { mediaId } = useParams();
   const [data, setData] = useState<MovieType>();
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.getMovie({ mediaId });
         if (res) setData(res);
         if (error) toast.error(error.message);
      })();
   }, []);

   return <Suspense>{data && <EditMovie data={data} />}</Suspense>;
};

export default Edit;
