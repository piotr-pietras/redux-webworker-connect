import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { worker } from "./services/redux/worker";

const { exec } = worker.actions;

const func = () => {
  const size = Math.pow(10, 8);
  let sum = 0;
  for (let i = 0; i < size; i++) {
    sum += Math.random();
  }
  return Promise.resolve(sum);
};

const func2 = (modules: any) => {
  const id = modules.v4();
  return Promise.resolve(id);
};

const func3 = () => {
  return new Promise((resolve) => {
    const logoURL =
      "https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png";
    fetch(logoURL).then((res) => {
      res.blob().then((v) => {
        resolve(v);
      });
    });
  });
};

export const App = () => {
  const dispatch = useDispatch<any>();
  const test1 = useSelector((s: any) => worker.selectors.byId(s, "1"));
  const test2 = useSelector((s: any) => worker.selectors.byId(s, "2"));
  const test3 = useSelector((s: any) => worker.selectors.byId(s, "3"));

  return (
    <div className="container">
      <div>
        <button
          onClick={() => {
            dispatch(exec({ id: "1", func: func }));
          }}
        >
          test1
        </button>
        {test1 ? (
          <>
            {test1.pending ? (
              <div>pending...</div>
            ) : (
              <div>fullfiled: {test1.data}</div>
            )}
          </>
        ) : (
          <div>idle</div>
        )}
      </div>

      <div>
        <button
          onClick={() => {
            dispatch(exec({ id: "2", func: func2 }));
          }}
        >
          test2
        </button>
        {test2 ? (
          <>
            {test2.pending ? (
              <div>pending...</div>
            ) : (
              <div>fullfiled: {test2.data}</div>
            )}
          </>
        ) : (
          <div>idle</div>
        )}
      </div>

      <div>
        <button
          onClick={() => {
            dispatch(exec({ id: "3", func: func3 }));
          }}
        >
          test3
        </button>
        {test3 ? (
          <>
            {test3.pending ? (
              <div>pending...</div>
            ) : (
              <div>fullfiled: {test3.data?.toString()}</div>
            )}
          </>
        ) : (
          <div>idle</div>
        )}
      </div>
    </div>
  );
};
