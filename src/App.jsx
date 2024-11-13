import { useState } from "react";
import "./App.css";
import Step2 from "./Step2/Step2";
import Step4 from "./Step4/Step4";

import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./Footer/FooterComponent";
import ArrangingShips from "./components/ArrangingShips";
import Introduction from "./components/Introduction";
import EndGame from "./components/EndGame";

function App() {
  return (
    <>
      <HeaderComponent />
      <Introduction />
      <Step2 />
      <ArrangingShips />
      <Step4 />
      <EndGame />
      <FooterComponent />
    </>
  );
}

export default App;
