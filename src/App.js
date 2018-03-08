import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import Game from './Components/Game';

import GameStore from './Stores/GameStore';

// Initialize game
GameStore.newGame();
GameStore.addNewPlayer("Henrik", "red");
GameStore.addNewPlayer("Tuomas", "green");
GameStore.addNewPlayer("Teo", "blue");
GameStore.addNewPlayer("Mikko", "yellow");
GameStore.setActivePlayerByIndex(0);

class App extends Component {
  render() {


    return (
      <div className="App">
          <Game />
      </div>
    );
  }
}

export default App;
