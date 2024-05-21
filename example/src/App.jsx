import "./App.css";
import { useDispatch } from "react-redux";
import { workerActions, buildWorkerFunc } from "./store";
import { useSelectWorker } from "./selector";

const { exec } = workerActions;
const testFunc1 = buildWorkerFunc(async ({ uuid }) => {
  const someId = uuid.v4("someId");
  console.log(someId);
  const size = Math.pow(10, 8);
  let sum = 0;
  for (let i = 0; i < size; i++) {
    sum += Math.random();
  }
  return sum;
});

async () => {
  const size = Math.pow(10, 8);
  let sum = 0;
  for (let i = 0; i < size; i++) {
    sum += Math.random();
  }
  return Promise.resolve(sum);
};

function App() {
  const dispatch = useDispatch();
  const worker = useSelectWorker("1");

  return (
    <div className="container">
      <button
        onClick={() => {
          dispatch(exec({ id: "1", func: testFunc1 }));
        }}
      >
        test
      </button>
      {worker ? (
        <>
          {worker.pending ? (
            <div>pending...</div>
          ) : (
            <div>fullfiled: {worker.data}</div>
          )}
        </>
      ) : (
        <div>idle</div>
      )}
    </div>
  );
}

export default App;
