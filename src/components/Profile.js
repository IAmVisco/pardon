import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FaHistory, FaPowerOff } from 'react-icons/fa'
import '../styles/Profile.scss'

const Profile = (props) => {
  const name = 'Kekster'
  const balance = '100'

  const logout = (e) => {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  return (
    <Container fluid>
      <Row className='justify-content-right'>
        <Col lg={12} md={8}>
          <div className="sm-btn">
            <div className="pb-1">
              <FaPowerOff size="1.5em" />
            </div>
          </div>
          <div className="sm-btn">
            <div className="pb-1">
              <FaHistory size="1.5em" />
            </div>
          </div>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col lg={4} md={8} className='text-center profile-col'>
          <div className='avatar--container'>
            <div className='avatar--content'></div>
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
