interface IAction {
  type: string;
  payload: any;
}

export interface IUser {
  clientFields: any;
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  countryCode: string | null;
  phone: string | null;
  password: string;
  token: string;
  companyDetails: any;
}

export interface IUserState {
  isAuthorized: boolean;
  isLoaded: boolean;
  user: IUser | null;
}

const initialState = {
  isAuthorized: false,
  isLoaded: false,
  user: null,
};

export const user = (state: IUserState = initialState, action: IAction): IUserState => {
  switch (action.type) {
    case "LOGIN":
      if (!localStorage.getItem("jwt")) localStorage.setItem("jwt", action.payload.token);
      return {
        ...state,
        isAuthorized: true,
        isLoaded: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("jwt");
      return {
        ...state,
        isAuthorized: false,
        isLoaded: true,
        user: null,
      };
    case "UPDATE":
      if (!localStorage.getItem("jwt")) localStorage.setItem("jwt", action.payload.token);
      return {
        ...state,
        isAuthorized: true,
        isLoaded: true,
        user: action.payload,
      };
    default:
      return state;
  }
};
