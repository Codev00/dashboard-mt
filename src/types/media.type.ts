export type GenreType = {
   _id: string;
   id: number;
   title: string;
};

export type VideoType = {
   _id: string;
   title: string;
   key: string;
   movie: string;
};
export type MovieType = {
   _id: string;
   name: string;
   year: number;
   backdrop_path: string;
   poster_path: string;
   overview: string;
   runtime: number;
   views: number;
   release_date: string;
   direction: string[];
   actor: [];
   vote_point: number;
   vote_total: number;
   quality: string;
   status: string;
   genres: GenreType[];
   videos: VideoType[];
   premium: boolean;
};
