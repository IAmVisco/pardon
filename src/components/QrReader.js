import React, { useEffect, useState, useRef } from 'react'
import jsQR from 'jsqr'

const QrReader = () => {
  let constraintDimensions = null
  const { height, width } = window.screen
  if (window.screen.orientation.type.includes('landscape')) {
    constraintDimensions = { width, height }
  } else {
    // noinspection JSSuspiciousNameCombination
    constraintDimensions = {
      width: height,
      height: width
    }
  }
  const constraints = {
    video: {
      facingMode: 'environment',
      ...constraintDimensions
    }
  }
  const canvasRef = useRef()
  const contextRef = useRef()
  const video = document.createElement('video')
  const [stream, changeStream] = useState(null)

  const tick = () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      if (!contextRef.current || !canvasRef.current) {
        return
      }

      const canvas = canvasRef.current
      const ctx = contextRef.current
      canvas.hidden = false

      canvas.height = video.videoHeight
      canvas.width = video.videoWidth
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })

      if (code) {
        navigator.vibrate(200)
        console.log(code)
        video.pause()
      }
    }
    window.requestAnimationFrame(tick)
  }
  useEffect(() => {
    contextRef.current = canvasRef.current.getContext && canvasRef.current.getContext('2d')
    window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      changeStream(stream)
      video.srcObject = stream
      video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
      video.play()
      window.requestAnimationFrame(tick)
    })
    return () => {
      stream && stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
    // eslint-disable-next-line
  }, [canvasRef])

  return (
    <>
      <canvas ref={canvasRef} hidden />
    </>
  )
}

export default QrReader
