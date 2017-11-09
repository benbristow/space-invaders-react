import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import Alien from "./Alien";
import Config from "../config/base";

@observer
export default class Aliens extends Component {
  static propTypes = {
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
    this.resetAliens();
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  resetAliens() {
    this.props.store.aliens = [];

    var screenWidth = window.innerWidth;
    var aliensPerRow = Math.floor(screenWidth / Config.game.alien.size);

    for(var x = 0; x < aliensPerRow; x++) {
      this.props.store.aliens.push({ x: (Config.game.alien.size * i), y: 10 })
    }
  }

  checkCollisions = () => {
    const { aliens, bulletPosition } = this.props.store;

  }

  update = () => {
    this.checkCollisions();
  }

  renderAliens = () => {
    const { aliens } = this.props.store;
    return aliens.map((alien) => {
      return (
        <Alien x={alien.x} y={alien.y} />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderAliens()}
      </div>
    );
  }
}