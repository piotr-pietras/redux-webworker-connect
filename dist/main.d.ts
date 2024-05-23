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
    workers: {
        [key: string]: WorkerInfo;
    };
}
export declare const buildWorkerSlice: <D>() => {
    slice: import("@reduxjs/toolkit").Slice<InitialState, {}, "@worker", "@worker", import("@reduxjs/toolkit").SliceSelectors<InitialState>>;
    actions: {
        exec: import("@reduxjs/toolkit").AsyncThunk<any, ExecPayload, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
    };
};
export {};
