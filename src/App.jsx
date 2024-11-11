import { useState } from "react";
import "./App.css";

import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./Footer/FooterComponent";
import ArrangingShips from "./components/ArrangingShips";
import Introduction from "./components/Introduction"

function App() {
  return (
    <>
    <h1>Hello I'm the battleship tutorial</h1>
      <h2>This is our Battleship project turned to react!</h2>
    <HeaderComponent/>
    <Introduction />
    <ArrangingShips />
    <FooterComponent/>
    </>
  );
}

export default App;
