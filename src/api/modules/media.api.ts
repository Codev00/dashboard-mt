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
         const res = await publicClient.get("/movie/list");
         return { res };
      } catch (error) {
         return { error };
      }
   },
   getMovie: async ({ mediaId }: any) => {
      try {
         const res = await publicClient.get(`/movie/${mediaId}`);
         return { res };
      } catch (error) {
         return { error };
      }
   },
};

export default mediaApi;
