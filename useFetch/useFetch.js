/**
 * A custom React hook for making HTTP requests with fetch.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {object} [options] - Optional fetch options.
 * @param {boolean} [logErrors=true] - Whether to log errors to the console.
 *
 * @returns {object} An object containing the fetched data, loading state, and error state.
 * @property {*} data - The fetched data.
 * @property {boolean} isError - Indicates if an error occurred during the fetch.
 * @property {boolean} isLoading - Indicates if the fetch operation is in progress.
 *
 * @example
 * // Basic usage with default error logging
 * const { data, isError, isLoading } = useFetch("https://api.example.com/data");
 *
 * // Usage with custom fetch options and disabling error logging
 * const options = { method: "POST", body: JSON.stringify({ id: 1 }) };
 * const { data, isError, isLoading } = useFetch("https://api.example.com/post", options, false);
 *
 * @example
 * // You can choose between two error definition files.
 * // If you need detailed error codes, import from 'httpErrorCodesDetailed'.
 * // If you need basic error codes, import from 'httpErrorCodes'.
 * //
 * // Example 1: Importing detailed error codes
 * // import serverErrors from './httpErrorCodesDetailed';
 *
 * // Example 2: Importing basic error codes
 * // import serverErrors from './httpErrorCodes';
 */

import { useEffect, useState } from 'react';
import serverErrors from './httpErrorCodes';
//ALTERNATIVELY: import serverErrors from './httpErrorCodesDetailed';

export function useFetch (url, options, logErrors = true) {
  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setData(undefined);
    setIsError(false);

    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(url, { signal: controller.signal, ...options });
        if (!response.ok) {
          const message = `Invalid server response. Error ${response.status}: ${serverErrors.get(response.status)}`;
          throw new Error(message);
        } else {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        if ("AbortError" === error.name) return;
        setIsError(true);
        if (logErrors) console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => controller.abort();
  }, [url])

  return { data, isError, isLoading }
}
