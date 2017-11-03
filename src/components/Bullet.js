let bulletSprite = require("../images/bullet.png");

import React, { Component } from "react";
import PropTypes from "prop-types";
import AbstractSprite from "./lib/AbstractSprite";

import Config from "../config/base";

export default class Bullet extends Component {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    };

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
                    src={bulletSprite}
                    tileHeight={Config.game.bullet.size}
                    tileWidth={Config.game.bullet.size}
                    offset={[0, 0]}
                    state={0}
                    steps={[0]}
                />
            </div>
        );
    }
}
