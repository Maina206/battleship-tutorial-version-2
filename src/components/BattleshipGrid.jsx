import React, { useState, useEffect } from "react";

const BattleshipGrid = ({ gridId }) => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [shipLocations, setShipLocations] = useState([]);

  const shipPlacements = [
    { letter: "C", number: 3, size: 5, direction: "right" },
    { letter: "E", number: 5, size: 4, direction: "down" },
    { letter: "F", number: 9, size: 3, direction: "down" },
    { letter: "I", number: 2, size: 3, direction: "right" },
    { letter: "A", number: 2, size: 2, direction: "right" },
  ];

  useEffect(() => {
    let newShipLocations = [];

    shipPlacements.forEach((ship) => {
      const letterIndex = letters.indexOf(ship.letter);

      for (let i = 0; i < ship.size; i++) {
        if (ship.direction === "right") {
          newShipLocations.push({
            letter: ship.letter,
            number: ship.number + i,
          });
        } else {
          newShipLocations.push({
            letter: letters[letterIndex + i],
            number: ship.number,
          });
        }
      }
    });

    setShipLocations(newShipLocations);
  }, []);

  const hasShip = (letter, number) => {
    return shipLocations.some(
      (pos) => pos.letter === letter && pos.number === number
    );
  };

  const makeGrid = () => {
    const allSquares = [];

    allSquares.push(<div key="corner" className="cell label" />);

    numbers.forEach((num) => {
      allSquares.push(
        <div key={`top-${num}`} className="cell label">
          {num}
        </div>
      );
    });

    letters.forEach((letter) => {
      allSquares.push(
        <div key={`row-${letter}`} className="cell label">
          {letter}
        </div>
      );

      numbers.forEach((num) => {
        const hasShipHere = hasShip(letter, num);
        allSquares.push(
          <div
            key={`${letter}${num}`}
            className="cell"
            data-coordinate={`${letter}-${num}`}
            style={{ backgroundColor: hasShipHere ? "white" : undefined }}
          >
            {hasShipHere && <span>🚢</span>}
          </div>
        );
      });
    });

    return allSquares;
  };

  return (
    <div id={gridId} className="grid">
      {makeGrid()}
    </div>
  );
};

export default BattleshipGrid;
