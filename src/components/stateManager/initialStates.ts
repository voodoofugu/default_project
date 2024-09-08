export interface InitialStatesType {
  [key: string]: any;
  styleData: Array<{
    parent: string;
    fileNames?: string[];
    stylesLoaded?: boolean;
  }>;

  someData?: string;
}

const initialStates: InitialStatesType = {
  styleData: [],
  someData: "123",
};

export default initialStates;
