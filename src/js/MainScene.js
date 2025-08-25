
import AlphabetBall from './AlphabetBall'; // 새로운 클래스 import
import Arrow from './Arrow'; // 새로운 클래스 import

export default class MainScene extends Phaser.Scene {
  #SPAWN_INTERVAL = 1000;
  #lastSpawnTime = 0;
  #SPEED = 800;
  #textData = '';

  constructor() {
    super('MainScene');
  }

  preload() {
    this.load.spritesheet('alphabet', '/alphabet.png', {
      frameWidth: 40,
      frameHeight: 40,
    });

    this.load.image('arrow', '/arrow.png');
  }

  create() {
    this.ballGroup = this.physics.add.group();
    this.physics.add.collider(this.ballGroup, this.ballGroup, this.handleBallCollision, null, this);

    this.text = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Hello Phaser!', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Ball spawn 예시 (ballGroup에 알파벳 공 추가)
    // this.spawnBall(); // 이렇게 호출하면 됩니다
    this.initArrow();
  }

  update(time, delta) {
    if (time - this.#lastSpawnTime > this.#SPAWN_INTERVAL) {
      this.spawnBall();
      this.#lastSpawnTime = time;
    }
    this.destroyBall();
  }

  spawnBall() {
    const isLeft = Phaser.Math.Between(0, 1) === 0;
    const startX = isLeft ? 0 : this.cameras.main.width;
    const startY = Phaser.Math.Between(200, this.cameras.main.height - 100);
    const frameIndex = Phaser.Math.Between(0, 25);

    // AlphabetBall 클래스 사용
    const ball = new AlphabetBall(this, startX, startY, frameIndex);
    this.ballGroup.add(ball.ball); // ballGroup에 추가
    ball.spawnBall(isLeft); // 포물선 애니메이션
    // ball.animateFloatingBall(); // 공중에서 떠 있는 애니메이션

    ball.ball.on('pointerdown', () => {
      const text = ball.alphabet;
      this.setText(text);
      ball.ball.destroy();
    });
  }

  destroyBall() {
    this.ballGroup.getChildren().forEach((ball) => {
      const { x, y } = ball;
      const width = this.cameras.main.width;
      const height = this.cameras.main.height;
      // 화면 영역 밖(조금 여유있게) 벗어나면 제거
      if (x < -50 || x > width + 50 || y < -50 || y > height + 50) ball.destroy();
    });
  }

  handleBallCollision() {
    this.cameras.main.shake(500, 0.01);
  }

  setText(text) {
    this.#textData += text;
    this.text.setText(this.#textData);
  }

  initArrow() {
    this.arrow = new Arrow(this);
  }
}