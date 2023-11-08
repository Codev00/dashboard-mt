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
      } catch (error: any) {
         return { error };
      }
   },
   listMovie: async () => {
      try {
         const res = await publicClient.get<MovieType[], MovieType[]>(
            "/movie/list"
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   listCensorship: async () => {
      try {
         const res = await publicClient.get<MovieType[], MovieType[]>(
            "/movie/censorship"
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   AcceptMovie: async ({ id }: { id: string | string[] }) => {
      try {
         const res = await publicClient.put(`/movie/censorship/${id}`, {
            censorship: true,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   getMovie: async ({ mediaId }: any) => {
      try {
         const res = await publicClient.get<MovieType, MovieType>(
            `/movie/get/${mediaId}`
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default mediaApi;
