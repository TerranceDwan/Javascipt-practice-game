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

let state = {
  canvas: null,
  context: null,
  paused: false,
  cover: document.querySelector('#cover'),
  imgObj: null,
  hero: new MakeHero('../images/superhero.png', -250, 200, 150),
  heroObj: new Image(),
  heroRafID: '',
  rafID1: '',
  rafID2: '',
  cloud1: {
    imgPath: null,
    x: null,
    y: null,
    width: null,
    height: null,
    speed: 5,
  },
  cloud2: {
    imgPath: null,
    x: null,
    y: null,
    width: null,
    height: null,
    speed: 8,
  },
  points: 0,
  pointsIntId: '',
}

const methods = {
  cancelAnimations() {
    cancelAnimationFrame(state.heroRafID)
    cancelAnimationFrame(state.rafID1)
    cancelAnimationFrame(state.rafID2)
  },
  setup() {
    state.canvas = document.getElementById('my_canvas')
    state.context = state.canvas.getContext('2d')
    state.canvas.width = 1000
    state.canvas.height = 600
  },
}

const constructors = {
  MakeHero,
}

let { heroObj, hero } = state

methods.setup()

state.heroObj.src = state.hero.imgPath
state.heroObj.onload = () => {
  state.context.drawImage(heroObj, hero.x, hero.y, hero.width, hero.height)
}

export default { state, methods, constructors }
