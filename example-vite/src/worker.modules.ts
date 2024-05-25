import { v4 } from "uuid";

const modules = { v4 };

export type WorkerModules = typeof modules;
export default modules;
