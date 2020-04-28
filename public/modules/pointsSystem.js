import stateManager from './state.js'

const score = document.querySelector('#points')

const addPoints = () => {
  const { points, hero } = stateManager.state
  if (hero.x > 0) {
    stateManager.state.points = Math.floor(points + hero.x / 100 + 1)
    score.innerHTML = stateManager.state.points
  }
}

function run(e) {
  if (e.keyCode == 32) {
    stateManager.state.pointsIntId = setInterval(addPoints, 50)
    document.body.removeEventListener('keyup', run)
  }
}
document.body.addEventListener('keyup', run)

export default addPoints
