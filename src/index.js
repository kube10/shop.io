import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { theme } from "./theme/theme.js";
import App from "./App";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { StyleReset, ThemeProvider } from "atomize";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <ThemeProvider theme={theme}>
        <StyleReset />
        <App />
      </ThemeProvider>
    </StyletronProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
