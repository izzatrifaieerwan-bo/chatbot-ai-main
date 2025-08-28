import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item || item === 'undefined') {
        if (item === 'undefined') {
          window.localStorage.removeItem(key);
        }
        return initialValue;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      window.localStorage.removeItem(key);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      if (value === undefined) {
        setStoredValue(initialValue);
        window.localStorage.removeItem(key);
      } else {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}