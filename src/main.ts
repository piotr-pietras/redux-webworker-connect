import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const stringify = function (obj: any) {
  return JSON.stringify(obj, function (_, value) {
    if (value instanceof Function || typeof value == "function") {
      let fnBody = value.toString();
      if (fnBody.length < 8 || fnBody.substring(0, 8) !== "function") {
        //this is ES6 Arrow Function
        return "_NuFrRa_" + fnBody;
      }
      return fnBody;
    }
    return value;
  });
};

const buildWorker = function () {
  if (typeof Worker === "undefined") {
    throw "Web worker is not supported";
  }
  return new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });
};

type WorkerInfo = {
  id: string;
  data: any;
  pending: boolean;
};
interface ExecPayload {
  id: string;
  func: (modules?: unknown) => Promise<any>;
}
interface InitialState {
  workers: { [key: string]: WorkerInfo };
}

let workerQue: { [keys: string]: Worker } = {};

export const buildWorkerSlice = <D>() => {
  const name = "@worker";
  const initialState: InitialState = {
    workers: {},
  };

  const slice = createSlice({
    initialState,
    name,
    extraReducers: (builder) => {
      builder.addCase(exec.pending, (state, action) => {
        const { id } = action.meta.arg;
        state.workers[id] = {
          id,
          pending: true,
          data: null,
        };
      });
      builder.addCase(exec.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        const data = action.payload;
        state.workers[id] = {
          ...state.workers[id],
          pending: false,
          data,
        };
      });
    },
    reducers: {},
    selectors: {
      all: (state) => state.workers,
      byId: (state, id) => state.workers[id],
    },
  });

  const exec = createAsyncThunk(
    `${name}/exec`,
    async ({ id, func }: ExecPayload) => {
      if (workerQue[id]) {
        workerQue[id].terminate();
        delete workerQue[id];
      }
      const worker = buildWorker();
      workerQue[id] = worker;
      return new Promise<any>((resolve) => {
        worker.onmessage = function (e) {
          worker.terminate();
          resolve(e.data);
        };
        worker.postMessage([stringify(func)]);
      });
    }
  );

  return { slice, actions: { exec }, selectors: slice.selectors };
};
