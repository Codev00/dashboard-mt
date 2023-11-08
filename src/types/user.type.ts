import { MovieType } from "./media.type";

export type UserType = {
   _id: string;
   username: string;
   password: string;
   displayName: string;
   email: string;
   verify: boolean;
   status: boolean;
   createdAt: string;
   favorites: MovieType[];
};
