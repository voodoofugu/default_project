// Глобальный интерфейс для состояний
declare global {
  interface IStatesT {}
}

type Listener<T> = (value: T) => void;
type ListenersMap = Map<string, Set<Listener<any>>>;

let state: IStatesT = {} as IStatesT; // Инициализируем state с значениями по умолчанию
let proxyState: IStatesT | null = null;

const listeners: ListenersMap = new Map();

const initializeState = (initialState: Partial<IStatesT>) => {
  if (proxyState) return;
  // Обновляем состояние, создаём новый объект с объединением
  state = { ...state, ...initialState } as IStatesT;

  proxyState = new Proxy(state, {
    get(target, key: string | symbol) {
      if (typeof key === "string" && key in target) {
        return target[key as keyof IStatesT]; // Уточняем тип key
      }
      return undefined;
    },
    set(target, key: string | symbol, value: any) {
      if (typeof key === "string" && key in target) {
        const currentValue = target[key as keyof IStatesT];
        if (JSON.stringify(currentValue) !== JSON.stringify(value)) {
          const keyListeners = listeners.get(key);
          if (keyListeners) {
            keyListeners.forEach((listener) => listener(value));
          }
        }
        return true;
      }
      return false;
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

const getState = (): IStatesT => {
  if (!proxyState) {
    console.warn("State is not initialized yet.");
    return {} as IStatesT;
  }
  return { ...proxyState };
};

const setState = <K extends keyof IStatesT>(
  key: K,
  value: IStatesT[K]
): void => {
  if (!proxyState) {
    console.warn("State is not initialized yet.");
    return;
  }
  proxyState[key] = value;
};

export { initializeState, getState, setState, subscribe };
