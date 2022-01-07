import {Platform} from 'react-native';
import axios from 'axios';
import {API_KEY_PIXEL} from './config';
import {width, height} from '../styles';
import {Movie} from './types';
// Authorization: YOUR_API_KEY
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';

// const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
// const getImagePath = (path: String) =>
//   `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
// const getBackdropPath = (path: String) =>
//   `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

export const getImagesFromPixcels = async () => {
  const {data, status, statusText} = await axios.get(API_URL, {
    headers: {
      Authorization: API_KEY_PIXEL,
    },
  });
  console.log({data}, 'getImagesFromPixcels');

  if (!data?.page)
    return {
      status,
      error: statusText,
      data: null,
    };

  return data.photos;

  //   const results = await data.json();

  // if (!data?.results)
  //   return {
  //     status,
  //     error: statusText,
  //     data: null,
  //   };

  //   const movies = data.results.map(
  //     ({
  //       id,
  //       original_title,
  //       poster_path,
  //       backdrop_path,
  //       vote_average,
  //       overview,
  //       release_date,
  //       genre_ids,
  //     }: Movie) => ({
  //       key: String(id),
  //       title: original_title,
  //       poster: getImagePath(poster_path),
  //       backdrop: getBackdropPath(backdrop_path),
  //       rating: vote_average,
  //       description: overview,
  //       releaseDate: release_date,
  //       genres: genre_ids.map((genre: Number) => genres[genre]),
  //     }),
  //   );

  //   return movies;
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
