import publicClient from "../config/public.client";

const videoApi = {
   create: async (values: any) => {
      try {
         const res = await publicClient.post("/video/created", values);
         return { res };
      } catch (error) {
         return { error };
      }
   },
};

export default videoApi;
