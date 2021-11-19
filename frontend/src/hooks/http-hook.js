import { useCallback } from 'react';

export const useHttpClient = () => {

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {

      try {
          const response = await fetch(url, {
          method,
          body,
          headers
        });

        const responseData = await response.json();

        if (!response.ok) {
          return responseData.message;
        }
        return responseData;
      } 
      catch (err) {
        return err;
      }
    },
    []
  );

  return { sendRequest };
};
