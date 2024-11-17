export default function nexusRef<T>(variable: T) {
  let localVariable = variable;
  const subscribers = new Set<() => void>();

  return {
    get current() {
      return localVariable;
    },
    set current(newState: T) {
      if (newState !== localVariable) {
        localVariable = newState;
        subscribers.forEach((callback) => callback());
      }
    },
    sub: (callback: (newState: T) => void) => {
      const wrappedCallback = () => callback(localVariable);
      subscribers.add(wrappedCallback);
      return () => subscribers.delete(wrappedCallback);
    },
    async update(updateFn: (current: T) => Promise<T>) {
      localVariable = await updateFn(localVariable);
      subscribers.forEach((callback) => callback());
    },
  };
}
