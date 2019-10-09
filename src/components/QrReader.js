import React, { useEffect, useRef } from 'react'
// eslint-disable-next-line
import DecoderWorker from 'worker-loader!../utils/decoder.worker'

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
  const workerRef = useRef()
  const video = document.createElement('video')

  const tick = () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      if (!contextRef.current || !canvasRef.current) {
        return
      }

      const canvas = canvasRef.current
      const ctx = contextRef.current
      const worker = workerRef.current
      canvas.hidden = false

      canvas.height = video.videoHeight
      canvas.width = video.videoWidth
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      worker.postMessage(imageData)
    }
    window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    console.log('ue')
    workerRef.current = new DecoderWorker()
    workerRef.current.addEventListener('message', (e) => {
      console.log('Posted back', e.data)
      const code = e.data
      if (code) {
        navigator.vibrate(200)
        // console.log(code)

        props.history.push({
          pathname: '/transfer',
          state: {
            data: code.data
          }
        })
      }
    })

    contextRef.current = canvasRef.current.getContext && canvasRef.current.getContext('2d')
    window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      window.streamRef = stream // TODO: figure out why state doesn't work but window does
      video.srcObject = stream
      video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
      video.play()
      window.requestAnimationFrame(tick)
    })

    return () => {
      workerRef.current && workerRef.current.terminate()
      window.streamRef && window.streamRef.getTracks().forEach((track) => {
        track.stop()
      })
    }
    // eslint-disable-next-line
  }, [canvasRef])

  return (
    <canvas ref={canvasRef} hidden />
  )
}

export default QrReader
