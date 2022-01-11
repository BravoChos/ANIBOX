import React, {useEffect, useState} from 'react';

const resolveAfterXSeconds = (timeinterval: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timeinterval);
  });
};

export const useSetTimeout = (timeinterval: number = 2000) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    resolveAfterXSeconds(timeinterval).then(() => setLoading(false));
  }, []);

  return loading;
};
