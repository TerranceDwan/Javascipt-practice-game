import stateManager from './state.js'
import pause from './pauseGame.js'
import startGame from './startGame.js'
import cloudFunctions from './cloudFunctions.js'
import moveHero from './moveHero.js'
import addPoints from './pointsSystem.js'

const { state, methods, constructors } = stateManager

const youLose = () => {
  document.body.removeEventListener('keyup', pause)
  document.body.removeEventListener('keydown', moveHero.move)
  clearInterval(stateManager.state.pointsIntId)
  methods.cancelAnimations()
  tryAgain()
  document.body.addEventListener('keyup', restart)
}

const tryAgain = () => {
  const retry = document.querySelector('#retry')
  retry.classList.toggle('lost-game')
}

function restart(e) {
  if (e.keyCode == 32) {
    retry.classList.toggle('lost-game')
    state.context.clearRect(0, 0, 1000, 600)
    document.body.removeEventListener('keyup', restart)
    stateManager.state.hero = new constructors.MakeHero(
      '../images/superhero.png',
      -250,
      200,
      150
    )
    stateManager.state.points = 0
    stateManager.state.pointsIntId = setInterval(addPoints, 200)
    startGame.startIntro()
    moveHero.heroInit()
    cloudFunctions.setCloudProps(stateManager.state.cloud1)
    stateManager.state.cloud1.speed = 5
    stateManager.state.rafID2 = ''
    stateManager.state.cloud2 = {
      imgPath: null,
      x: null,
      y: null,
      width: null,
      height: null,
      speed: 8,
    }
    setTimeout(cloudFunctions.animateCloud1(), 1500)
  }
}

export default youLose
