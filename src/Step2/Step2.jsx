import styles from "./Step2.module.css";

function Step2() {
  return (
    <>
      <div className="container">
        <h3>Step 2: Ensure you have all the ships</h3>
        <p>
          In Battleship, ships come in various lengths, taking up a different
          number of squares on the grid. You and your opponent should both have
          identical collections with 5 ships each as well as plenty of white and
          red pegs. The typical 5 ships include
        </p>

        <ul>
          <li>
            The aircraft carrier -five squares long denoted by{" "}
            <strong>A*</strong>
          </li>
          <li>
            The battleship - four squares long denoted by <strong>B*</strong>
          </li>
          <li>
            The cruiser - three squares long denoted by <strong>C*</strong>
          </li>
          <li>
            The submarine - three squares long, same as the cruiser denoted by{" "}
            <strong>S*</strong>
          </li>
          <li>
            The destroyer - two squares long denoted by <strong>D*</strong>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Step2;
