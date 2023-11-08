import genresApi from "@/api/modules/genres.api";
import mediaApi from "@/api/modules/media.api";
import { GenreType } from "@/types/media.type";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddMovie = () => {
   const [genres, setGenres] = useState<GenreType[]>([]);
   const [name, setName] = useState("");
   const [genre, setGenre] = useState<any>([]);
   const [backdrop, setBackdrop] = useState("");
   const [poster, setPoster] = useState("");
   const [views, setViews] = useState(0);
   const [runtime, setRuntime] = useState(0);
   const [year, setYear] = useState(0);
   const [status, setStatus] = useState("");
   const [date, setDate] = useState("");
   const [overview, setOverview] = useState("");
   const [direction, setDirection] = useState<any>([]);
   useEffect(() => {
      (async () => {
         const { res, error } = await genresApi.getList();
         if (res) setGenres(res);
         if (error) console.log(error);
      })();
   }, []);

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { res, error } = await mediaApi.addMovie({
         name: name,
         genres: genre,
         backdrop_path: backdrop,
         poster_path: poster,
         views: views,
         runtime: runtime,
         year: year,
         status: status,
         release_date: date,
         overview: overview,
         direction: direction,
      });
      if (res) toast.success("Created new movie success !!!");
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
               />
               <div className="flex gap-4 w-[500px]">
                  <Select
                     isRequired
                     label="Genres"
                     placeholder="Select an genres"
                     selectionMode="multiple"
                     variant="underlined"
                     onChange={(e) => setGenre(e.target.value.split(","))}
                  >
                     {genres.map((genre) => (
                        <SelectItem key={genre._id} value={genre?._id}>
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
                  />
                  <Input
                     isRequired
                     type="text"
                     variant="underlined"
                     label="poster"
                     placeholder="Enter your poster"
                     onChange={(e) => setPoster(e.target.value)}
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
                  />
                  <Input
                     isRequired
                     type="number"
                     variant="underlined"
                     label="runtime"
                     placeholder="Enter your runtime"
                     onChange={(e) => setRuntime(Number(e.target.value))}
                  />
                  <Input
                     isRequired
                     type="number"
                     variant="underlined"
                     label="year"
                     placeholder="Enter your year"
                     onChange={(e) => setYear(Number(e.target.value))}
                  />
               </div>
               <div className="w-[500px] flex  gap-4">
                  <Select
                     isRequired
                     label="Status"
                     placeholder="Select an Status"
                     variant="underlined"
                     onChange={(e) => setStatus(e.target.value)}
                  >
                     <SelectItem key={"Release"} value={"Release"}>
                        Release
                     </SelectItem>
                     <SelectItem key={"Commingsoon"} value={"Commingsoon"}>
                        Commingsoon
                     </SelectItem>
                  </Select>

                  <Input
                     isRequired
                     type="text"
                     variant="underlined"
                     label="Release Date"
                     placeholder="YYYY-MM-DD"
                     onChange={(e) => setDate(e.target.value)}
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
               />
               <Button
                  type="submit"
                  radius="full"
                  className="bg-gradient-to-tr mt-5 from-pink-500 to-yellow-500 text-white shadow-lg"
               >
                  Created
               </Button>
            </form>
         </div>
      </div>
   );
};

export default AddMovie;
