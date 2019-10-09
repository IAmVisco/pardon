import jsQR from 'jsqr'

self.addEventListener('message', (event) => {
  const { data, width, height } = event.data
  const code = jsQR(data, width, height, {
    inversionAttempts: 'dontInvert'
  })
  if (code && code.data) {
    postMessage(code)
  }
})
