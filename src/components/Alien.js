let alienSprite = require("../images/player.png");

import React, { Component } from "react";
import PropTypes from "prop-types";

import Config from "../config/base";
import AbstractSprite from "./lib/AbstractSprite";

export default class Alien extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
  }

  getWrapperStyles() {
    return {
      position: "absolute",
      transform: `translate(${this.props.x}px, ${this.props.y}px)`,
      transformOrigin: "left top"
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()}>
        <AbstractSprite
          src={alienSprite}
          tileHeight={Config.game.alien.size}
          tileWidth={Config.game.alien.size}
          offset={[0, 0]}
          state={0}
          steps={[0]}
        />
      </div>
    );
  }
}