import React, { useEffect, useState } from 'react';
import UseShips from './UseShips';
import Grid from './Grid';
import styles from './AttackSimulation.module.css';

function AttackSimulation() {
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
      const attackInterval = setInterval(initiateHitAttack, 3000);

      // Clear the interval when the component unmounts
      return () => clearInterval(attackInterval);
    }, 5000);

    // Clear the initial timeout if the component unmounts
    return () => clearTimeout(initialAttackTimeout);
  }, [attackedCells, ships]);

  return (
    <div className={styles.container}>
      <h3>Attack Simulation (Hit Scenario)</h3>
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

export default AttackSimulation;
import React, { useEffect, useState } from 'react';
import UseShips from './UseShips'; 
import Grid from './Grid';
import styles from './AttackSimulation.module.css';

function AttackSimulation() {
  const { ships } = UseShips(); 
  const [attackedCells, setAttackedCells] = useState([]); 
  const rows = 10;
  const cols = 10;

  const isCellEmptyAndNotAttacked = (row, col) => {
    const isAttacked = attackedCells.some(cell => cell.row === row && cell.col === col);
    const isShipPresent = Object.values(ships).some(ship =>
      ship.positions.some(position => position.row === row && position.col === col)
    );
    return !isAttacked && !isShipPresent;
  };

  const initiateMissAttack = () => {
    const emptyCells = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 1; col <= cols; col++) {
        if (isCellEmptyAndNotAttacked(row, col)) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const selectedCell = emptyCells[randomIndex];
    

      setAttackedCells(prev => [...prev, selectedCell]);
    }
  };

  useEffect(() => {
    const initialAttackTimeout = setTimeout(() => {
      initiateMissAttack();
      const attackInterval = setInterval(initiateMissAttack, 3000);
      
      return () => clearInterval(attackInterval);
    }, 5000);

    return () => clearTimeout(initialAttackTimeout);
  }, [attackedCells, ships]);

  return (
    <div className={styles.container}>
      <h3>Attack Simulation (Miss Scenario)</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Grid
          elementID="player1"
          onCellClick={() => {}}
          ships={ships} 
          showShips={true} 
          attackedCells={attackedCells} 
        />

        <Grid
          elementID="player2"
          onCellClick={() => {}}
          ships={{}} 
          showShips={false} 
          attackedCells={attackedCells} 
        />
      </div>
    </div>
  );
}

export default AttackSimulation;

