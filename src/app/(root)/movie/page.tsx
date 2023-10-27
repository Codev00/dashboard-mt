"use client";
import AddMovie from "@/components/movie/AddMovie";
import ListMovie from "@/components/movie/ListMovie";
import React, { Suspense } from "react";

const Movie = () => {
   return (
      <Suspense>
         <ListMovie />
      </Suspense>
   );
};

export default Movie;
