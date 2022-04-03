import Callback from '../types/callback';

export default function debounce(callback: Callback, delay = 1000) {
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
