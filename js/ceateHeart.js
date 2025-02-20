class Heart {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.scale = 1;
    this.scaleSpeed = 0.005;
    this.maxScale = 1.1;
    this.minScale = 0.9;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);

    // 绘制经典爱心形状
    const d = this.size;
    ctx.beginPath();
    ctx.moveTo(0, -d / 2);

    // 左半边爱心
    ctx.bezierCurveTo(
      -d * 1.2, -d,    // 控制点1
      -d * 1.2, d / 2, // 控制点2
      0, d             // 终点
    );

    // 右半边爱心
    ctx.bezierCurveTo(
      d * 1.2, d / 2,  // 控制点1
      d * 1.2, -d,     // 控制点2
      0, -d / 2        // 终点
    );

    // 添加发光效果
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 5;

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 缓慢的呼吸效果
    if (this.scale >= this.maxScale) this.scaleSpeed = -Math.abs(this.scaleSpeed);
    if (this.scale <= this.minScale) this.scaleSpeed = Math.abs(this.scaleSpeed);
    this.scale += this.scaleSpeed;

    // 边界检测和回弹
    if (this.x < this.size || this.x > canvas.width - this.size) {
      this.speedX = -this.speedX;
    }
    if (this.y < this.size || this.y > canvas.height - this.size) {
      this.speedY = -this.speedY;
    }
  }
}

const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'heart-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const hearts = [];

const createHearts = (num) => {
  for (let i = 0; i < num; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 20 + 15;

    const colors = [
      '#FF3366',
      '#FF4D4D',
      '#FF6666',
      '#FF7373',
      '#FF8080'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    hearts.push(new Heart(x, y, size, color));
  }
};

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  hearts.forEach(heart => {
    heart.draw(ctx);
    heart.update();
  });

  requestAnimationFrame(animate);
}

// 初始化
createHearts(52);
animate();

// 响应窗口大小变化
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});