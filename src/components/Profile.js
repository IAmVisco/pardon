import React, { useEffect, useRef, useState } from 'react'
import QrCode from 'qrcode'
import CountUp from 'react-countup'
import { MdHistory, MdPowerSettingsNew } from 'react-icons/md'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Container, Row } from 'react-bootstrap'
import api from '../api'
import '../styles/Profile.scss'

const Profile = ({ history }) => {
  const iconSize = '1.8em'
  const canvasRef = useRef()
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const copyQrText = `${(isMobile ? 'Tap' : 'Click')} to copy`
  const [username, changeUsername] = useState(localStorage.getItem('userName') || '​')
  const [balance, changeBalance] = useState(+localStorage.getItem('balance') || 0)
  const [id, changeId] = useState(localStorage.getItem('id') || '')
  const [qrVisible, changeQrVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.user.getSelf()
        if (!userData.data) {
          return
        }

        const { userName, balance, id } = userData.data
        localStorage.setItem('id', id)
        localStorage.setItem('balance', balance)
        localStorage.setItem('userName', userName)
        changeId(id)
        changeBalance(balance)
        changeUsername(userName)
        QrCode.toCanvas(canvasRef.current, id, { width: 200 })
      } catch (err) {
        if (err.response.status === 401) {
          logout()
        }
        console.error(err.data)
      }
    }

    fetchData()
    // eslint-disable-next-line
  }, [])

  const logout = () => {
    localStorage.clear()
    history.push('/')
  }

  // eslint-disable-next-line
  const renderCountUp = ({ countUpRef }) => <h3 ref={countUpRef} />

  const toggleQr = () => changeQrVisible(!qrVisible)

  const copyId = () => navigator.clipboard.writeText(id)

  return (
    <Container fluid>
      <Row className='justify-content-right'>
        <Col lg={12}>
          <div className='sm-btn' title='Logout' onClick={logout}>
            <MdPowerSettingsNew size={iconSize} />
          </div>
          <div className='sm-btn' title='Transaction history' onClick={() => history.push('/history')}>
            <MdHistory size={iconSize} className='icon-history' />
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center align-items-center profile-row'>
        <Col lg={4} md={8} className='text-center'>
          <div className='avatar--container'>
            <div
              className={'avatar--content' + (qrVisible ? ' transparent' : '')}
              onClick={() => console.log('change pic')}
            />
            <canvas
              className={'avatar--canvas profile-fade-in m-auto btn-shadow' + (qrVisible ? '' : ' transparent')}
              onClick={copyId}
              ref={canvasRef}
            />
          </div>
          <div className='mt-4 mb-5'>
            <small className={'profile-fade-in' + (qrVisible ? '' : ' transparent')}>{copyQrText}</small>
            <h3>{username}</h3>
            <CountUp
              delay={0}
              duration={1}
              end={balance}
              prefix='Balance: '
            >
              {renderCountUp}
            </CountUp>
          </div>
          <Button
            variant='primary'
            className='btn-shadow mr-2'
            onClick={toggleQr}
          >
            {(qrVisible ? 'Hide' : 'Show') + ' QR'}
          </Button>
          <LinkContainer to='/qr-reader'>
            <Button variant='primary' className='btn-shadow ml-2'>Scan QR</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
