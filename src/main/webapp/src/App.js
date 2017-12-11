import React from "react";
import { BrowserRouter } from "react-router-dom";
import PrimaryLayout from "./layouts/PrimaryLayout";

const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
);

export default App;
