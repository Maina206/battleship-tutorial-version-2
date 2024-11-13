<<<<<<< HEAD


=======
>>>>>>> 0a9c3ccd48f13d6ab5b7ebc63cff48f897c5bfce
import { useEffect, useState } from "react";
import "./App.css";

import Introduction from "./components/Introduction";
import Grid from "./components/Grid";
import UseShips from "./components/UseShips";
import AttackSimulation from "./components/AttackSimulation";
<<<<<<< HEAD
=======

>>>>>>> 0a9c3ccd48f13d6ab5b7ebc63cff48f897c5bfce
import Step2 from "./Step2/Step2";
import Step4 from "./Step4/Step4";

import HeaderComponent from "./Header/HeaderComponent";
import FooterComponent from "./Footer/FooterComponent";
import ArrangingShips from "./components/ArrangingShips";
<<<<<<< HEAD
=======

>>>>>>> 0a9c3ccd48f13d6ab5b7ebc63cff48f897c5bfce
import EndGame from "./components/EndGame";

function App() {
  const { ships, placeShip} = UseShips();

  useEffect(() => {
    placeShip('Aircraft Carrier', 'D-3', 'horizontal');
    placeShip('Battleship', 'F-6', 'vertical');
    placeShip('Cruiser', 'F-9', 'vertical');
    placeShip('Submarine', 'J-3', 'horizontal');
    placeShip('Destroyer', 'B-7', 'horizontal');
  }, [placeShip]
<<<<<<< HEAD
);
=======
)
>>>>>>> 0a9c3ccd48f13d6ab5b7ebc63cff48f897c5bfce
  return (
    <>
      <h1>Hello I'm the battleship tutorial</h1>
      <h2>This is our Battleship project turned to react!</h2>
      <HeaderComponent />
      <Introduction />
<<<<<<< HEAD
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Grid elementID="player1" onCellClick={() => console.log('Player 1 Grid Clicked')} />
        <Grid elementID="player2" onCellClick={() => console.log('Player 2 Grid Clicked')} ships={ships} showShips={true} />
          <AttackSimulation />
      </div>
=======
      <AttackSimulation />
>>>>>>> 0a9c3ccd48f13d6ab5b7ebc63cff48f897c5bfce
      
      <Step2 />
      <ArrangingShips />
      <Step4 />
      <EndGame />
      <FooterComponent />
    </>
  );
}

export default App;