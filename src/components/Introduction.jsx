<<<<<<< HEAD
import React from "react";
import "../assets/styles/Introduction.css";

function Introduction() {
  return <div></div>;
}

export default Introduction;
=======
import React from 'react'
import styles from './Introduction.module.css'
import battleshipgame from '../assets/images/battleshipgame.jpg'
import Gamearrangement from '../assets/images/Gamearrangement.jpg'
function Introduction() {
  return (
    <div>
      <section className={styles.container}>
        <hr className={styles.horizontalLine}/>
        <p><strong>OBJECTIVE: </strong> Sink all five of your opponents’ ships first!</p>
            <p><strong>NUMBER OF PLAYERS: </strong> 2 players</p>
            <p><strong>MATERIALS: </strong> 2 game boards, 10 ships, red pegs, white pegs</p>
            <p><strong>TYPE OF GAME: </strong> Strategy board game</p>
            <hr className={styles.horizontalLine}></hr>
            <h2>Introduction to Battleship</h2>
            <p>
                Battleship has been a popular game for generations, having inspired multiple board games, handheld electronic versions, computer games, and even a film. 
            
                However, after all those versions and rule changes, the game is still simple enough to be played with only graph paper and pens. In this tutorial, we’ll teach you the rules for the classic board game and the old-school graph paper version. Stay safe out there on the open seas!
            </p>
            <img src={battleshipgame} alt="Battlesip Game" className={styles.gameimage} />;

        </section>
        <section className={styles.container}>
            <h2>Step-by-Step Process to Play</h2>
            <div className={styles.step}>
            <h3>Step 1: Players sit opposite each other</h3>
            <p>The standard Battleship board game set comes with two boxes, one for each player. Each box opens to reveal two grids, one on each inside surface. As you set up, make sure you and your opponent are seated opposite one another so you can’t see the inside of one another’s boxes.</p>
            <img src={Gamearrangement} alt='Game arrangement' className={styles.gameimage} />;
            </div>
        </section>
    </div>
  )
}

export default Introduction
>>>>>>> main
