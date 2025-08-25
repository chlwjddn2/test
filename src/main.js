import Phaser from 'phaser';
import './style.css'
import MainScene from './js/MainScene';

const width = window.innerWidth;
const height = window.innerHeight;

class Game{
	#config = {
    type: Phaser.CANVAS,
    width: width,
    height: height,
		backgroundColor: '#88C2F6',
    scene: [
      MainScene
    ],
    parent: 'container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
        // debug: false,
        debug: true,
      },
    },
    scale: {
      mode:Phaser.Scale.FIT,//자동맞춤
      autoCenter:Phaser.Scale.CENTER_BOTH,//가로세로 모두맞춤
    },
    pixelArt: false,
  }
  constructor() {
		this.game = new Phaser.Game(this.#config);
	}
}

const game = new Game();
