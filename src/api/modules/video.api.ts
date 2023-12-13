import publicClient from "../config/public.client";

const videoApi = {
   create: async (values: any) => {
      try {
         const res = await publicClient.post("/api/v1/video/created", values);
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
};

export default videoApi;
