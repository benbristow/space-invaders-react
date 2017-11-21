import React, { Component } from "react";
import PropTypes from "prop-types";
import { Loop, Stage, World } from "react-game-kit";
import { observer } from "mobx-react";

import Aliens from "./Aliens";
import Player from "./Player";
import Bullet from "./Bullet";

@observer
export default class App extends Component {
  static propTypes = {
    keyListener: PropTypes.object,
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <Loop>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <World>
            <Player store={this.props.store} keys={this.props.keyListener} />
            <Bullet store={this.props.store} />
            <Aliens store={this.props.store} />
            <div className="score">
              Score: {this.props.store.score}
            </div>
          </World>
        </Stage>
      </Loop>
    );
  }
}