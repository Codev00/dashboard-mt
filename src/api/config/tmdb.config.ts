export const mediaType = {
   movie: "movie",
   tv: "tv",
};

export const mediaCategory = {
   popular: "popular",
   top_rated: "top_rated",
};

const backdropPath = (imgEndpoint: string) =>
   `https://image.tmdb.org/t/p/original/${imgEndpoint}`;

const posterPath = (imgEndpoint: string) =>
   `https://image.tmdb.org/t/p/w500/${imgEndpoint}`;

const youtubePath = (videoId: string) =>
   `https://www.youtube.com/embed/${videoId}?controls=1`;
const youtubeImg = (videoId: string) =>
   `http://img.youtube.com/vi/${videoId}/sddefault.jpg`;
const tmdbConfig = {
   mediaType,
   mediaCategory,
   backdropPath,
   posterPath,
   youtubePath,
   youtubeImg,
};

export default tmdbConfig;
