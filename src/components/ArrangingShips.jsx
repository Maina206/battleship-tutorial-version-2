import BattleshipGrid from "./BattleshipGrid";
import BattleshipPinGrid from "./BattleshipPinGrid";
import "../assets/styles/arrangingships.css";

const ArrangingShipsPage = () => {
  return (
    <div id="step3" className="container">
      <h3>Step 3: Arrange your ships secretly</h3>
      <p>
        With the boxes open, you and your opponent must place your 5 ships on
        the lower grid of your boxes, anchoring each ship into the holes on the
        grid. Don't look at what your opponent is doing, and make sure they
        can't see your ship configuration either. Follow these rules while
        placing your ships:
      </p>

      <div className="sub-step">
        <h4>Rules of Placement</h4>
        <ol>
          <li>
            Ships can be placed horizontally or vertically, but not diagonally.
          </li>
          <li>You must place all five ships on the grid.</li>
          <li>
            Every ship must be completely on the grid. No ship can hang off the
            edge of the board.
          </li>
          <li>Ships cannot overlap each other.</li>
          <li>
            Once your ships are placed and the game has begun, you cannot move
            them again.
          </li>
        </ol>
      </div>

      <div className="sub-step">
        <h4>How to arrange your ships</h4>
        <div className="players">
          <div>
            <h5>Player Battleship Board</h5>
            <BattleshipGrid gridId="gameBoard" />
          </div>
          <div>
            <h5>Player Pins Board</h5>
            <BattleshipPinGrid gridId="pinBoard" />
          </div>
        </div>
        <p>
          In Battleship, each player has two boards. On the{" "}
          <strong>left board</strong>, players secretly arrange their ships
          either horizontally or vertically, ensuring that the ships do not
          overlap and remain within the grid boundaries.
        </p>
        <p>
          The <strong>right board</strong> right board is used to track attacks,
          where players place pins at specific coordinates to target their
          opponent ships.
        </p>
        <p>
          The objective is to deduce the locations of the hidden ships. Players
          take turns calling out coordinates, marking hits or misses as they go.
          A ship is considered sunk when all its sections have been hit. The
          game continues until one player successfully sinks all of their
          opponent ships, leading to victory.
        </p>
      </div>
    </div>
  );
};

export default ArrangingShipsPage;
