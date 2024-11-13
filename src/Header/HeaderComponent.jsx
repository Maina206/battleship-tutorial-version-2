import "./Header.css";
import BattleshipLogo from "../assets/images/BattleshipLogo.png";

function HeaderComponent() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <img src={BattleshipLogo} alt="BattleShip Logo" />
        </div>
        <h1 id="heading">BattleShip Tutorial</h1>
        <div className="dropdown">
          <button className="menu-button">Menu</button>
          <div className="dropdown-content">
            <a href="#introduction">Introduction</a>
            <a href="#step1">Step 1</a>
            <a href="#step2">Step 2</a>
            <a href="#step3">Step 3</a>
            <a href="#step4">Step 4</a>
            <a href="#step5">Step 5</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
