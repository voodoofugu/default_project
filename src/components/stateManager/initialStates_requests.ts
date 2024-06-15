export type RequestsType = {
  data: any;
  requestLoaded?: boolean;
};

export interface InitialStates_requestsType {
  [key: string]: RequestsType;
  s_pokemon1: RequestsType;
  s_pokemon2: RequestsType;
}

const initialState_requests: InitialStates_requestsType = {
  s_pokemon1: { data: null, requestLoaded: false },
  s_pokemon2: { data: null, requestLoaded: false },
};

export default initialState_requests;
