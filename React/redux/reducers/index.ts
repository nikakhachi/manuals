import { combineReducers } from "redux";

import { snackbar } from "./snackbar";
import { user } from "./user";

export const rootReducer = combineReducers({ snackbar, user });

export type RootState = ReturnType<typeof rootReducer>;
