import { sneakRun } from './support.js'
const images = ['characters1.png', 'characters2.png', 'characters3.png']

const btnLeft = document.querySelector('.left')
const btnRight = document.querySelector('.right')
const imgContainer = document.querySelector('.slider-wrapper')
let currentTeam = document.querySelector('body').dataset.team
const accent = Array.from(document.querySelectorAll('.accent'))
const overlay = document.querySelector('.overlay')
let nameLogo = document.querySelector('.parallax-logo')
let parLayers = document.querySelectorAll('.layer')
let parallaxBg = document.querySelector('.parallax-bg')
// let parallaxLayers = [
//   { item: document.querySelector('.parallax-fg'), YSpeed: 0.2 },
//   { item: document.querySelector('.parallax-mg-1'), YSpeed: 0.3 },
//   { item: document.querySelector('.parallax-mg-2'), YSpeed: 0.4 },
//   { item: document.querySelector('.parallax-mg-3'), YSpeed: 0.5 },
//   { item: document.querySelector('.parallax-logo'), YSpeed: 0.6 },
// ]

function handleScroll() {
  // Calculate the new background position based on the scroll position
  const scrollPosition = window.scrollY
  const availableScroll = document.body.scrollHeight - window.innerHeight

  //same
  let currentScroll = (scrollPosition / availableScroll) * 100
  let progressSlider = (window.scrollY * 100) / availableScroll

  //need to add max scroll so it will stay contained and not move
  //assign item and speed for each layer
  parLayers.forEach((layer) => {
    layer.style.backgroundPositionY = currentScroll + '%'
  })
  //parallaxLayers[0].item.style.backgroundPositionY = currentScroll + '%'
}

function badGuys() {
  parLayers.forEach((layer) => {
    layer.style.backgroundPositionX = '100%'
  })
  //add accent color to the heads
  accent.forEach((item) => {
    item.classList.add('red-blue')
    item.classList.remove('green-blue')
  })
  //this will also change badge display
}

function goodGuys() {
  parLayers.forEach((layer) => {
    layer.style.backgroundPositionX = '0%'
  }),
    //add accent color to the heads
    accent.forEach((item) => {
      item.classList.add('green-blue')
      item.classList.remove('red-blue')
    })
  //this will also change badge display
}

//function that changes screen

const whoosh = (side) => {
  side === 'bad' ? badGuys() : goodGuys()
}

//just a starting of a slider
const switchImage = (imageLink) => {
  return (imgContainer.style.backgroundImage = `url(${images[imageLink]})`)
}
//slider of images
let counter = 0
const slider = (direction) => {
  direction === 'right'
    ? counter === images.length - 1
      ? (switchImage(0), (counter = 0))
      : (switchImage(counter + 1), counter++)
    : counter === 0
    ? (switchImage(images.length - 1), (counter = images.length - 1))
    : (switchImage(counter - 1), counter--)
}

//shoudld be grouped with whole carousel
btnLeft.addEventListener('click', () => slider('left'))
btnRight.addEventListener('click', () => slider('right'))

//the ones i have on a main screen(half screen is a button)
document.querySelector('.faction-btn-bad').addEventListener('click', () => {
  whoosh('bad')
})
document.querySelector('.faction-btn-good').addEventListener('click', () => {
  whoosh('good')
})

//fade in-out of section elements upon visibility
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
      nameLogo.style.transform = 'translateY(20%)'
      nameLogo.style.opacity = 0
      overlay.style.opacity = 1
    } else {
      entry.target.classList.remove('show')
      overlay.style.opacity = 0
      nameLogo.style.transform = 'translateY(0%)'
      nameLogo.style.opacity = 1
    }
  })
})

// i have no idea how this works
let hiddenSection = document.querySelectorAll('.hidden')
hiddenSection.forEach((e) => {
  observer.observe(e)
})

//Attach the event listener to the 'scroll' event
window.addEventListener('scroll', handleScroll)

document.addEventListener('keydown', (key) => sneakRun(key))
