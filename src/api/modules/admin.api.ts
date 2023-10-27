import publicClient from "../config/public.client";

const adminApi = {
   signin: async (values: any) => {
      try {
         const res = await publicClient.post("/admin/signin", values);
         return { res };
      } catch (error) {
         return { error };
      }
   },
};

export default adminApi;
