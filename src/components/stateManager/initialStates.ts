export interface InitialStatesType {
  [key: string]: any;
  styleData: Array<{
    parent: string;
    fileNames?: string[];
    stylesLoaded?: boolean;
  }>;
}

const initialStates: InitialStatesType = {
  styleData: [],
};

export default initialStates;
