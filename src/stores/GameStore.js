import { action, observable } from "mobx";

import Config from "../config/base";

class GameStore {
  @observable
  playerPosition = {
    x: ((window.innerWidth / 100) * 35),
    y: ((window.innerHeight / 100) * 90 )
  }
  
  @observable
  bullets = []

  @action
  setPlayerPosition(x, y) {
    if (x < 0 || x >= window.innerWidth - Config.game.player.size) {
      return;
    }
    this.playerPosition = { x: x, y: y };
  }
  
  @action
  fireBullet() {
    let bulletPosition = {
      x: this.playerPosition.x + ((Config.game.player.size / 2) - Config.game.bullet.size / 2),
      y: this.playerPosition.y - Config.game.player.size
    }
    this.bullets.push(bulletPosition);
  }

  @action
  moveBullets() {
    this.bullets = this.bullets.filter(bullet => bullet.y > Config.game.bullet.size);
    this.bullets.forEach((bullet, index) => {
      this.bullets[index] = ({ x: bullet.x, y: bullet.y - Config.game.bullet.speed });
    });
  }
}

export default new GameStore();
