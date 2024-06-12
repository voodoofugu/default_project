export interface InitialStatesType {
  [key: string]: any;
  styleData: Array<{
    parent: string;
    fileNames?: string[];
    stylesLoaded?: boolean;
  }>;
  text1: string;
  text2: string;
}

const initialStates: InitialStatesType = {
  styleData: [],
  text1: "",
  text2: "",
};

export default initialStates;
