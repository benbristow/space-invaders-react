import React, { Component } from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import checkPointIn from "check-point-in-rectangle";

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
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  dealWithCollision = () => {
    const { bulletPosition, aliens } = this.props.store;
    var currentAlienCount = aliens.length;
    var remainingAliens = aliens.filter((alien) => {
      var bulletPositionPoint = [bulletPosition.x, bulletPosition.y];
      var alienRect = [
        [alien.x, alien.y],
        [alien.x + Config.game.alien.size, alien.y],
        [alien.x + Config.game.alien.size, alien.y + Config.game.alien.size],
        [alien.x, alien.y + Config.game.alien.size]
      ];
      return !checkPointIn(bulletPositionPoint, alienRect);
    });
    var removedAlienCount = currentAlienCount - remainingAliens.length;
    this.props.store.score += removedAlienCount;
    this.props.store.aliens = remainingAliens;
  }

  checkWin() {
    const { aliens } = this.props.store;
    if(aliens.length == 0) {
      this.props.store.win();
    }
  }

  update = () => {
    this.dealWithCollision();
    this.checkWin();
    this.props.store.moveAliens();
  }

  renderAliens = () => {
    const { aliens } = this.props.store;
    return aliens.map((alien, index) => {
      return (
        <Alien key={index} x={alien.x} y={alien.y} />
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