import { buildWorkerSlice } from "webworker-redux-connected";

export const worker = buildWorkerSlice();

export const buildWorkerFunc = (func: () => Promise<any>) => {
  return func;
};
