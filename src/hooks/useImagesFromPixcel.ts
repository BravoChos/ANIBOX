import React, {useEffect, useState} from 'react';

import {getImagesFromPixcels} from '@anibox/api/gallery';

export const useImagesFromPixcel = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    getImagesFromPixcels().then(items => {
      setImages(items);
    });
  }, []);

  return images;
};
