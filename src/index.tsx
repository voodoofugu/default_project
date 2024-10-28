import React from "react";

import { createRoot } from "react-dom/client";
import App from "./components/App";

const root = document.getElementById("root");

if (!root) {
  throw new Error('Element with id "root" not found');
}

const reactRoot = createRoot(root);
reactRoot.render(<App />);
