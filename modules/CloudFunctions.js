function setCloudProps(cloud) {
  cloud.imgPath = 'images/cloud-clipart-transparent-9.png'
  cloud.x = canvas.width
  cloud.y = Math.floor(Math.random() * 450)
  cloud.cloudWidth = Math.floor(Math.random() * 240) + 120
  cloud.cloudHeight = cloudName.cloudWidth * 0.55
}
function globalCloudFunction(cloud) {
  if (!imgObj) {
    imgObj = new Image()
    imgObj.src = cloud.imgPath
  }
  context.clearRect(
    cloud.x,
    cloud.y,
    cloud.cloudWidth + cloud.speed,
    cloud.cloudHeight
  )
  context.drawImage(
    imgObj,
    cloud.x,
    cloud.y,
    cloud.cloudWidth,
    cloud.cloudHeight
  )
}
function rerunCloud(cloud) {
  if (cloud.x > -cloud.cloudWidth - 20) {
    cloud.x = cloud.x - cloud.speed
    if (cloud === cloud1) {
      requestAnimationFrame(animateCloud1)
    } else {
      requestAnimationFrame(animateCloud2)
    }
  } else {
    setCloudProps(cloud)
    if (cloud === cloud1) {
      if (cloud.speed === 11) animateCloud2()
    }
    if (cloud.speed < 15) cloud.speed++
    if (cloud === cloud1) {
      requestAnimationFrame(animateCloud1)
    } else {
      requestAnimationFrame(animateCloud2)
    }
  }
}

export default { setCloudProps, globalCloudFunction, rerunCloud }
