import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { buildWorkerSlice } from "./dist/main";

export const { workerSlice, workerActions, buildWorkerFunc } =
  buildWorkerSlice<{
    uuid: { v4: (text: string) => string };
  }>({
    dependencies: { uuid: new URL("uuid", import.meta.url) },
  });

export const store = configureStore({
  reducer: {
    [workerSlice.name]: workerSlice.reducer
  },
});

const state = store.getState();
export type State = typeof state;
