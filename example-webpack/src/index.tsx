import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./services/redux/store";

const container = document.getElementById("react-app");
const root = createRoot(container);

root.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
