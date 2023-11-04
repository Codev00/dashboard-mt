import { MovieType } from "@/types/media.type";
import publicClient from "../config/public.client";

const mediaApi = {
   addMovie: async ({
      name,
      genres,
      backdrop_path,
      poster_path,
      views,
      runtime,
      year,
      status,
      release_date,
      overview,
      direction,
   }: any) => {
      try {
         const res = await publicClient.post("/movie/created", {
            name,
            genres,
            backdrop_path,
            poster_path,
            views,
            runtime,
            year,
            status,
            release_date,
            overview,
            direction,
         });
         return { res };
      } catch (error) {
         return { error };
      }
   },
   listMovie: async () => {
      try {
         const res = await publicClient.get<MovieType[], MovieType[]>(
            "/movie/list"
         );
         return { res };
      } catch (error) {
         return { error };
      }
   },
   getMovie: async ({ mediaId }: any) => {
      try {
         const res = await publicClient.get(`/movie/get/${mediaId}`);
         return { res };
      } catch (error) {
         return { error };
      }
   },
};

export default mediaApi;
