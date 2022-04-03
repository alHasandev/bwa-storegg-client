import Callback from '../types/callback';

export default function throttle(callback: Callback, delay = 1000) {
  let shouldWait = false;
  let waitingArgs: any;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  return (...args: any[]) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
