## webworker-redux-connected

🚧**Beta version not suitable for productin!**🚧

- webpack ✅
- vite ❌
- other boundlers/frameworks ❔❔❔

### Install

`npm i redux-webworker-connected`

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
