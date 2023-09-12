/**
 * A custom React hook for managing arrays with various array manipulation functions.
 *
 * @param {any[]} initialValue - The initial array value.
 * @returns {Object} An object containing the array, array manipulation functions, and a setter function.
 *
 * @example
 * // Initialize the array hook with an empty array.
 * const { array, push, pop, shift, unshift, replace, filter, remove, clear, reset } = useArray([]);
 *
 * // Initialize the array hook with an array consisting of 3 numbers:
 * const INIT = [3, 5, 7]
 * const { array, push, pop, shift, unshift, replace, filter, remove, clear, reset } = useArray(INIT);
 *
 * // Push an item to the array.
 * push('My item');
 *
 * // ...and inside a JSX component:
 * return (
 *   <>
 *     <button onClick={() => push('My item')}>Push 'My Item'</button>
 *   </>
 *  )
 *
 * // Pop the last item from the array.
 * pop();
 *
 * // Shift the first item from the array.
 * shift();
 *
 * // Unshift an item to the beginning of the array.
 * unshift('item');
 *
 * // Replace an item at a specific index.
 * replace(index, 'newItem');
 *
 * // Filter the array based on a callback.
 * filter(item => item.condition);
 *
 * // Remove an item at a specific index.
 * remove(index);
 *
 * // Clear the array.
 * clear();
 *
 * // Reset the array to the initial value.
 * reset();
 */
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
