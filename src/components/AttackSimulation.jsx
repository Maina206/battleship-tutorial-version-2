import React, { useEffect, useState } from 'react';
import UseShips from './UseShips'; 
import Grid from './Grid';
import styles from './AttackSimulation.module.css';

function AttackSimulation() {
  const { ships } = UseShips(); // Load ships for Player 1's grid
  const [attackedCells, setAttackedCells] = useState([]); // Track cells attacked for both grids
  const rows = 10;
  const cols = 10;

  // Helper function to check if a cell is empty and hasn't been attacked
  const isCellEmptyAndNotAttacked = (row, col) => {
    const isAttacked = attackedCells.some(cell => cell.row === row && cell.col === col);
    const isShipPresent = Object.values(ships).some(ship =>
      ship.positions.some(position => position.row === row && position.col === col)
    );
    return !isAttacked && !isShipPresent;
  };

  // Function to initiate an attack that always misses
  const initiateMissAttack = () => {
    const emptyCells = [];

    // Gather all empty, un-attacked cells
    for (let row = 0; row < rows; row++) {
      for (let col = 1; col <= cols; col++) {
        if (isCellEmptyAndNotAttacked(row, col)) {
          emptyCells.push({ row, col });
        }
      }
    }

    // Select a random empty cell for the miss attack
    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const selectedCell = emptyCells[randomIndex];
      
      // Mark the cell as attacked
      setAttackedCells(prev => [...prev, selectedCell]);
    }
  };

  useEffect(() => {
    // Start the first attack after 5 seconds
    const initialAttackTimeout = setTimeout(() => {
      initiateMissAttack();
      // Start a continuous attack every 3 seconds after the first one
      const attackInterval = setInterval(initiateMissAttack, 3000);
      
      // Clear the interval when the component unmounts
      return () => clearInterval(attackInterval);
    }, 5000);

    // Clear the initial timeout if the component unmounts
    return () => clearTimeout(initialAttackTimeout);
  }, [attackedCells, ships]);

  return (
    <div className={styles.container}>
      <h3>Attack Simulation (Miss Scenario)</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {/* Player 1 Grid with Ships */}
        <Grid
          elementID="player1"
          onCellClick={() => {}}
          ships={ships} // Display ships on Player 1's grid
          showShips={true} // Show ships on Player 1's grid
          attackedCells={attackedCells} // Display missed cells
        />

        {/* Player 2 Grid without Ships */}
        <Grid
          elementID="player2"
          onCellClick={() => {}}
          ships={{}} // Empty grid for Player 2 (no ships)
          showShips={false} // No ships on Player 2's grid
          attackedCells={attackedCells} // Display missed cells on Player 2's grid
        />
      </div>
    </div>
  );
}

export default AttackSimulation;

