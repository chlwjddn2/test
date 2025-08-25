
export default class AlphabetBall {
  constructor(scene, x, y, frameIndex) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.frameIndex = frameIndex;

    this.ball = this.scene.physics.add.sprite(x, y, 'alphabet');
    this.ball.setFrame(frameIndex);
    this.ball.setScale(2.5);
    this.ball.setCircle(this.ball.width / 2);
    this.ball.setInteractive();
    
    // 알파벳 정보 저장
    this.alphabet = String.fromCharCode(65 + frameIndex);

    // 클릭 시 알파벳 표시
    this.ball.on('pointerdown', () => {
      console.log(`클릭한 알파벳: ${this.alphabet}`);
      this.ball.destroy();
    });
  }

  // 포물선 설정
  spawnBall(isLeft) {
    const gravityY = 800;
    const velocityY = -600;
    const timeInAir = (2 * Math.abs(velocityY)) / gravityY; // 비행 시간
    const velocityX = this.scene.cameras.main.width / timeInAir;   // 도달 속도

    this.ball.setGravityY(gravityY); // 중력 설정
    this.ball.setVelocity(isLeft ? velocityX : -velocityX, velocityY);
    this.ball.setBounce(1); // 튕김 설정
  }

  // 알파벳 공 애니메이션
  animateFloatingBall() {
    // 크기 변화 및 투명도 변화
    this.scene.tweens.add({
      targets: this.ball,
      scale: 2.5,
      alpha: 1,
      duration: 400,
      ease: 'Back.easeOut',
    });

    // 공중에 떠있는 애니메이션
    this.scene.tweens.add({
      targets: this.ball,
      y: this.y + 20, // 아래로 약간
      duration: 1000, // 1초 걸림
      yoyo: true, // 원래 위치로 돌아오기
      repeat: -1, // 무한 반복
      ease: 'Sine.easeInOut', // 부드러운 움직임
    });
  }
}