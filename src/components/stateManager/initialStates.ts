export interface NexusStatesT {
  [key: string]: any;
  styleData: Array<{
    parent: string;
    fileNames?: string[];
    stylesLoaded?: boolean;
  }>;

  someData?: string;
}

const initialStates: NexusStatesT = {
  styleData: [],
  someData: "123",
};

export default initialStates;
