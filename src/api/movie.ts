import {Platform} from 'react-native';
import axios from 'axios';
import {API_KEY} from './config';
import {width, height} from '../styles';
import {Movie} from './types';

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const getImagePath = (path: String) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: String) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

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

export const getMovies = async () => {
  const {data, status, statusText} = await axios.get(API_URL);

  if (!data?.results)
    return {
      status,
      error: statusText,
      data: null,
    };

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
    }: Movie) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre: Number) => genres[genre]),
    }),
  );

  return movies;
};

// const client = axios.create({
//   // baseURL: config.api.baseURL,
//   baseURL: 'http://ec2-34-201-63-148.compute-1.amazonaws.com',
//   // baseURL: 'http://localhost:5600/',
//   headers: {
//     Accept: 'application/json',
//     // Authorization: `Bearer ${AuthStore.token}`,
//   },
//   // headers: {'Authorization': 'Bearer '+token}
// });

// // Intercept all requests
// client.interceptors.request.use(
//   config => {
//     const token = AuthStore.token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     // Alert.alert('wow');
//     console.log(error);
//     Promise.reject(error);
//   },
// );

// Intercept all responses
// client.interceptors.response.use(
//   async response => {
//     return response;
//   },
//   error => {
//     if (error && error.response && error.response.status) {
//       console.log(
//         '[API ERROR] CODE : ',
//         error.response.status,
//         ' MESSAGE : ',
//         error.response.data.err,
//       );
//       Alert.alert(error.response.data.err);
//       if (error.response.status === 401) {
//         // auth error, go to login
//         console.log('>>>');
//         // LoginStore.logout();
//       }
//     } else {
//       return Promise.reject(error);
//     }
//   },
// );

// export default client;
