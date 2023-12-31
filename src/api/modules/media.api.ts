import { MovieType } from "@/types/media.type";
import publicClient from "../config/public.client";
import privateClient from "../config/private.client";

const mediaApi = {
   addMovie: async ({
      name,
      genres,
      backdrop_path,
      poster_path,
      views,
      runtime,
      year,
      premium,
      release_date,
      overview,
      direction,
   }: any) => {
      try {
         const res = await privateClient.post("/api/v1/movie/created", {
            name,
            genres,
            backdrop_path,
            poster_path,
            views,
            runtime,
            year,
            premium,
            release_date,
            overview,
            direction,
         });
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   editMovie: async ({
      id,
      name,
      genres,
      backdrop_path,
      poster_path,
      views,
      runtime,
      year,
      premium,
      release_date,
      overview,
      direction,
   }: any) => {
      try {
         const res = await privateClient.put(`/api/v1/movie/edited/${id}`, {
            name,
            genres,
            backdrop_path,
            poster_path,
            views,
            runtime,
            year,
            premium,
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
            "/api/v1/movie/list"
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   listCensorship: async () => {
      try {
         const res = await publicClient.get<MovieType[], MovieType[]>(
            "/api/v1/movie/censorship"
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   AcceptMovie: async ({ id }: { id: string | string[] }) => {
      try {
         const res = await publicClient.put(`/api/v1/movie/censorship/${id}`, {
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
            `/api/v1/movie/get/${mediaId}`
         );
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default mediaApi;
