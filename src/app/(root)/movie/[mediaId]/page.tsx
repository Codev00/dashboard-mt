"use client";
import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/media.api";
import ButtonDelete from "@/components/ButtonDelete";
import PlayModal from "@/components/PlayModal";
import { Button, Chip, Image } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Detail = () => {
   const { mediaId } = useParams();
   const router = useRouter();
   const [movie, setMovie] = useState<any>();

   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.getMovie({ mediaId });
         if (res) setMovie(res);
         if (error) toast.error(error?.message);
      })();
   }, [mediaId]);

   return (
      <div className="flex w-full gap-3">
         <div className="w-[60] h-full text-white flex flex-col gap-5 justify-center">
            <Button
               variant="ghost"
               color="warning"
               onClick={() => router.push(`/movie/${mediaId}/add`)}
            >
               <i className="fi fi-rr-photo-video text-xl"></i> Add video
            </Button>
            <Button variant="ghost" color="danger">
               <ButtonDelete id={mediaId} /> Delete
            </Button>
         </div>
         <div className="w-full bg-main px-20 pt-10 pb-3 flex flex-col gap-3">
            <div className="flex gap-5">
               <Image
                  src={tmdbConfig.posterPath(movie?.poster_path)}
                  height={300}
                  width={200}
                  shadow="lg"
                  loading="lazy"
                  radius="none"
                  isBlurred
               />
               <div className="flex flex-col gap-3">
                  <h1 className="text-4xl font-bold">{movie?.name}</h1>
                  <div className="flex gap-2">
                     {movie?.genres.map((genres: any, index: number) => (
                        <Chip
                           key={index}
                           color="success"
                           variant="bordered"
                           className="cursor-pointer"
                        >
                           {genres?.title}
                        </Chip>
                     ))}
                  </div>
                  <div>
                     <div className="flex gap-10">
                        <span>Views: {movie?.views}</span>
                        <span>Runtime: {movie?.runtime}m</span>
                     </div>
                  </div>
                  <div className="max-w-[800px] text-slate-300">
                     <h1 className="font-bold">Overview</h1>
                     <p>{movie?.overview}</p>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-3">
               <h1 className="text-xl font-bold">Video</h1>
               <div className="flex gap-5 flex-nowrap  ">
                  {movie?.videos.map((video: any, index: number) => (
                     <PlayModal link={video?.key} key={index}>
                        <Image
                           key={index}
                           src={tmdbConfig.youtubeImg(video?.key)}
                           width={300}
                           height={200}
                           isZoomed
                           className="cursor-pointer"
                        />
                     </PlayModal>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Detail;
