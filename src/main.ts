import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

type Dependencies = { [key: string]: URL };
type WorkerInfo = {
  id: string;
  data: any;
  pending: boolean;
};
interface InitialState {
  workers: { [key: string]: WorkerInfo };
}

interface Options {
  dependencies: Dependencies;
}

let workerQue: { [keys: string]: Worker } = {};

export const buildWorkerSlice = <D>({ dependencies }: Options) => {
  const name = "@worker";
  const initialState: InitialState = {
    workers: {},
  };
  let deps = {} as D;
  Object.keys(dependencies).forEach((key) => {
    deps = { ...deps, [key]: dependencies[key].href };
  });

  const workerSlice = createSlice({
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
        const { data } = action.payload;
        state.workers[id] = {
          ...state.workers[id],
          pending: false,
          data,
        };
      });
    },
    reducers: {},
  });

  const exec = createAsyncThunk(
    `${name}/exec`,
    async ({ id, func }: { id: string; func: () => Promise<any> }) => {
      if (workerQue[id]) {
        workerQue[id].terminate();
        delete workerQue[id];
      }
      const worker = buildWorker();
      workerQue[id] = worker;
      return new Promise<any>((resolve) => {
        worker.onmessage = function (e) {
          worker.terminate();
          resolve(e);
        };
        worker.postMessage([stringify(func), deps]);
      });
    }
  );

  const buildWorkerFunc = (func: (deps: D) => Promise<any>) => {
    return func;
  };

  return { workerSlice, workerActions: { exec }, buildWorkerFunc };
};
