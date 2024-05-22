interface PageData {
  scrollTop: number;
  top: number;
  left: number;
}

interface PopupState {
  mpopClass: string;
  popStyle: Record<string, any>;
  popTit: string;
  popCont: any[];
  btnXClass: string;
  infBtn: boolean;
  timer: boolean;
  count: {
    icon: string;
    value: number;
    add?: boolean;
  } | null;
  popupVisible: boolean;
  dialogEmersion: string;
  popOpen: (dispatch: (action: any) => void, actionStatets?: any) => void;
  popClose: (dispatch: (action: any) => void) => void;
}

interface SAndLStates {
  activePlate: number;
  activeTime: number;
  animInProgress: boolean;
  animPortal: boolean;
}

export interface InitialState {
  activePage: string;
  searchData: string[];
  pageData: PageData;
  popupState: PopupState;
  sAndLStates: SAndLStates;
  booleanState: boolean;
  [key: string]: any;
}

export const initialState: InitialState = {
  // template initial states
  activePage: "",
  searchData: [],
  pageData: {
    scrollTop: 0,
    top: 0,
    left: 0,
  },

  // project initial states
  popupState: {
    mpopClass: "",
    popStyle: {},
    popTit: "",
    popCont: [],
    btnXClass: "",
    infBtn: false,
    timer: false,
    count: null,
    popupVisible: false,
    dialogEmersion: "",
    popOpen: () => {},
    popClose: () => {},
  },

  sAndLStates: {
    activePlate: 0,
    activeTime: 0,
    animInProgress: false,
    animPortal: false,
  },

  booleanState: false,
};

export interface Action {
  type: string;
  payload?: any;
}

export function reducer(draft: any, action: Action): any {
  switch (action.type) {
    // template initial states
    case "ACTIVE_PAGE":
      draft.activePage = action.payload;
      return draft;

    case "SEARCH_DATA":
      draft.searchData = action.payload;
      return draft;

    case "PAGE_DATA":
      draft.pageData = action.payload;
      return draft;

    // project initial states
    case "SCROLL_TOP":
      draft.toTopBtnState.scrollTop = action.payload;
      return draft;

    case "POPUP_OPEN":
      draft.popupState = {
        ...action.payload,
        popupVisible: true,
        dialogEmersion: "show dialog-emersion-enter",
        // popupClose и popupOpen можно сразу вызвать вместо кейсов
        popClose: (dispatch: (action: any) => void) => {
          dispatch({ type: "POPUP_FOR_CLOSE" });
          setTimeout(() => {
            dispatch({ type: "POPUP_CLOSE" });
          }, 200);
        },
        popOpen: (dispatch: (action: any) => void, actionStatets: any) => {
          dispatch({ type: "POPUP_FOR_CLOSE" });
          setTimeout(() => {
            dispatch({
              type: "POPUP_OPEN",
              payload: actionStatets,
            });
          }, 200);
        },
      };
      if (!draft.popupState.btnXClass) {
        draft.popupState.btnXClass = "btn-close-x";
      }
      return draft;

    case "POPUP_FOR_CLOSE":
      draft.popupState.dialogEmersion = "show dialog-emersion-exit";
      return draft;

    case "POPUP_CLOSE":
      draft.popupState = initialState.popupState;
      return draft;

    case "POPUP_CHANGE":
      draft.popupState.mpopClass = action.payload;
      return draft;

    case "ACTIVE_PLATE":
      draft.sAndLStates.activePlate = action.payload;
      return draft;

    case "ACTIVE_TIME":
      draft.sAndLStates.activeTime = action.payload;
      return draft;

    case "ANIM_IN_PROG":
      draft.sAndLStates.animInProgress = action.payload;
      return draft;

    case "ANIM_PORTAL":
      draft.sAndLStates.animPortal = action.payload;
      return draft;

    case "BOOL_STATE":
      draft.booleanState = !draft.booleanState;
      return draft;

    default:
      return draft;
  }
}
