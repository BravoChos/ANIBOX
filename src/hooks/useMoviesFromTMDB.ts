import React, {useEffect, useState} from 'react';

import {getMovies} from '@anibox/api/movie';

interface Movie {
  id: Number;
  title: String;
  poster: String;
  backdrop: String;
  rating: Number;
  description: String;
  release_date: String;
  genres: [Number];
}
type Movies = Movie[];

export const useMoviesFromTMDB = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((fetchedMovies: Movies) => {
      if (fetchedMovies?.length > 0) {
        setMovies([
          //@ts-ignore
          {title: 'empty-left'},
          //@ts-ignore
          ...fetchedMovies,
          //@ts-ignore
          {title: 'empty-right'},
        ]);
      }
    });
  }, []);

  return movies;
};
