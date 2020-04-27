import stateManager from './state.js'
import youLose from './losing.js'

let { canvas, context, cloud1, cloud2, imgObj, hero } = stateManager.state

const setCloudProps = (cloud) => {
  cloud.imgPath = '../images/cloud-clipart-transparent-9.png'
  cloud.x = canvas.width
  cloud.y = Math.floor(Math.random() * 450)
  cloud.width = Math.floor(Math.random() * 240) + 120
  cloud.height = cloud.width * 0.55
}
const globalCloudFunction = (cloud) => {
  const { x, y, width, height, speed, imgPath } = cloud
  if (!imgObj) {
    imgObj = new Image()
    imgObj.src = imgPath
  }
  context.clearRect(x, y, width + speed, height)
  context.drawImage(imgObj, x, y, width, height)
}
const rerunCloud = (cloud) => {
  const { x, width, speed } = cloud
  if (x > -width - 20) {
    cloud.x -= speed
    if (cloud === cloud1) {
      stateManager.state.rafID1 = requestAnimationFrame(animateCloud1)
    } else {
      stateManager.state.rafID2 = requestAnimationFrame(animateCloud2)
    }
  } else {
    setCloudProps(cloud, canvas)
    if (cloud === cloud1) {
      if (speed === 8) animateCloud2()
    }
    if (speed < 13 && cloud === cloud1) cloud.speed++
    if (cloud === cloud2) cloud.speed = Math.floor(Math.random() * 7) + 6
    if (cloud === cloud1) {
      requestAnimationFrame(animateCloud1)
    } else {
      requestAnimationFrame(animateCloud2)
    }
  }
}
const setAndRunCloud = (cloud) => {
  globalCloudFunction(cloud)
  rerunCloud(cloud)
}
const animateCloud1 = () => {
  let { cloud1, hero } = stateManager.state
  document.body.removeEventListener('keyup', run)
  if (cloud1.x < 130 + hero.x && cloud1.x + cloud1.width > hero.x) {
    if (cloud1.y < hero.y && cloud1.y + cloud1.height > hero.y + 20) {
      return youLose()
    } else if (
      cloud1.y < hero.y + hero.height - 10 &&
      cloud1.y + cloud1.height > hero.y + hero.height
    ) {
      return youLose()
    }
  }
  setAndRunCloud(cloud1)
}
const animateCloud2 = () => {
  let { cloud2, hero } = stateManager.state
  const { x, y, width, height } = cloud2
  if (x < 130 + hero.x && x + width > hero.x) {
    if (y < hero.y && y + height > hero.y + 20) {
      return youLose()
    } else if (
      y < hero.y + hero.height - 10 &&
      y + height > hero.y + hero.height
    ) {
      return youLose()
    }
  }
  setAndRunCloud(cloud2)
}

setCloudProps(cloud1)

function run(e) {
  if (e.keyCode == 32) {
    setTimeout(animateCloud1, 1500)
  }
}
document.body.addEventListener('keyup', run)

export default {
  setCloudProps,
  setAndRunCloud,
  animateCloud1,
  animateCloud2,
}
