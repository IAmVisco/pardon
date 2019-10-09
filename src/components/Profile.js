import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FaHistory, FaPowerOff } from 'react-icons/fa'
import '../styles/Profile.scss'

const Profile = (props) => {
  const [name] = useState('Kekster')
  const [balance] = useState(100)

  const logout = () => {
    localStorage.removeItem('token')
    props.history.push('/')
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
      <Row className='justify-content-center'>
        <Col lg={4} md={8} className='text-center profile-col'>
          <div className='avatar--container'>
            <div className='avatar--content' />
          </div>
          <div className='mt-4 mb-5'>
            <h3>{name}</h3>
            <h3>Balance: {balance}</h3>
          </div>
          <Button variant='primary' className='mr-3'>Show QR</Button>
          <Button variant='primary'>Open QR Reader</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
