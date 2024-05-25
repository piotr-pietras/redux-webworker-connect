## webworker-redux-connected

🚧**Beta version not suitable for productin!**🚧

- Webpack ✅
- Rollup (Vite) ✅
- other boundlers ❔❔❔ (testing)

## Install

**1)** `npm i redux-webworker-connected`

**2)** We need to create file that would be entry point for boundler to create chunks of modules for worker. Let's create it `src/worker.modules.ts`.

> Note: If you don't use TS it may have js exstension.

**3)** Let's add alias for the boundler that can easily find this module file.
**for Webpack open webpack.config.js**

```js script
module.exports = {
  (...)
  module: {
    (...)
    alias: {
      //Note: Alies name must be exactly "worker.modules"
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
      //Note: Alies name must be exactly "worker.modules"
      "worker.modules": path.resolve(__dirname, "src/worker.modules.ts"),
    },
  },
  optimizeDeps: {
    //Note: It is needed to exclude it from optimize pre-build since it 
    //prevents to resolve file's path correctly.
    exclude: ["webworker-redux-connected"],
  },
})
```

### Quick start

- Firstly we need to create worker slice and applies its reducers to application store

```js script
import { buildWorkerSlice } from "redux-webworker-connected";

export const worker = buildWorkerSlice();
export const store = configureStore({
  reducer: {
    [worker.slice.name]: worker.slice.reducer,
  },
});
```

- Now we are ready to execute some function in react component

```js script
import { worker } from "./store";

const { exec } = worker.actions;
const func = () => {
  console.log("hello world");
  return Promise.resolve("someValue");
};

function App() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(exec({ id: "1", func }))}>test</button>
  );
}
```
