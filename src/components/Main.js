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
      case "dead":
        return (<div>Dead</div>);
      case "won":
        return (<div>A winner is you!</div>);
    }
  }
}
