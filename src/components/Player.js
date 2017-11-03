import React, { Component } from "react";
import PropTypes from "prop-types";
import { Body } from "react-game-kit";
import { observer } from "mobx-react";

let playerSprite = require("../images/player.png");

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
    let x = store.playerPosition.x;
    let y = store.playerPosition.y;

    if (keys.isDown(keys.LEFT)) {
      store.setPlayerPosition(x - 15, y);
    }

    if(keys.isDown(keys.RIGHT)) {
      store.setPlayerPosition(x + 15, y);
    }
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
        <Body
          args={[0, 32, 32, 32]}
          ref={b => {
            this.body = b;
          }}
        >
          <img src={playerSprite} />
        </Body>
      </div>
    );
  }
}
