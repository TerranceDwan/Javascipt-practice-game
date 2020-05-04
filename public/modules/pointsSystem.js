import stateManager from './state.js'
import TWEEN from './tween.esm.js'

const scoreIndicator = document.querySelector('#points')

let tween

const addPoints = () => {
  const { score, hero } = stateManager.state
  tween = new TWEEN.Tween({ score: score })
  if (hero.x > 0) {
    stateManager.state.score = Math.floor(score + hero.x / 50 + 1)
    tween.to({ score: Math.floor(score + hero.x / 50 + 1) }, 200)
    tween.start()
    tween.onUpdate(function(object) {
      scoreIndicator.innerHTML = Math.floor(object.score)
    })
  }
}

const changeScore = () => {
  scoreIndicator.innerHTML = stateManager.state.score
  TWEEN.update()
  stateManager.state.scoreRafId = requestAnimationFrame(changeScore)
}

function run(e) {
  if (e.keyCode == 32) {
    stateManager.state.scoreIntId = setInterval(addPoints, 200)
    requestAnimationFrame(addPoints)
    changeScore()
    document.body.removeEventListener('keyup', run)
  }
}
document.body.addEventListener('keyup', run)

export default { addPoints, changeScore }
