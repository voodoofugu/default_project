import deepCompare from "./deepCompare";

type Listener<T> = (value: T) => void;
type State = Record<string, any>;

type ListenersMap = Map<string, Set<Listener<any>>>;

const listeners: ListenersMap = new Map();
let state: State = {};
let proxyState: State;

const initializeState = (initialState: State) => {
  if (proxyState) return; // Предотвращаем повторную инициализацию
  state = { ...initialState };
  console.log("state", state);
  proxyState = new Proxy(state, {
    get(target, key: string) {
      return target[key];
    },
    set(target, key: string, value) {
      if (!deepCompare(target[key], value)) {
        target[key] = value;
        const keyListeners = listeners.get(key);
        if (keyListeners) {
          keyListeners.forEach((listener) => listener(value));
        }
      }
      return true;
    },
  });
};

const subscribe = <T,>(key: string, listener: Listener<T>): (() => void) => {
  if (!listeners.has(key)) {
    listeners.set(key, new Set());
  }
  listeners.get(key)?.add(listener);
  return () => listeners.get(key)?.delete(listener);
};

const getState = (): State => {
  if (!proxyState) {
    console.warn("State is not initialized yet.");
    return {};
  }
  return { ...proxyState };
};

const setState = (key: string, value: any): void => {
  if (!proxyState) {
    console.warn("State is not initialized yet.");
    return;
  }
  proxyState[key] = value;
};

export { initializeState, getState, setState, subscribe };
