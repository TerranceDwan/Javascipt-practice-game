import stateManager from './state.js'
import pointsSystem from './pointsSystem.js'
import pause from './pauseGame.js'

let { context, hero, heroObj } = stateManager.state

function run(e) {
  if (e.keyCode == 32) startIntro()
}

document.body.addEventListener('keyup', run)

const startIntro = () => {
  const start = document.querySelector('#start')
  document.body.removeEventListener('keyup', run)
  start.style.opacity = 0
  document.body.addEventListener('keyup', pause)
  intro()
}

const intro = () => {
  const maxSpeed = 10
  const { x, y, width, height } = stateManager.state.hero
  context.clearRect(x - maxSpeed, y, width, height)
  context.drawImage(heroObj, x, y, width, height)
  if (x >= 50) {
    return
  } else {
    stateManager.state.hero.x += maxSpeed
    requestAnimationFrame(intro)
  }
}

export default { startIntro, intro }
