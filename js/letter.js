import { letter } from '../data/letter.js'
import { allDis } from './util.js'
// 情书button
const loveButton = document.querySelector('.btn-love')
const box = document.querySelector('.box')
const loveAction = document.querySelector('.action-love')
const contents=document.querySelectorAll('.box')
// 最开始的时候页数
let page = 1
// 文本盒子
const content = document.querySelector('.love-box .content')
// 上一页按钮
const prevButton = document.querySelector('.action-love .prev')
// 下一页按钮
const nextButton = document.querySelector('.action-love .next')
// 生成文本内容
const typeWriter = (text, element) => {
	element.innerHTML = ''
	let i = 0
	const speed = 300 // 打字速度，单位为毫秒
	const heart = document.createElement('i')
	heart.style.color = '#FF7373'
  heart.className = 'fa fa-heart'
  heart.setAttribute('aria-hidden',true)
  const typing = () => {
    heart.remove() // 文本结束后，爱心图标需删除
		if (i < text.length) {
			element.innerHTML += text.charAt(i)
			element.appendChild(heart)
			i++
			heart.style.left = `${i * 10}px` // 爱心图标随着文字的输出而移动
      setTimeout(typing, speed)
      prevButton.classList.add('disabled')
      nextButton.classList.add('disabled')

		} else {
      heart.remove() // 文本结束后，爱心图标需删除
      prevButton.classList.remove('disabled')
      nextButton.classList.remove('disabled')
		}
	}
	typing()
}
//
const loveClick = () => {
  allDis(contents)
	box.classList.add('love-box')
  box.style.display = 'flex'
  loveAction.style.display = 'flex'
	content.classList.add('love-content')
	typeWriter(letter[page].content, content)
}
console.log(loveButton)
loveButton.addEventListener('click', loveClick)
// 点击上一页按钮
const prevClick = () => {
	page--
	if (page < 1) {
		page = 1
		prevButton.classList.add('disabled')
	} else {
		prevButton.classList.remove('disabled')
	}
	typeWriter(letter[page].content, content)
}
prevButton.addEventListener('click', prevClick)
// 点击下一页按钮
const nextClick = () => {
	page++
	if (page > letter.length - 1) {
		page = letter.length - 1
		nextButton.classList.add('disabled')
	} else {
		nextButton.classList.remove('disabled')
	}
	typeWriter(letter[page].content, content)
}
nextButton.addEventListener('click', nextClick)
