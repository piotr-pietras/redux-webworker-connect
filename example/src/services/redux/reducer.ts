import { worker } from "./worker";

export const reducer = {
  [worker.slice.name]: worker.slice.reducer,
};
