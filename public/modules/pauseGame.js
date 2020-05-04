import stateManager from './state.js'
import cloudFunctions from './cloudFunctions.js'
import moveHero from './moveHero.js'
import pointsSystem from './pointsSystem.js'

function pause(e) {
  if (e.keyCode == 80) {
    const pauseMenu = document.querySelector('#pause')
    const pauseScreen = document.querySelector('.pause-screen')
    if (!stateManager.state.paused) {
      pauseMenu.classList.toggle('paused')
      stateManager.methods.cancelAnimations()
      stateManager.state.paused = true
    } else {
      pauseMenu.classList.toggle('paused')
      requestAnimationFrame(moveHero.heroInit)
      requestAnimationFrame(pointsSystem.changeScore)
      requestAnimationFrame(cloudFunctions.animateCloud1)
      if (stateManager.state.rafID2)
        requestAnimationFrame(cloudFunctions.animateCloud2)
      stateManager.state.paused = false
    }
  }
}

export default pause
