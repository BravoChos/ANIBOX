// import {AxiosError} from 'axios';

export interface Movie {
  id: Number;
  original_title: String;
  poster_path: String;
  backdrop_path: String;
  vote_average: Number;
  overview: String;
  release_date: String;
  genre_ids: [Number];
}

// export interface User {
//   id: number;
//   username: string;
//   email: string;
//   provider: string;
//   confirmed: boolean;
//   blocked: null | boolean;
//   role: number;
//   created_at: string;
//   updated_at: string;
// }

// export interface Article {
//   id: number;
//   title: string;
//   body: string;
//   user: User;
//   published_at: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface Comment {
//   id: number;
//   message: string;
//   user: User;
//   published_at: string;
//   created_at: string;
//   updated_at: string;
// }

// export interface AuthResult {
//   jwt: string;
//   user: User;
// }

// type AuthErrorData = {
//   messages: {
//     id: string;
//     message: string;
//   }[];
// }[];

// export type AuthError = AxiosError<{
//   statusCode: number;
//   error: string;
//   message: AuthErrorData;
//   data: AuthErrorData;
// }>;
