/**
 * Tiny pub/sub so the masthead can wait for the preloader curtain.
 */
let done = false;
const subscribers = new Set<() => void>();

export function onIntroDone(cb: () => void) {
  if (done) {
    cb();
    return () => {};
  }
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

export function markIntroDone() {
  if (done) return;
  done = true;
  subscribers.forEach((cb) => cb());
  subscribers.clear();
}
