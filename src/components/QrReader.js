import React, { useEffect, useRef } from 'react'
import jsQR from 'jsqr'

const QrReader = (props) => {
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

  const tick = () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      if (!contextRef.current || !canvasRef.current) {
        window.requestAnimationFrame(tick)
        return
      }

      const canvas = canvasRef.current
      const ctx = contextRef.current

      canvas.height = video.videoHeight
      canvas.width = video.videoWidth
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })

      if (code && code.data) {
        navigator.vibrate(200)
        props.history.push('/transfer', { data: code.data })
      }
    }
    window.requestAnimationFrame(tick)
  }
  useEffect(() => {
    contextRef.current = canvasRef.current.getContext && canvasRef.current.getContext('2d')
    window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      window.streamRef = stream // TODO: figure out why state doesn't work but window does
      video.srcObject = stream
      video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
      video.play()
      window.requestAnimationFrame(tick)
    })

    return () => {
      window.streamRef && window.streamRef.getTracks().forEach(track => track.stop())
    }
    // eslint-disable-next-line
  }, [canvasRef])

  return (
    <canvas ref={canvasRef} />
  )
}

export default QrReader
