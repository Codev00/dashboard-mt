import { GenreType } from "@/types/media.type";
import publicClient from "../config/public.client";

const genresApi = {
   getList: async () => {
      try {
         const res = await publicClient.get<GenreType[], GenreType[]>(
            "/api/v1/genre/list"
         );
         return { res };
      } catch (error) {
         return { error };
      }
   },
};

export default genresApi;
