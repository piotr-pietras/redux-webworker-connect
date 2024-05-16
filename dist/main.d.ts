import { PayloadAction } from "@reduxjs/toolkit";
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
export declare const buildWorkerSlice: ({ dependencies }: Options) => {
    workerSlice: import("@reduxjs/toolkit").Slice<InitialState, {
        initialize(state: import("immer").WritableDraft<InitialState>, action: PayloadAction<{
            id: string;
        }>): void;
    }, "@worker", "@worker", import("@reduxjs/toolkit").SliceSelectors<InitialState>>;
    workerActions: {
        exec: import("@reduxjs/toolkit").AsyncThunk<any, {
            id: string;
            func: () => Promise<any>;
        }, import("@reduxjs/toolkit/dist/createAsyncThunk").AsyncThunkConfig>;
    };
};
export {};
