import React, { useEffect, useState, useRef } from 'react'
import jsQR from 'jsqr'
import validate from 'uuid-validate'
import '../styles/QrReader.scss'
import { UUID_V4 } from '../utils'

const QrReader = ({ history }) => {
  const canvasRef = useRef()
  const contextRef = useRef()
  const [hourglassVisible, changeHourglassVisible] = useState(true)
  const [permissionMessage, changePermissionMessage] = useState('If you see camera permission prompt - accept it.')
  const video = document.createElement('video')
  const { height, width, orientation } = window.screen
  // noinspection JSSuspiciousNameCombination
  const constraintDimensions = orientation && orientation.type.includes('landscape')
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
        if (validate(qrData.data, UUID_V4)) {
          history.push('/transfer', { data: qrData.data })
          return
        } else {
          window.alert('That QR code doesn\'t seem valid')
        }
      }
    }
    window.requestAnimationFrame(drawFrame)
  }

  useEffect(() => {
    if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
      changePermissionMessage('Seems like your device/browser doesn\'t support this application')
      return
    }

    contextRef.current = canvasRef.current.getContext && canvasRef.current.getContext('2d')
    window.navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      window.streamRef = stream // TODO: figure out why state doesn't work but window does
      video.srcObject = stream
      video.setAttribute('playsinline', '')
      video.setAttribute('autoplay', '')
      video.setAttribute('muted', '')
      video.play()
      window.requestAnimationFrame(drawFrame)
      changeHourglassVisible(false)
    })

    return () => {
      window.streamRef && window.streamRef.getTracks().forEach(track => track.stop())
    }
    // eslint-disable-next-line
  }, [canvasRef])

  return (
    <>
      <div className={hourglassVisible ? 'd-block text-center' : 'd-none'}>
        <span>Accessing camera... Hold tight! </span>
        <span className='hourglass' role='img' aria-label='hourglass'>⏳</span>
        <br />
        <span>{permissionMessage}</span>
      </div>
      <canvas className={!hourglassVisible ? 'd-block' : 'd-none'} ref={canvasRef} />
    </>
  )
}

export default QrReader
