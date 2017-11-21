require("normalize.css");
require("styles/App.css");


import React, { Component } from "react";
import { KeyListener } from "react-game-kit";
import { observer } from "mobx-react";

import GameStore from "../stores/GameStore";
import Game from "./Game";

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.keyListener = new KeyListener();
    GameStore.resetAll();
  }

  componentDidMount() {
    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.SPACE
    ]);
  }

  render() {
    switch(GameStore.state) {
      case "alive":
        return (<Game store={GameStore} keyListener={this.keyListener} />);
      case "won":
        return (
          <div className="won">
            <h1>You win!</h1>
            <p>You scored <strong>{GameStore.score}</strong> points</p>
            <button onClick={() => GameStore.resetAll()}>Reset Game</button>
          </div>
        );
    }
  }
}
