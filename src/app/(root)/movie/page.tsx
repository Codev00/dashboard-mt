"use client";
import AddMovie from "@/components/AddMovie";
import ListMovie from "@/components/ListMovie";
import React, { Suspense } from "react";

const Movie = () => {
   return (
      <Suspense>
         <ListMovie />
      </Suspense>
   );
};

export default Movie;
