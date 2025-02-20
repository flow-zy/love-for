import { allDis } from './util.js'
import { letter } from '../data/letter.js'
const sizeButton = document.querySelector('.btn-size')
const box = document.querySelector('.size-box')
const content = box.querySelector('.content-size')
const hintButton = document.querySelector('.hint-btn')
const retryButton = document.querySelector('.retry-btn')
const actionSize = document.querySelector('.action-size')
const boxs = document.querySelectorAll('.box')
const guessButton = document.querySelector('.guess-btn');
const tip = content.querySelector('.tip')
const timerDisplay = document.getElementById('timer');
const loveWords=document.querySelector('.love-words')
let randomNumber;
let attempts = 0;
let maxAttempts = 4;
let timer;
let timeLeft = 60;
let lowerBound = 0;
let upperBound = 100;

function initializeGame() {
	randomNumber = Math.floor(Math.random() * 101);
	attempts = 0;
	timeLeft = 60;
	lowerBound = 0;
	upperBound = 100;
	userInput.value = '';
  tip.innerHTML = '';
  loveWords.innerHTML=''
	startTimer();
}
function startTimer() {
    clearInterval(timer);
  timerDisplay.textContent = `倒计时: ${timeLeft}秒`;
  timer
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `倒计时: ${timeLeft}秒`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('时间到！游戏结束。');
          // initializeGame();
          timeLeft = 60;
          guessButton.classList.add('disabled')
        }
    }, 1000);
}

sizeButton.addEventListener('click', () => {
	allDis(boxs)
	box.style.display = 'flex'
	actionSize.style.display = 'flex'
	initializeGame()
})

hintButton.addEventListener('click', () => {
	if (attempts < maxAttempts) {
		attempts++;
		const midPoint = Math.floor((lowerBound + upperBound) / 2);
		if (randomNumber <= midPoint) {
			upperBound = midPoint;
		} else {
			lowerBound = midPoint + 1;
		}
		tip.innerHTML = `提示：数字在 ${lowerBound} 到 ${upperBound} 之间`;
	} else {
		tip.innerHTML = '没有更多提示了！';
	}
})

retryButton.addEventListener('click', () => {
	initializeGame()
})

guessButton.addEventListener('click', () => {
    const guess = parseInt(userInput.value, 10);
    if (isNaN(guess) || guess < 0 || guess > 100) {
        alert('请输入0到100之间的数字');
        return;
    }
    if (guess === randomNumber) {
      alert('恭喜你，猜对了！');
      clearInterval(timer);
      const num= Math.floor(Math.random() * letter.length);
      loveWords.innerHTML=letter[num].content
    } else if (guess < randomNumber) {
        alert('太小了，试试更大的数字！');
    } else {
        alert('太大了，试试更小的数字！');
    }
});