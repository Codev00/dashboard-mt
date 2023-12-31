import privateClient from "../config/private.client";
import publicClient from "../config/public.client";

const adminApi = {
   signin: async (values: any) => {
      try {
         const res = await publicClient.post("/api/v1/admin/signin", values);
         return { res };
      } catch (error: any) {
         return { error };
      }
   },
   getInfo: async () => {
      try {
         const res = await privateClient.get("/api/v1/admin/info");
         return { res };
      } catch (error) {
         return { error };
      }
   },
};

export default adminApi;
