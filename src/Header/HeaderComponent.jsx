import './Header.css'


function HeaderComponent(){
    return(
        <>
        <header>
        <div className="container" id="navigation">
            <h1>BattleShip Tutorial</h1>
            <div className="dropdown">
                <button className="simulateGame">Select a Step</button>
                <div className="dropdown-content">
                    <a href="#introduction">Introduction</a>
                    <a href="#step1">Step 1</a>
                    <a href="#step2">Step 2</a>
                    <a href="#step3">Step 3</a>
                    <a href="#step4">Step 4</a>
                    <a href="#step5">Step 5</a>
                </div>
            </div>
        </div>
    </header>
</>
        
    )
}
export default HeaderComponent;