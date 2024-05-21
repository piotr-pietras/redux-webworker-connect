type Dependencies = {
    [key: string]: URL;
};
type WorkerInfo = {
    id: string;
    data: any;
    pending: boolean;
};
interface InitialState {
    workers: {
        [key: string]: WorkerInfo;
    };
}
interface Options {
    dependencies: Dependencies;
}
export declare const buildWorkerSlice: <D>({ dependencies }: Options) => {
    workerSlice: import("@reduxjs/toolkit").Slice<InitialState, {}, "@worker", "@worker", import("@reduxjs/toolkit").SliceSelectors<InitialState>>;
    workerActions: {
        exec: import("@reduxjs/toolkit").AsyncThunk<any, {
            id: string;
            func: () => Promise<any>;
        }, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
    };
    buildWorkerFunc: (func: (deps: D) => Promise<any>) => (deps: D) => Promise<any>;
};
export {};
