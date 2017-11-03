let bulletSprite = require("../images/bullet.png");

import React, { Component } from "react";
import PropTypes from "prop-types";
import AbstractSprite from "./lib/AbstractSprite";

import Config from "../config/base";
import { observer } from "mobx-react";

@observer
export default class Bullet extends Component {
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

    update = () => {
        this.props.store.moveBullet();
    }

    getWrapperStyles() {
        let { bulletPosition } = this.props.store;
        return {
            position: "absolute",
            transform: `translate(${bulletPosition.x}px, ${bulletPosition.y}px)`,
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
