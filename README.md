# Battleship Game

A React-based implementation of the classic Battleship board game, featuring interactive gameplay, ship placement, and attack simulations.

## 🎮 Overview

This project is a modern web implementation of the classic Battleship game, built with React. It features a complete gameplay experience including ship placement, attack mechanics, and game state management, with an emphasis on educational value through step-by-step demonstrations of game mechanics.

## ✨ Features

- Complete game board visualization
- Interactive ship placement system
- Attack simulation (hits and misses)
- Sink ship simulation (all coordinates of a ship are hit)
- Real-time game state tracking
- Step-by-step game play demonstration
- End game scenarios

## 🛠️ Tech Stack

- React
- CSS Modules
- Modern JavaScript (ES6+)

## 🏗️ Component Structure

```
src/
├── components/
│   ├── Introduction.jsx        => Game introduction and rules
│   ├── ArrangingShips.jsx     => Ship placement interface
│   ├── AttackSimulation.jsx   => Miss attack demonstration
│   ├── HitAttackSimulation.jsx => Hit attack demonstration
│   ├── Grid.jsx              => Reusable game grid component
│   ├── BattleshipGrid.jsx    => Main game board
│   ├── BattleshipPinGrid.jsx => Pin tracking board
│   ├── EndGame.jsx           => Game completion handling
│   └── UseShips.jsx          => Ship state management hook
│   └── step 5 - Grille.jsx SinkSimulation.jsx UseShips.jsx => Sink ship demonstration
│   └── Step 2 => Game content
│   └── step 4 => Game content
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Clone the repository

```bash
git clone https://github.com/Maina206/battleship-tutorial-version-2
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

## 🎯 Game Rules

### Objective

Sink all five of your opponent's ships before they sink yours!

### Ships

- Aircraft Carrier (5 spaces)
- Battleship (4 spaces)
- Cruiser (3 spaces)
- Submarine (3 spaces)
- Destroyer (2 spaces)

### Placement Rules

1. Ships can be placed horizontally or vertically
2. Ships cannot overlap
3. Ships must be placed entirely within the grid
4. Once placed, ships cannot be moved

### Gameplay

1. Players take turns calling out coordinates
2. Coordinates are marked as either hits or misses
3. When all positions of a ship are hit, the ship is sunk
4. First player to sink all opponent's ships wins

## 🎨 Component Details

### Introduction

- Displays game rules and initial setup
- Shows required materials and player count
- Includes visual guides for game setup

### ArrangingShips

- Handles ship placement phase
- Enforces placement rules
- Provides visual feedback for valid/invalid placements

### AttackSimulation & HitAttackSimulation

- Demonstrates attack mechanics
- Shows hit/miss scenarios
- Provides visual feedback for attacks

### SinkSimulation

- Demonstrates attack mechanics
- Shows hit scenarios
- Provides visual feedback for sinking a ship

### Grid System

- Implements core game board functionality
- Handles coordinate system
- Manages ship and pin visualization

### EndGame

- Manages game completion logic
- Handles win/lose conditions
- Provides game reset functionality

## 🎮 How to Play

1. Start a new game session
2. Place your ships following the placement rules
3. Take turns attacking coordinates on the opponent's grid
4. Mark hits and misses on your tracking grid
5. Continue until one player's ships are all sunk

## 🔧 Development

### Project Structure

```
battleship/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   └── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

### Adding New Features

1. Create new components in the `components` directory
2. Add styles in the `assets/styles` directory
3. Update the main App.jsx to incorporate new components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
