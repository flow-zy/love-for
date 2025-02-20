import { allDis } from './util.js';

const saoleiButton = document.querySelector('.btn-saolei');
const saoleiBox = document.querySelector('.saolei-box');
const minesweeperGame = document.querySelector('.minesweeper-game');
const boxs = document.querySelectorAll('.box');
const resetButton = saoleiBox.querySelector('.reset-btn');

const rows = 15; // 增加行数
const cols = 15; // 增加列数
const cellSize = 30;
const minesCount = 30; // 增加地雷数量
let board = [];
let revealed = [];
let gameOver = false;
let canvas, ctx;

function initializeMinesweeper() {
  // 创建 Canvas
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
    minesweeperGame.appendChild(canvas);
    ctx = canvas.getContext('2d');
  }

  board = Array(rows).fill().map(() => Array(cols).fill(0));
  revealed = Array(rows).fill().map(() => Array(cols).fill(false));
  gameOver = false;

  // 随机放置地雷
  let minesPlaced = 0;
  while (minesPlaced < minesCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (board[r][c] !== 'M') {
      board[r][c] = 'M';
      minesPlaced++;
    }
  }

  // 计算数字
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'M') continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === 'M') {
            count++;
          }
        }
      }
      board[r][c] = count;
    }
  }

  drawBoard();
  canvas.addEventListener('click', (e) => {
    if (gameOver) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);

    if (revealed[r][c]) return;

    revealed[r][c] = true;
    if (board[r][c] === 'M') {
      gameOver = true;
      alert('游戏结束！');
      revealAllMines();
    } else if (board[r][c] === 0) {
      revealEmpty(r, c);
    }

    drawBoard();
  });
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = revealed[r][c] ? '#eee' : '#ccc';
      ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);

      if (revealed[r][c]) {
        if (board[r][c] === 'M') {
          ctx.fillStyle = 'red';
          ctx.fillRect(c * cellSize + 5, r * cellSize + 5, cellSize - 10, cellSize - 10);
        } else if (board[r][c] > 0) {
          ctx.fillStyle = 'black';
          ctx.font = '20px Arial';
          ctx.fillText(board[r][c], c * cellSize + 10, r * cellSize + 20);
        }
      }
    }
  }
}

function revealEmpty(r, c) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !revealed[nr][nc]) {
        revealed[nr][nc] = true;
        if (board[nr][nc] === 0) {
          revealEmpty(nr, nc);
        }
      }
    }
  }
}

function revealAllMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'M') {
        revealed[r][c] = true;
      }
    }
  }
  drawBoard();
}

saoleiButton.addEventListener('click', () => {
  allDis(boxs);
  saoleiBox.style.width='60%'
  saoleiBox.style.display = 'flex';
  initializeMinesweeper();
});

// 重新开始
resetButton.addEventListener('click', () => {
  initializeMinesweeper();
});