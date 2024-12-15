type Listener<T> = (value: T) => void;
type State = Record<string, any>;

type ListenersMap = Map<string, Set<Listener<any>>>;

const listeners: ListenersMap = new Map(); // Слушатели для конкретных ключей
let state: State = {};
let proxyState: State;

const initializeState = (initialState: State) => {
  state = { ...initialState }; // Устанавливаем начальное состояние
  proxyState = new Proxy(state, {
    get(target, key: string) {
      return target[key];
    },
    set(target, key: string, value) {
      const clonedValue = JSON.parse(JSON.stringify(value));

      if (JSON.stringify(target[key]) !== JSON.stringify(clonedValue)) {
        target[key] = clonedValue;

        // Уведомляем слушателей, подписанных на ключ
        const keyListeners = listeners.get(key);
        if (keyListeners) {
          keyListeners.forEach((listener) => listener(clonedValue));
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

  // Функция для отписки слушателя
  return () => listeners.get(key)?.delete(listener);
};

const getState = (): State => {
  // Проверяем, что proxyState существует перед сериализацией
  if (proxyState === undefined) {
    console.warn("State is not initialized yet.");
    return {}; // Возвращаем пустой объект, если состояние не инициализировано
  }
  return JSON.parse(JSON.stringify(proxyState)); // Возвращаем копию состояния
};

const setState = (key: string, value: any): void => {
  if (proxyState === undefined) {
    console.warn("State is not initialized yet.");
    return;
  }
  proxyState[key] = value;
};

export { initializeState, getState, setState, subscribe };
