import React, { useEffect, useRef } from 'react'
import QrScanner from 'qr-scanner'
// eslint-disable-next-line
import QrScannerWorkerPath from '!!file-loader!../../node_modules/qr-scanner/qr-scanner-worker.min.js';

const QrReader = (props) => {
  const videoRef = useRef()
  // const video = document.createElement('video')

  const gotResult = (result) => {
    props.history.push('/transfer', { data: result })
    // console.log(result)
  }

  useEffect(() => {
    QrScanner.WORKER_PATH = QrScannerWorkerPath
    const video = videoRef.current
    const qrScanner = new QrScanner(video, gotResult)
    qrScanner.start()

    return () => {
      qrScanner.destroy()
    }
    // eslint-dis1able-next-line
  })

  return (
    <video playsInline muted ref={videoRef} />
  )
}

export default QrReader
