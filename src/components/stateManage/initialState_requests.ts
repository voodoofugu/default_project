export type RequestsType = {
  data: any;
  requestLoaded?: boolean;
};

export interface InitialState_requestsType {
  [key: string]: RequestsType;
  pokemon1: RequestsType;
  pokemon2: RequestsType;
}

const initialState_requests: InitialState_requestsType = {
  pokemon1: { data: null, requestLoaded: false },
  pokemon2: { data: null, requestLoaded: false },
};

export default initialState_requests;
