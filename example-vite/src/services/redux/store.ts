import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

export const store = configureStore({
  reducer,
});

export const state = store.getState();
export type State = typeof state;

export const dispatch = store.dispatch;
