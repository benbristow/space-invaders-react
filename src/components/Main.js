require("normalize.css")
require("styles/App.css");

import React, { Component } from "react";
import { Loop, Stage, World, KeyListener } from "react-game-kit";
import { observer } from "mobx-react";

import GameStore from "../stores/GameStore";
import Player from "./Player";
import Bullets from "./Bullets";

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.keyListener = new KeyListener();
  }

  componentDidMount() {
    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.SPACE
    ]);
  }

  render() {
    return (
        <Loop>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <World>
              <Bullets store={GameStore} />
              <Player store={GameStore} keys={this.keyListener} />
            </World>
          </Stage>
        </Loop>
    );
  }
}
