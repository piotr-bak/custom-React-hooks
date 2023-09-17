/**
 * A custom React hook for managing values in localStorage with ease.
 *
 * @param {string} key - The key under which the value will be stored in localStorage.
 * @param {any|function} initialValue - The initial value for the state. It can be a direct value or a function that returns a value.
 * @returns {[any, function]} - An array containing the current value and a function to update it.
 *
 * @example
 * // Usage in a React component:
 * import { useLocalStorage } from './useLocalStorage';
 *
 * function MyComponent() {
 *   // Initialize the hook with a key and an initial value.
 *   const [storedValue, setStoredValue] = useLocalStorage('myKey', 'defaultValue');
 *
 *   // Now you can use storedValue and setStoredValue in your component.
 *   // storedValue holds the value from localStorage, and setStoredValue allows you to update it.
 *
 *   return (
 *     <div>
 *       <p>Stored Value: {storedValue}</p>
 *       <button onClick={() => setStoredValue('New Value')}>Set New Value</button>
 *     </div>
 *   );
 * }
 *
 * export default MyComponent;
 */
import { useEffect, useState } from 'react'

export function useLocalStorage (key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue == null) {
      if (typeof initialValue === 'function') {
        return initialValue();
      }
      return initialValue;
    }
    return JSON.parse(storedValue);
  })

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue];
}
