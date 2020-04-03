var canvas = null
var context = null

const setup = () => {
  canvas = document.getElementById('my_canvas')
  context = canvas.getContext('2d')
  canvas.width = 1000
  canvas.height = 600
}

setup()

let rafID1
let rafID2

setCloudProps = cloud => {
  cloud.imgPath = 'images/cloud-clipart-transparent-9.png'
  cloud.x = canvas.width
  cloud.y = Math.floor(Math.random() * 450)
  cloud.width = Math.floor(Math.random() * 240) + 120
  cloud.height = cloud.width * 0.55
}
globalCloudFunction = cloud => {
  const { x, y, width, height, speed, imgPath } = cloud
  if (!imgObj) {
    imgObj = new Image()
    imgObj.src = imgPath
  }
  context.clearRect(x, y, width + speed, height)
  context.drawImage(imgObj, x, y, width, height)
}
rerunCloud = cloud => {
  const { x, width, speed } = cloud

  if (x > -width - 20) {
    cloud.x -= speed
    if (cloud === cloud1) {
      rafID1 = requestAnimationFrame(animateCloud1)
    } else {
      rafID2 = requestAnimationFrame(animateCloud2)
    }
  } else {
    setCloudProps(cloud)
    if (cloud === cloud1) {
      if (speed === 10) animateCloud2()
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
class MakeHero {
  constructor(imgPath, x, y, width) {
    this.imgPath = imgPath
    this.x = x
    this.y = y
    this.width = width
    this.height = width * 0.55
    this.speed = { x: 0, y: 0 }
  }
}
let hero = new MakeHero('images/superhero.png', -250, 200, 150)

let heroObj = new Image()
heroObj.src = hero.imgPath
heroObj.onload = () => {
  context.drawImage(heroObj, hero.x, hero.y, hero.width, hero.height)
}

let cloud1 = {}
let cloud2 = {}
let imgObj
setCloudProps(cloud1)
cloud1.speed = 5
cloud2.speed = 8

// Starting the Game
const cover = document.querySelector('#cover')
const start = document.querySelector('#start')
const startGame = () => {
  start.style.opacity = 0
  intro()
  setTimeout(() => animateCloud1(), 1500)
}

const intro = () => {
  const maxSpeed = 10
  const { x, y, width, height } = hero
  context.clearRect(x - maxSpeed, y, width, height)
  context.drawImage(heroObj, x, y, width, height)
  if (x >= 50) {
    return
  } else {
    hero.x += maxSpeed
    requestAnimationFrame(intro)
  }
}

const animateCloud1 = () => {
  document.body.removeEventListener('keyup', run)
  document.body.addEventListener('keyup', pause)
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
  moveHero()
  globalCloudFunction(cloud1)
  rerunCloud(cloud1)
}

const animateCloud2 = () => {
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
  globalCloudFunction(cloud2)
  rerunCloud(cloud2)
}

const youLose = () => {
  cancelAnimationFrame(rafID1)
  cancelAnimationFrame(rafID2)
}

function run(e) {
  if (e.keyCode == 32) startGame()
}

// Pause Functions
const pauseMenu = document.querySelector('#pause')
let paused = false
function pause(e) {
  if (e.keyCode == 80) {
    if (!paused) {
      pauseMenu.classList.toggle('paused')
      cancelAnimationFrame(rafID1)
      paused = true
    } else {
      pauseMenu.classList.toggle('paused')
      requestAnimationFrame(animateCloud1)
      paused = false
    }
  }
}

function moveHero() {
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
  requestAnimationFrame(move)
}
function move(e) {
  if (e.keyCode == 38) up()
  if (e.keyCode == 40) down()
  if (e.keyCode == 37) left()
  if (e.keyCode == 39) right()
}
const up = () => {
  if (hero.speed.y >= -10) {
    console.log([hero.x, hero.y])
    hero.speed.y -= 1
  }
}
const down = () => {
  if (hero.speed.y <= 10) {
    console.log([hero.x, hero.y])
    hero.speed.y += 1
  }
}
const left = () => {
  if (hero.speed.x >= -10) {
    console.log([hero.x, hero.y])
    hero.speed.x -= 1
  }
}
const right = () => {
  if (hero.speed.x <= 10) {
    console.log([hero.x, hero.y])
    hero.speed.x += 1
  }
}

document.body.addEventListener('keyup', run)
document.body.addEventListener('keydown', move)
function js_Load() {
  document.body.style.visibility = 'visible'
}
setTimeout(() => cover.classList.add('remove-cover'), 2000)
