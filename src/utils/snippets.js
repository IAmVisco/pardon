const video = document.createElement('video') // is not injected into DOM
const canvasElement = document.getElementById('canvas')
const canvas = canvasElement.getContext('2d')
const loadingMessage = document.getElementById('loadingMessage')
const outputContainer = document.getElementById('output')
const outputMessage = document.getElementById('outputMessage')
const outputData = document.getElementById('outputData')

// Use facingMode: environment to attempt to get the front camera on phones
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (stream) {
  video.srcObject = stream
  video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
  video.play()
  requestAnimationFrame(tick)
})

function tick () {
  loadingMessage.innerText = '⌛ Loading video...'
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true
    canvasElement.hidden = false
    outputContainer.hidden = false

    canvasElement.height = video.videoHeight
    canvasElement.width = video.videoWidth
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)
    const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    })
    if (code) {
      outputMessage.hidden = true
      outputData.parentElement.hidden = false
      outputData.innerText = code.data
    } else {
      outputMessage.hidden = false
      outputData.parentElement.hidden = true
    }
  }
  requestAnimationFrame(tick)
}

function declOfNum (number, titles) {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[(number % 100 > 4 && number % 100 < 20)
    ? 2
    : cases[(number % 10 < 5) ? number % 10 : 5]]
}

declOfNum(2, ['найдена', 'найдено', 'найдены'])
