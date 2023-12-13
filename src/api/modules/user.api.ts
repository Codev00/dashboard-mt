import { UserType } from "@/types/user.type";
import publicClient from "../config/public.client";

const userApi = {
   listUser: async () => {
      try {
         const res = await publicClient.get<UserType[], UserType[]>(
            "/api/v1/user/list"
         );
         return { res };
      } catch (error) {
         return { error };
      }
   },
};

export default userApi;
