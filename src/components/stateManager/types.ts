declare global {
  interface StatesT {}
  interface ActionsT {}
}

export type ActionsType = {
  type: keyof ActionsT;
  payload?: any;
};

export type ActionsRT = {
  [key in keyof ActionsT]: {
    reducer?: (state: StatesT, action: ActionsType) => StatesT;
  };
};

export type NexusContextT = {
  get: <K extends keyof StatesT>(stateName: K) => StatesT[K];
  dispatch: ({ type, payload }: ActionsType) => void;
  getAll: () => StatesT;
  selector: <K extends keyof StatesT>(
    selector: (state: StatesT) => StatesT[K]
  ) => StatesT[K];
  subscribe: (callback: () => void) => () => void;
  initialStates: StatesT;
};