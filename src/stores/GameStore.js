import { observable } from "mobx";

class GameStore {
  @observable playerPosition = { x: 0, y: ((window.innerHeight / 100) * 80) }

  setPlayerPosition(x, y) {
    if (x < 0 || x >= window.innerWidth - 32) {
      return;
    }
    this.playerPosition = { x: x, y: y };
  }
}

export default new GameStore();
