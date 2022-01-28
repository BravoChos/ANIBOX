import axios from 'axios';
import {API_KEY_PIXEL} from './config';

const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';

export const getImagesFromPixcels = async () => {
  const {data, status, statusText} = await axios.get(API_URL, {
    headers: {
      Authorization: API_KEY_PIXEL,
    },
  });

  if (!data?.page) {
    return {
      status,
      error: statusText,
      data: null,
    };
  }

  return data.photos;
};
