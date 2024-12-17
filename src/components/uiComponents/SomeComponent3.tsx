// SomeComponent3.tsx
import React, { useEffect } from "react";
import {
  getState,
  setState,
  subscribe,
  initializeState,
} from "../stateManager/globalStore";

// Пример компонента, который подписывается на обновления состояния
export default function SomeComponent3(): React.ReactElement {
  // Инициализация состояния
  useEffect(() => {
    initializeState({ count: 0 });
  }, []);

  let countRef = getState().count; // Храним текущее значение в ref

  // Обработчик для обновления состояния
  const increment = () => {
    setState("count", getState().count + 1); // Обновляем состояние
  };

  const decrement = () => {
    setState("count", getState().count - 1); // Обновляем состояние
  };

  // Подписка на обновление состояния без использования useState
  useEffect(() => {
    const unsubscribe = subscribe<number>("count", (newCount) => {
      countRef = newCount;
      forceUpdate(); // Принудительная перерисовка компонента
    });

    return () => unsubscribe(); // Очистка подписки
  }, []);

  // Принудительное обновление компонента
  const forceUpdate = React.useReducer(() => ({}), {})[1];

  return (
    <div>
      <h1>Current Count: {countRef}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
