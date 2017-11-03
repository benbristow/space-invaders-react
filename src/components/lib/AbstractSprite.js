// https://raw.githubusercontent.com/ballantyno/react-shooter/master/src/Game/Components/AbstractSprite.js

import React, { Component, PropTypes } from "react";
import { Sprite } from "react-game-kit";

export default class AbstractSprite extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        tileHeight: PropTypes.number.isRequired,
        tileWidth: PropTypes.number.isRequired,
        offset: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        state: PropTypes.number.isRequired,
        steps: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        scale: PropTypes.number,
        repeat: PropTypes.bool,
        ticksPerFrame: PropTypes.number,
        onPlayStateChanged: PropTypes.func
    };

    static defaultProps = {
        scale: 1,
        repeat: false,
        ticksPerFrame: 0,
        onPlayStateChanged: undefined
    };

    render() {
        const { ...spriteProps } = this.props;
        return (
            <Sprite
                { ...spriteProps }
            />
        )
    }
}