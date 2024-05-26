## webworker-redux-connected

🚧**Beta version not suitable for productin!**🚧

Easy to use Web Worker connected with Redux.

- Webpack ✅
- Rollup (Vite) ✅
- other boundlers ❔❔❔ (testing)

## Install

**1)** `npm i redux-webworker-connected`

**2)** You need to create a file that would be an entry point for a bundler to create chunks of modules for worker. Let's create `src/worker.modules.ts`.

> ℹ️ Note: If you don't use TS it may have .js exstension.

**3)** Let's add an alias for the bundler that can easily find this module file.
**for Webpack open webpack.config.js**

```js script
module.exports = {
  (...)
  module: {
    (...)
    alias: {
      //ℹ️ Note: Alies name must be exactly "worker.modules"
      "worker.modules": path.resolve(__dirname, "src/worker.modules.ts"),
    },
  },
};
```

**for Vite open vite.config.js**

```js script
export default defineConfig({
  (...)
  resolve: {
    (...)
    alias: {
      //ℹ️ Note: Alies name must be exactly "worker.modules"
      "worker.modules": path.resolve(__dirname, "src/worker.modules.ts"),
    },
  },
  optimizeDeps: {
    //ℹ️ Note: It is needed to exclude it from optimizing pre-build since it
    //prevents resolving the file's path correctly.
    exclude: ["webworker-redux-connected"],
  },
})
```

### Run first worker

- Firstly you need to create a worker slice and apply its reducers to the application store

```js script
import { buildWorkerSlice } from "redux-webworker-connected";

export const worker = buildWorkerSlice();
export const store = configureStore({
  reducer: {
    [worker.slice.name]: worker.slice.reducer,
  },
});
```

- Now you are ready to execute some function in the React component

> ℹ️ Note: Async/await syntax is not available yet

```js script
import { worker } from "./store";

const { exec } = worker.actions;
const { byId } = worker.selectors
const func = () => {
  console.log("hello world");
  return new Promise((resolve) => {
    setTimeout(() => resolve("test"), 2000);
  });
};


function App() {
  const dispatch = useDispatch<any>();
  const { data, pending } = useSelector((s: any) => byId(s, "1"));
  const onClick = () => dispatch(exec({ id: "1", func }));

  return (
    <>
      {pending ? <div>pending...</div> : <div>{data}</div>}
      <button onClick={onClick}>test</button>;
    </>
  );
}
```

## Inject modules

Worker is run in a completely different context which is why the worker's function does not have access to anything outside its closure. However, you can statically define modules that should be imported to the worker's context. Then you can easily access those modules that are passed as a function's argument. Bundler does the job for you creating separate chunks for those modules and importing them to the worker context.

- Let's add to our `worker.modules.ts` some modules you would like to use in the worker

```javascript
import { v4 } from "uuid";

const modules = { v4 };

export type WorkerModules = typeof modules;
export default modules;
```

- Now we can use `uuid` library in worker

```js script
import { WorkerModules } from "./worker.modules";

//ℹ️ Note: TODO implicit typing
const func = (modules: WorkerModules) => {
  const id = modules.v4();
  return Promise.resolve(id);
};

(...)
```
