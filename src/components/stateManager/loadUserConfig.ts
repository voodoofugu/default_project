export type S<T = any> = {
  [key: string]: T;
};

export type A<T = any> = {
  type: string;
  payload?: T;
};

export type ActionsMap = {
  [actionKey: string]: { reducer?: (state: S, action: A) => S };
};

export default async function loadConfig(): Promise<{
  initialStates: S;
  actions: ActionsMap;
} | null>;

export default async function loadConfig<T = any>(): Promise<{
  initialStates: S<T>;
  actions: ActionsMap;
} | null> {
  try {
    const config = await import("../../../nexusConfig");

    // Получаем типы начальных состояний
    type InitialStatesType = typeof config.initialStates;

    return {
      initialStates: config.initialStates as S<InitialStatesType>,
      actions: config.actions,
    };
  } catch (error) {
    console.error("Nexus failed to load the `nexusConfig`", error);
    return null;
  }
}
