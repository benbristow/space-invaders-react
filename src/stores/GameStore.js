import { action, observable } from "mobx";

import Config from "../config/base";

class GameStore {
  @observable
  score = 0;

  @observable
  state = "";

  @action
  win() {
    this.state = "won";
  }

  @observable
  playerPosition = {};

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

  @observable
  alienDirection = true; // true = right, false = left
 
  @action
  moveAliens() {
    var screenWidth = window.innerWidth;
    var overTheEdge = this.aliens.filter(alien => alien.x < 0 || alien.x > screenWidth - Config.game.alien.size);
    if(overTheEdge.length > 0) { this.alienDirection = !this.alienDirection; }
    this.aliens = this.aliens.map((alien) => {
      alien.x += this.alienDirection ? Config.game.alien.speed : -Config.game.alien.speed;
      return alien;
    });
  }

  @action
  resetAliens() {
    this.aliens = [];
    for (var y = 0; y <= 2; y++) {
      for (var x = 0 + y; x <= 10 - y; x++) {
        this.aliens.push({ x: Config.game.alien.size * x, y: (Config.game.alien.size * y) });
      }
    }
  }

  @action
  resetAll() {
    this.score = 0;
    this.state = "alive";
    this.playerPosition = { x: ((window.innerWidth / 100) * 35), y: ((window.innerHeight / 100) * 90) }
    this.resetAliens();
  }
}

export default new GameStore();
 