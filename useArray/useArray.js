import { useCallback, useState } from "react";

export function useArray (initialValue) {
  const [array, setArray] = useState(initialValue);

  const pop = useCallback(() => {
    setArray(arr => [...arr.slice(0, -1)])
  }, []);

  const push = useCallback((item) => {
    setArray(arr => [...arr, item]);
  }, []);

  const shift = useCallback(() => {
    setArray(arr => [...arr.slice(1)]);
  }, [])

  const unshift = useCallback((item) => {
    setArray(arr => [item, ...arr]);
  }, [])
  const replace = useCallback((index, element) => {
    setArray(arr => {
      return [...arr.slice(0, index), element, ...arr.slice(index + 1)]
    });
  }, [])

  const filter = useCallback((callback) => {
    return setArray(arr => arr.filter(callback));
  }, [])

  const remove = useCallback((index) => {
    setArray(arr => {
      return [...arr.slice(0, index), ...arr.slice(index + 1)]
    });
  }, [])

  const clear = useCallback(() => {
    setArray([]);
  }, [])

  const reset = useCallback(() => {
    setArray(initialValue);
  }, [initialValue]);

  return {
    array,
    set: setArray,
    pop,
    push,
    shift,
    unshift,
    replace,
    filter,
    remove,
    clear,
    reset
  }
}
