import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const stringify = function (obj) {
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
let workerQue = {};
export const buildWorkerSlice = () => {
    const name = "@worker";
    const initialState = {
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
    const exec = createAsyncThunk(`${name}/exec`, async ({ id, func }) => {
        if (workerQue[id]) {
            workerQue[id].terminate();
            delete workerQue[id];
        }
        const worker = buildWorker();
        workerQue[id] = worker;
        return new Promise((resolve) => {
            worker.onmessage = function (e) {
                worker.terminate();
                resolve(e);
            };
            worker.postMessage([stringify(func)]);
        });
    });
    return { slice, actions: { exec } };
};
