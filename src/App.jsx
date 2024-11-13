import { useEffect, useState } from "react";
import "./App.css";

import Introduction from "./components/Introduction";
import UseShips from "./components/UseShips";
import AttackSimulation from "./components/AttackSimulation";

import Step2 from "./Step2/Step2";
import Step4 from "./Step4/Step4";

import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./Footer/FooterComponent";
import ArrangingShips from "./components/ArrangingShips";

import EndGame from "./components/EndGame";

function App() {
  const {placeShip} = UseShips();

  useEffect(() => {
    placeShip('Aircraft Carrier', 'D-3', 'horizontal');
    placeShip('Battleship', 'F-6', 'vertical');
    placeShip('Cruiser', 'F-9', 'vertical');
    placeShip('Submarine', 'J-3', 'horizontal');
    placeShip('Destroyer', 'B-7', 'horizontal');
  }, [placeShip]
)
  return (
    <>
      <h1>Hello I'm the battleship tutorial</h1>
      <h2>This is our Battleship project turned to react!</h2>
      <HeaderComponent />
      <Introduction />
      <AttackSimulation />
      
      <Step2 />
      <ArrangingShips />
      <Step4 />
      <EndGame />
      <FooterComponent />
    </>
  );
}

export default App;
