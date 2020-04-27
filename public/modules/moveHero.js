import stateManager from './state.js'

function moveHero() {
  const { hero, heroObj, context } = stateManager.state
  const { x, y, width, height, speed } = hero
  const currentSpeed = [speed.x, speed.y]
  if (y >= 517 && speed.y > 0) {
    speed.y = 0
  } else if (y <= -1 && speed.y < 0) {
    speed.y = 0
  }
  if (x >= 850 && speed.x > 0) {
    speed.x = 0
  } else if (x <= -1 && speed.x < 0) {
    speed.x = 0
  }
  hero.y += speed.y
  hero.x += speed.x
  context.clearRect(
    x - currentSpeed[0],
    y - currentSpeed[1],
    width + 1,
    height + 1
  )
  context.drawImage(heroObj, x, y, width, height)
  stateManager.state.heroRafID = requestAnimationFrame(moveHero)
}
function move(e) {
  if (e.keyCode == 38) up()
  if (e.keyCode == 40) down()
  if (e.keyCode == 37) left()
  if (e.keyCode == 39) right()
}
const up = () => {
  if (stateManager.state.hero.speed.y >= -10) {
    stateManager.state.hero.speed.y -= 1
  }
}
const down = () => {
  if (stateManager.state.hero.speed.y <= 10) {
    stateManager.state.hero.speed.y += 1
  }
}
const left = () => {
  if (stateManager.state.hero.speed.x >= -10) {
    stateManager.state.hero.speed.x -= 1
  }
}
const right = () => {
  if (stateManager.state.hero.speed.x <= 10) {
    stateManager.state.hero.speed.x += 1
  }
}

const heroInit = () => {
  moveHero()
  document.body.addEventListener('keydown', move)
}

heroInit()

export default { heroInit, move }
