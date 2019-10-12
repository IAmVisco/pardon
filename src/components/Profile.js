import React, { useEffect, useRef, useState } from 'react'
import QrCode from 'qrcode'
import CountUp from 'react-countup'
import { FaHistory, FaPowerOff } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Container, Row } from 'react-bootstrap'
import api from '../api'
import '../styles/Profile.scss'

const Profile = ({ history }) => {
  const canvasRef = useRef()
  const [name, changeName] = useState(localStorage.getItem('userName') || '​')
  const [balance, changeBalance] = useState(+localStorage.getItem('balance') || 0)
  const [QrVisible, changeQrVisible] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.user.getSelf()
        if (!userData.data) {
          return
        }

        const { userName, balance, id } = userData.data
        localStorage.setItem('userName', userName)
        localStorage.setItem('balance', balance)
        localStorage.setItem('id', id)
        changeName(userName)
        changeBalance(balance)
        QrCode.toCanvas(canvasRef.current, id, { width: 200 })
      } catch (err) {
        console.error(err.data)
      }
    }

    fetchData()
  }, [])

  const logout = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <Container fluid>
      <Row className='justify-content-right'>
        <Col lg={12}>
          <div className='sm-btn' onClick={logout}>
            <div>
              <FaPowerOff size='1.5em' />
            </div>
          </div>
          <div className='sm-btn'>
            <div>
              <FaHistory size='1.5em' />
            </div>
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center align-items-center profile-row'>
        <Col lg={4} md={8} className='text-center'>
          <div className='avatar--container'>
            <div className={'avatar--content' + (QrVisible ? ' transparent' : '')} />
            <canvas
              className={'avatar--canvas m-auto btn-shadow' + (QrVisible ? '' : ' transparent')}
              ref={canvasRef}
            />
          </div>
          <div className='mt-4 mb-5'>
            <h3>{name}</h3>
            <CountUp
              delay={0}
              duration={1}
              end={balance}
              prefix='Balance: '
            >
              {({ countUpRef }) => {
                // eslint-disable-next-line
                return <h3 ref={countUpRef} />
              }}
            </CountUp>
          </div>
          <Button
            variant='primary'
            className='btn-shadow mr-2'
            onClick={() => changeQrVisible(!QrVisible)}
          >
            {(QrVisible ? 'Hide' : 'Show') + ' QR'}
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
