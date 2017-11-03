let playerSprite = require("../images/player.png");

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Body } from "react-game-kit";
import { observer } from "mobx-react";

import AbstractSprite from "./lib/AbstractSprite";
import Config from "../config/base";

@observer
export default class Player extends Component {
  static propTypes = {
    keys: PropTypes.object,
    store: PropTypes.object
  };

  static contextTypes = {
    loop: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  checkKeys = () => {
    const { keys, store } = this.props;
    if (keys.isDown(keys.LEFT)) { store.movePlayerLeft(); }
    if (keys.isDown(keys.RIGHT)) { store.movePlayerRight(); }
    if (keys.isDown(keys.SPACE)) { store.resetBulletPosition(); }
  };

  update = () => {
    this.checkKeys();
  };

  getWrapperStyles() {
    const { playerPosition } = this.props.store;
    const { x, y } = playerPosition;

    return {
      position: "absolute",
      transform: `translate(${x}px, ${y}px)`,
      transformOrigin: "left top"
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()}>
        <AbstractSprite
          src={playerSprite}
          tileHeight={Config.game.player.size}
          tileWidth={Config.game.player.size}
          offset={[0, 0]}
          state={0}
          steps={[0]}
        />
     </div>
    );
  }
}
