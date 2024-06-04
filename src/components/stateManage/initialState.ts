export interface InitialStateType {
  [key: string]: any;
  styleData: Array<{
    parent: string;
    fileNames?: string;
    stylesLoaded?: boolean;
  }>;
}

const initialState: InitialStateType = {
  styleData: [],
};

export default initialState;
