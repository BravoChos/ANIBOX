import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';

import {API_KEY} from '../../api/config';
import {RootStackParamList} from '../types';

const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const getImagePath = (path: String) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: String) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

interface movie {
  id: Number;
  original_title: String;
  poster_path: String;
  backdrop_path: String;
  vote_average: Number;
  overview: String;
  release_date: String;
  genre_ids: [Number];
}

export const getMovies = async () => {
  const {data, status, statusText} = await axios.get(API_URL);
  // (API_URL).then(x => x.json());
  if (!data?.results)
    return {
      status,
      error: statusText,
      data: null,
    };
  //
  // console.log(results);
  // return null;
  const movies = data.results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: movie) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map(genre => genres[genre]),
    }),
  );

  return movies;
};

const MovieScreen = () => {
  const navigation = useNavigation<RootStackParamList>();
  console.log(API_KEY, 1);

  useEffect(() => {
    // axios.get(API_URL).then(r => {
    //   console.log(r);
    //   console.log('object');
    // });
    getMovies().then(r => {
      console.log(r);
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>MovieScreen</Text>
    </SafeAreaView>
  );
};

export default MovieScreen;
