import React, { useEffect, useState } from 'react';
import UseShips from './UseShips';
import Grid from './Grid';
import  './AttackSimulation.module.css';
import '../assets/styles/hitattacksimulation.css'

function HitAttackSimulation() {
  const { ships } = UseShips(); // Load ships for Player 1's grid
  const [attackedCells, setAttackedCells] = useState([]); // Track cells attacked for both grids
  const rows = 10;
  const cols = 10;

  // Helper function to check if a cell contains a ship and has not been attacked
  const isShipPresentAndNotAttacked = (row, col) => {
    const isAttacked = attackedCells.some(cell => cell.row === row && cell.col === col);
    const isShipPresent = Object.values(ships).some(ship =>
      ship.positions.some(position => position.row === row && position.col === col)
    );
    return !isAttacked && isShipPresent;
  };

  // Function to initiate an attack that always hits a ship
  const initiateHitAttack = () => {
    const hitCells = [];

    // Gather all ship cells that haven't been attacked yet
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (isShipPresentAndNotAttacked(row, col)) {
          hitCells.push({ row, col });
        }
      }
    }

    // Select a random cell that contains a ship (hit)
    if (hitCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * hitCells.length);
      const selectedCell = hitCells[randomIndex];

      // Mark the cell as attacked (hit)
      setAttackedCells(prev => [...prev, selectedCell]);
    }
  };

  useEffect(() => {
    // Start the first attack after 5 seconds
    const initialAttackTimeout = setTimeout(() => {
      initiateHitAttack(); // Start the first hit attack
      // Start a continuous attack every 3 seconds after the first one
      const attackInterval = setInterval(initiateHitAttack, 1000);

      // Clear the interval when the component unmounts
      return () => clearInterval(attackInterval);
    }, 2000);

    // Clear the initial timeout if the component unmounts
    return () => clearTimeout(initialAttackTimeout);
  }, [attackedCells, ships]);

  return (
    <div className="container" id='step5'>
      <h3>Attack Simulation (Hit Scenario)</h3>
      <p>In the hit scenario, players take turns attempting to strike their opponent's ships. When a player selects a coordinate to attack, the game checks if there is a ship located at that coordinate. 
                                        If there is a ship present, the attack is considered a hit, and the corresponding part of the ship is marked. 
                                        A visual indication (such as a red color) shows that the attack was successful. 
                                        Conversely, if no ship is present, the attack is marked as a miss (typically shown in gray). 
                                        The game continues until all of one player's ships are sunk, declaring the other player as the winner. Below this explanation there are two grids one for "player 1's battleship grid board "and the other for "player 2's battleship pin board", Below is a simulation that shows a hit scenario;</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {/* Player 1 Grid with Ships */}
        <Grid
          elementID="player1"
          onCellClick={() => {}}
          ships={ships} // Display ships on Player 1's grid
          showShips={true} // Show ships on Player 1's grid
          attackedCells={attackedCells} // Display attacked cells
        />

        {/* Player 2 Grid with no Ships */}
        <Grid
          elementID="player2"
          onCellClick={() => {}}
          ships={{}} // Empty grid for Player 2 (no ships)
          showShips={false} // No ships on Player 2's grid
          attackedCells={attackedCells} // Display attacked cells
        />
      </div>
    </div>
  );
}

export default HitAttackSimulation;