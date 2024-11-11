import { useState } from "react";
import "./App.css";
import ArrangingShips from "./components/ArrangingShips";


function App() {
  return (
    <>
      <h1>Hello I'm the battleship tutorial</h1>
      <h2>This is our Battleship project turned to react!</h2>

      <ArrangingShips />
      <Introduction />
    </>
  );
}

export default App;
