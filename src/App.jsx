import { useState } from "react";
import "./App.css";
import Step2 from "./Step2/Step2";
import Step4 from "./Step4/Step4";

import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./Footer/FooterComponent";
import ArrangingShips from "./components/ArrangingShips";
import Introduction from "./components/Introduction";

function App() {
  return (
    <>
      <h1>Hello I'm the battleship tutorial</h1>
      <h2>This is our Battleship project turned to react!</h2>
      <HeaderComponent />
      <Introduction />
      <Step2 />
      <ArrangingShips />
      <Step4 />
      <FooterComponent />
    </>
  );
}

export default App;
