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
    this.resetAliens();
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  resetAliens() {
    this.props.store.aliens = [];
    for(var y = 0; y <= 3; y++) {
      for (var x = 0 + y; x <= 10; x++) {
         this.props.store.aliens.push({ x: Config.game.alien.size * x, y: (Config.game.alien.size * y) });
      }
    }
  }

  dealWithColl = () => {
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
    }
  }

  update = () => {
    this.dealWithColl();
    this.checkWin();
    this.props.store.moveAliens();
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