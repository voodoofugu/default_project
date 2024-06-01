export interface InitialStateType {
  [key: string]: any;
  styleData: Array<{ parent: string; fileNames?: string }>;
  styleLoaded: boolean;
}

const initialState: InitialStateType = {
  styleData: [],
  styleLoaded: false,
};

export default initialState;
