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
import Sink from "./Step5/SinkSimulation"

import EndGame from "./components/EndGame";
import HitAttackSimulation from "./components/HitAttackSimulation";

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
      <HeaderComponent />
      <Introduction />
      
      <Step2 />
      <ArrangingShips />
      <Step4 />
      <HitAttackSimulation/>
      <AttackSimulation />
      <Sink/>
      <EndGame />
      <FooterComponent />
    </>
  );
}

export default App;
