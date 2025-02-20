import { allDis } from './util.js'
const contentNumber = document.querySelector('.content-number')
const saoleiBox = document.querySelector('.number-box')
const boxs = document.querySelectorAll('.box')
const numberButton = document.querySelector('.btn-number')
const resetButton = saoleiBox.querySelector('.reset-btn')
const scoreBox = saoleiBox.querySelector('.score')
let canvas, ctx
let score = 0
const size = 4
const cellSize = 100
const grid = Array(size)
	.fill()
	.map(() => Array(size).fill(0))

function initialize2048() {
	// 创建 Canvas
	if (!canvas) {
		canvas = document.createElement('canvas')
		canvas.width = size * cellSize
		canvas.height = size * cellSize
		contentNumber.appendChild(canvas)
		ctx = canvas.getContext('2d')
	}

	// 初始化游戏
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			grid[r][c] = 0
		}
  }
  score = 0; // 重置分数
  scoreBox.innerText = `你的分数是：${score}`;
	addRandomTile()
	addRandomTile()
	drawBoard()
}
function getNumberColor(value) {
	switch (value) {
		case 2:
			return '#ede0c8'; // 深浅米色
		case 4:
			return '#e4cfa1'; // 深浅橙色
		case 8:
			return '#f2b179'; // 橙色
		case 16:
			return '#f59563'; // 深橙色
		case 32:
			return '#f67c5f'; // 珊瑚色
		case 64:
			return '#f65e3b'; // 红色
		case 128:
			return '#edcf72'; // 金色
		case 256:
			return '#edcc61'; // 黄色
		case 512:
			return '#edc850'; // 深黄色
		case 1024:
			return '#edc53f'; // 金黄色
		case 2048:
			return '#edc22e'; // 金色
		default:
			return '#3c3a32'; // 深灰色
	}
}
function addRandomTile() {
	let emptyCells = []
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			if (grid[r][c] === 0) {
				emptyCells.push({ r, c })
			}
		}
	}
	if (emptyCells.length > 0) {
		const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
		grid[r][c] = Math.random() < 0.9 ? 2 : 4
	}
}

function drawBoard() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			drawCell(r, c, grid[r][c])
		}
	}
}

function drawCell(r, c, value) {
	ctx.fillStyle = value ? getNumberColor(value) : '#cdc1b4';
	ctx.fillRect(c * cellSize, r * cellSize, cellSize - 5, cellSize - 5);
	if (value) {
		ctx.fillStyle = '#fff'; // 字体颜色
		ctx.font = 'bold 40px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(value, c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
	}
}

function move(direction) {
	let moved = false

	if (direction === 'left') {
		for (let r = 0; r < size; r++) {
			let row = grid[r].filter((v) => v)
			for (let i = 0; i < row.length - 1; i++) {
				if (row[i] === row[i + 1]) {
          row[i] *= 2
          score += row[i]; // 增加分数
					row[i + 1] = 0
				}
			}
			row = row.filter((v) => v)
			while (row.length < size) row.push(0)
			if (!moved && grid[r].some((v, i) => v !== row[i])) moved = true
			grid[r] = row
		}
	} else if (direction === 'right') {
		for (let r = 0; r < size; r++) {
			let row = grid[r].filter((v) => v)
			for (let i = row.length - 1; i > 0; i--) {
				if (row[i] === row[i - 1]) {
          row[i] *= 2
          score += row[i]; // 增加分数
					row[i - 1] = 0
				}
			}
			row = row.filter((v) => v)
			while (row.length < size) row.unshift(0)
			if (!moved && grid[r].some((v, i) => v !== row[i])) moved = true
			grid[r] = row
		}
	} else if (direction === 'up') {
		for (let c = 0; c < size; c++) {
			let col = []
			for (let r = 0; r < size; r++) {
				if (grid[r][c] !== 0) col.push(grid[r][c])
			}
			for (let i = 0; i < col.length - 1; i++) {
				if (col[i] === col[i + 1]) {
          col[i] *= 2
          score += col[i]; // 增加分数
					col[i + 1] = 0
				}
			}
			col = col.filter((v) => v)
			while (col.length < size) col.push(0)
			for (let r = 0; r < size; r++) {
				if (!moved && grid[r][c] !== col[r]) moved = true
				grid[r][c] = col[r]
			}
		}
	} else if (direction === 'down') {
		for (let c = 0; c < size; c++) {
			let col = []
			for (let r = 0; r < size; r++) {
				if (grid[r][c] !== 0) col.push(grid[r][c])
			}
			for (let i = col.length - 1; i > 0; i--) {
				if (col[i] === col[i - 1]) {
          col[i] *= 2
          score += col[i]; // 增加分数
					col[i - 1] = 0
				}
			}
			col = col.filter((v) => v)
			while (col.length < size) col.unshift(0)
			for (let r = 0; r < size; r++) {
				if (!moved && grid[r][c] !== col[r]) moved = true
				grid[r][c] = col[r]
			}
		}
	}

	if (moved) {
		addRandomTile();
    drawBoard();
    scoreBox.innerText = `你的分数是：${score}`; // 更新分数显示
	} else if (!canMove()) {
		alert(`游戏结束！你的分数是：${score}`);
	}
}
function canMove() {
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			if (grid[r][c] === 0) return true;
			if (c < size - 1 && grid[r][c] === grid[r][c + 1]) return true;
			if (r < size - 1 && grid[r][c] === grid[r + 1][c]) return true;
		}
	}
	return false;
}
document.addEventListener('keydown', (e) => {
	console.log(e.key)
	if (e.key === 'ArrowLeft' || e.key === 'a') move('left')
	else if (e.key === 'ArrowRight' || e.key === 'd') move('right')
	else if (e.key === 'ArrowUp' ||e.key === 'w') move('up')
	else if (e.key === 'ArrowDown' || e.key === 's') move('down')
})

// initialize2048();
numberButton.addEventListener('click', () => {
  allDis(boxs)
  saoleiBox.style.width='50%'
	saoleiBox.style.display = 'flex'
	initialize2048()
})
resetButton.addEventListener('click', () => {
	initialize2048()
})
