export default function memoize<T>(
  fn: (...args: any[]) => T
): (...args: any[]) => T {
  const cache = new Map();

  return (...args: any[]): T => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }

    return cache.get(key);
  };
}
