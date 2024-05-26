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
export declare const buildWorkerSlice: () => {
    slice: import("@reduxjs/toolkit").Slice<InitialState, {}, "@worker", "@worker", {
        all: (state: InitialState) => {
            [key: string]: WorkerInfo;
        };
        byId: (state: InitialState, id: any) => WorkerInfo;
    }>;
    actions: {
        exec: import("@reduxjs/toolkit").AsyncThunk<any, ExecPayload, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
    };
    selectors: {
        all: import("reselect").Selector<{
            "@worker": InitialState;
        }, {
            [key: string]: WorkerInfo;
        }, []> & {
            unwrapped: (state: InitialState) => {
                [key: string]: WorkerInfo;
            };
        };
        byId: import("reselect").Selector<{
            "@worker": InitialState;
        }, WorkerInfo, [id: any]> & {
            unwrapped: (state: InitialState, id: any) => WorkerInfo;
        };
    };
};
export {};
