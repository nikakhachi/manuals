interface IAction {
  type: string;
  payload: any;
}

export interface IAuthState {
  open: boolean;
  text: string;
  type: "info" | "success" | "warning" | "error" | undefined;
}

const initialState: IAuthState = {
  open: false,
  text: "",
  type: undefined,
};

export const snackbar = (state = initialState, action: IAction): IAuthState => {
  switch (action.type) {
    case "SNACKBAR_PRINT":
      return {
        ...state,
        open: true,
        type: action.payload.type,
        text: action.payload.text,
      };
    case "SNACKBAR_CLOSE":
      return { ...state, open: false, text: "", type: undefined };
    default:
      return state;
  }
};
