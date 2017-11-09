import { action, observable } from "mobx";

import Config from "../config/base";

class GameStore {
  @observable
  playerPosition = {
    x: ((window.innerWidth / 100) * 35),
    y: ((window.innerHeight / 100) * 90 )
  }

  @action
  movePlayerLeft() {
    if (this.playerPosition.x < 0) { return; }
    let playerPosition = this.playerPosition
    this.playerPosition = {
      x: playerPosition.x - Config.game.player.speed,
      y: playerPosition.y
    };
  }

  @action
  movePlayerRight() {
    if (this.playerPosition.x > window.innerWidth - Config.game.player.size) { return; }
    let playerPosition = this.playerPosition
    this.playerPosition = {
      x: playerPosition.x + Config.game.player.speed,
      y: playerPosition.y
    };
  }
  
  @observable
  bulletPosition = {
    x: -Config.game.bullet.size,
    y: -Config.game.bullet.size
  }

  @action
  moveBullet() {
    this.bulletPosition = {
      x: this.bulletPosition.x,
      y: this.bulletPosition.y - Config.game.bullet.speed
    };
  }
  
  @action
  resetBulletPosition() {
    if(this.bulletPosition.y < 0) {
      this.bulletPosition = {
        x: this.playerPosition.x + ((Config.game.player.size / 2) - Config.game.bullet.size / 2),
        y: this.playerPosition.y - (Config.game.player.size / 2)
      }
    }
  }

  @observable
  aliens = [];
}

export default new GameStore();
