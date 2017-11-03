require("normalize.css")
require("styles/App.css");

import React, { Component } from "react";
import { Loop, Stage, World, KeyListener } from "react-game-kit";

import GameStore from "../stores/GameStore";
import Player from "./Player";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.keyListener = new KeyListener();
  }

  componentDidMount() {
    this.keyListener.subscribe([this.keyListener.LEFT, this.keyListener.RIGHT]);
  }

  render() {
    return (
        <Loop>
          <Stage>
            <World>
              <Player store={GameStore} keys={this.keyListener} />
            </World>
          </Stage>
        </Loop>
    );
  }
}
