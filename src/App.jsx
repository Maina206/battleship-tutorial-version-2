import { useEffect, useState } from "react";
import "./App.css";
import Introduction from "./components/Introduction";
import Grid from "./components/Grid";
import UseShips from "./components/UseShips";
import AttackSimulation from "./components/AttackSimulation";


function App() {
  const { ships, placeShip} = UseShips();

  useEffect(() => {
    placeShip('Aircraft Carrier', 'D-3', 'horizontal');
    placeShip('Battleship', 'F-6', 'vertical');
    placeShip('Cruiser', 'F-9', 'vertical');
    placeShip('Submarine', 'J-3', 'horizontal');
    placeShip('Destroyer', 'B-7', 'horizontal');
  }, [placeShip]
);
  return (
    <>
      <h1>Hello I'm the battleship tutorial</h1>
      <h2>This is our Battleship project turned to react!</h2>
      <Introduction />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Grid elementID="player1" onCellClick={() => console.log('Player 1 Grid Clicked')} />
        <Grid elementID="player2" onCellClick={() => console.log('Player 2 Grid Clicked')} ships={ships} showShips={true} />
          <AttackSimulation />
      </div>
      
    </>
  );
}

export default App;
