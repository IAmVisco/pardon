import React, { useEffect, useRef } from 'react'
import jsQR from 'jsqr'

const QrReader = (props) => {
  const canvasRef = useRef()
  const contextRef = useRef()
  const video = document.createElement('video')
  const { height, width, orientation } = window.screen
  // noinspection JSSuspiciousNameCombination
  const constraintDimensions = orientation.type.includes('landscape')
    ? { width, height }
    : { width: height, height: width }

  const constraints = {
    video: {
      facingMode: 'environment',
      ...constraintDimensions
    }
  }

  const drawFrame = () => {
    const ctx = contextRef.current
    const canvas = canvasRef.current
    if (!canvas || !ctx) {
      window.requestAnimationFrame(drawFrame)
      return
    }

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight
      canvas.width = video.videoWidth
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const qrData = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })

      if (qrData && qrData.data) {
        navigator.vibrate(200) // doesn't work if user haven't tapped/focused on screen
        props.history.push('/transfer', { data: qrData.data })
      }
    }
    window.requestAnimationFrame(drawFrame)
  }
  useEffect(() => {
    contextRef.current = canvasRef.current.getContext && canvasRef.current.getContext('2d')
    window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      window.streamRef = stream // TODO: figure out why state doesn't work but window does
      video.srcObject = stream
      video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
      video.play()
      window.requestAnimationFrame(drawFrame)
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
