import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { buildWorkerSlice } from "./dist/main";

export const { workerSlice, workerActions } = buildWorkerSlice({
  dependencies: { uuid: new URL("uuid", import.meta.url) },
});
const reducer = combineReducers({ [workerSlice.name]: workerSlice.reducer });

export const store = configureStore({
  reducer,
});

const state = store.getState();
export type State = typeof state;
