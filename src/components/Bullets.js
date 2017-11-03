let bulletSprite = require("../images/bullet.png");

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Body } from "react-game-kit";
import { observer } from "mobx-react";

import AbstractSprite from "./lib/AbstractSprite";
import Bullet from "./Bullet";

@observer
export default class Bullets extends Component {
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
        this.props.store.moveBullets();
    }

    renderBullets = () => {
        const { bullets } = this.props.store;
        return bullets.map((bullet) => {
            return (
                <Bullet x={bullet.x} y={bullet.y} />
            );
        });
    }

    render() {
        return(
            <div>
                {this.renderBullets()}
            </div>
        );
    }
}
