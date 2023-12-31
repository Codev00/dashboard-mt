import genresApi from "@/api/modules/genres.api";
import mediaApi from "@/api/modules/media.api";
import { GenreType, MovieType } from "@/types/media.type";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditMovie = ({ data }: { data: MovieType }) => {
   let genreInit: string[] = [];

   data.genres.map((item) => {
      return genreInit.push(item.title);
   });

   const [genres, setGenres] = useState<GenreType[]>([]);
   const [name, setName] = useState<any>(data.name);
   const [genre, setGenre] = useState<any>(data.genres);
   const [backdrop, setBackdrop] = useState(data.backdrop_path);
   const [poster, setPoster] = useState(data.poster_path);
   const [views, setViews] = useState<any>(data.views);
   const [runtime, setRuntime] = useState<any>(data.runtime);
   const [year, setYear] = useState<any>(data.year);
   const [date, setDate] = useState(data.release_date);
   const [overview, setOverview] = useState(data.overview);
   const [direction, setDirection] = useState<any>(data.direction);
   const [premium, setPremium] = useState(data.premium);
   useEffect(() => {
      (async () => {
         const { res, error } = await genresApi.getList();
         if (res) setGenres(res);
         if (error) console.log(error);
      })();
   }, []);

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { res, error } = await mediaApi.editMovie({
         id: data._id,
         name: name,
         genres: genre,
         backdrop_path: backdrop,
         poster_path: poster,
         views: views,
         runtime: runtime,
         year: year,
         release_date: date,
         overview: overview,
         direction: direction,
         premium: premium,
      });
      if (res) toast.success("Movie updated success !!!");
      if (error) toast.error(error?.message);
   };

   return (
      <div className="w-full h-full bg-sidebar rounded-2xl p-3 text-slate-200">
         <div className="h-full flex items-center justify-center">
            <form
               onSubmit={handleSubmit}
               method="post"
               className="flex flex-col items-center gap-2"
            >
               <Input
                  isRequired
                  type="text"
                  variant="underlined"
                  label="Name"
                  placeholder="Enter your Name"
                  className="w-[500px]"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
               />
               <div className="flex gap-4 w-[500px]">
                  <Select
                     isRequired
                     defaultSelectedKeys={genreInit}
                     label="Genres"
                     placeholder="Select an genres"
                     selectionMode="multiple"
                     variant="underlined"
                     onChange={(e) => setGenre(e.target.value.split(","))}
                  >
                     {genres.map((genre) => (
                        <SelectItem key={genre.title} value={genre?._id}>
                           {genre?.title}
                        </SelectItem>
                     ))}
                  </Select>
                  <Input
                     isRequired
                     type="text"
                     variant="underlined"
                     label="Direction"
                     placeholder="Enter your Direction"
                     onChange={(e) => setDirection(e.target.value)}
                     value={direction}
                  />
               </div>
               <div className="w-[500px] flex  gap-4">
                  <Input
                     isRequired
                     type="text"
                     variant="underlined"
                     label="backdrop"
                     placeholder="Enter your backdrop"
                     onChange={(e) => setBackdrop(e.target.value)}
                     value={backdrop}
                  />
                  <Input
                     isRequired
                     type="text"
                     variant="underlined"
                     label="poster"
                     placeholder="Enter your poster"
                     onChange={(e) => setPoster(e.target.value)}
                     value={poster}
                  />
               </div>
               <div className="w-[500px] flex  gap-4">
                  <Input
                     isRequired
                     type="number"
                     variant="underlined"
                     label="views"
                     placeholder="Enter your views"
                     onChange={(e) => setViews(Number(e.target.value))}
                     value={views}
                  />
                  <Input
                     isRequired
                     type="number"
                     variant="underlined"
                     label="runtime"
                     placeholder="Enter your runtime"
                     onChange={(e) => setRuntime(Number(e.target.value))}
                     value={runtime}
                  />
                  <Input
                     isRequired
                     type="number"
                     variant="underlined"
                     label="year"
                     placeholder="Enter your year"
                     onChange={(e) => setYear(Number(e.target.value))}
                     value={year}
                  />
               </div>
               <div className="w-[500px] flex  gap-4">
                  <Select
                     isRequired
                     label="Premium"
                     placeholder="Select an Premium"
                     variant="underlined"
                     onChange={(e) => setPremium(e.target.value === "true")}
                     defaultSelectedKeys={premium ? ["true"] : ["false"]}
                  >
                     <SelectItem key={"true"} value={"true"}>
                        True
                     </SelectItem>
                     <SelectItem key={"false"} value={"false"}>
                        False
                     </SelectItem>
                  </Select>

                  <Input
                     isRequired
                     type="text"
                     variant="underlined"
                     label="Release Date"
                     placeholder="YYYY-MM-DD"
                     onChange={(e) => setDate(e.target.value)}
                     value={date}
                  />
               </div>
               <Textarea
                  isRequired
                  label="Overview"
                  labelPlacement="outside"
                  placeholder="Enter your overview"
                  className="w-[500px]"
                  variant="underlined"
                  onChange={(e) => setOverview(e.target.value)}
                  value={overview}
               />
               <Button
                  type="submit"
                  radius="full"
                  className="bg-gradient-to-tr mt-5 from-pink-500 to-yellow-500 text-white shadow-lg"
               >
                  Save
               </Button>
            </form>
         </div>
      </div>
   );
};

export default EditMovie;
