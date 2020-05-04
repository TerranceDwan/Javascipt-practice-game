import stateManager from './state.js'
import pause from './pauseGame.js'
import startGame from './startGame.js'
import cloudFunctions from './cloudFunctions.js'
import moveHero from './moveHero.js'
import pointsSystem from './pointsSystem.js'

const { state, methods, constructors } = stateManager

const youLose = () => {
  document.body.removeEventListener('keyup', pause)
  document.body.removeEventListener('keydown', moveHero.move)
  clearInterval(stateManager.state.scoreIntId)
  methods.cancelAnimations()
  highScoreCheck()
}

const highScoreCheck = () => {
  const { score, highScores } = stateManager.state
  const lowHighScore = highScores.reduce((x, y) => {
    if (x < y) {
      return x
    }
    return y
  })[1]
  const endGame = document.querySelector('#end_game')
  endGame.classList.toggle('lost-game')
  if (score > lowHighScore) {
    collectInitials()
  } else {
    tryAgain()
  }
}

const collectInitials = () => {
  const initialsInput = document.querySelector('input')
  const endGameTitle = document.querySelector('#end_game_title')

  endGameTitle.innerHTML = 'Congratulations'
  endGameTitle.style.fontSize = '84px'
  initialsInput.value = ''
  initialsInput.focus()
  initialsInput.style.display = 'initial'

  document.body.addEventListener('keyup', mutateHighScore)
}

function mutateHighScore(e) {
  if (e.keyCode == 13) {
    const initialsInput = document.querySelector('input')
    stateManager.state.highScores.push([
      initialsInput.value ? initialsInput.value.toUpperCase() : 'AAA',
      stateManager.state.score,
    ])

    initialsInput.style.display = 'none'

    document.body.removeEventListener('keyup', mutateHighScore)
    tryAgain()
  }
}

const tryAgain = () => {
  const endGameTitle = document.querySelector('#end_game_title')
  const scores = document.querySelector('#scores')
  const spaceToRetry = document.querySelector('#space_to_retry')
  endGameTitle.innerHTML = 'High Scores:'
  fillHighScores()
  spaceToRetry.style.visibility = 'visible'
  scores.style.visibility = 'visible'
  document.body.addEventListener('keyup', restart)
}

const fillHighScores = () => {
  const scoresArray = stateManager.state.highScores.sort((a, b) => b[1] - a[1])
  const displayScores = document.querySelector('#scores')
  for (let i = 0; i < 9; i++) {
    const score = document.createElement('li')
    score.setAttribute('class', 'score')
    score.innerHTML =
      (i + 1).toString() + '  ' + scoresArray[i][0] + '    ' + scoresArray[i][1]
    displayScores.appendChild(score)
  }
}

function restart(e) {
  if (e.keyCode == 32) {
    const endGame = document.querySelector('#end_game')
    const displayScores = [...document.getElementsByClassName('score')]
    const spaceToRetry = document.querySelector('#space_to_retry')
    spaceToRetry.style.visibility = 'hidden'
    endGame.classList.toggle('lost-game')
    displayScores.forEach((score) => score.remove())
    state.context.clearRect(0, 0, 1000, 600)
    document.body.removeEventListener('keyup', restart)
    stateManager.state.hero = new constructors.MakeHero(
      '../images/superhero.png',
      -250,
      200,
      150
    )
    stateManager.state.score = 0
    pointsSystem.changeScore()
    stateManager.state.scoreIntId = setInterval(pointsSystem.addPoints, 200)
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
