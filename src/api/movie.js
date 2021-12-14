import axios from 'axios';

const client = axios.create({
  // baseURL: config.api.baseURL,
  baseURL: 'http://ec2-34-201-63-148.compute-1.amazonaws.com',
  // baseURL: 'http://localhost:5600/',
  headers: {
    Accept: 'application/json',
    // Authorization: `Bearer ${AuthStore.token}`,
  },
  // headers: {'Authorization': 'Bearer '+token}
});

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

export default client;
