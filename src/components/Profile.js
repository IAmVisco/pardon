import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import '../styles/Profile.scss'

const Profile = (props) => {
  const name = 'Kekster'
  const balance = '100'

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col lg={4} md={8} className='text-center app-col'>
          <div className='avatar--container'>
            <div className='avatar--content'></div>
          </div>
          <div className='mt-4 mb-5'>
            <h3>{name}</h3>
            <h3>Balance: {balance}</h3>
          </div>
          <Button variant='outline-primary' className='mr-3'>Show QR</Button>
          <Button variant='primary'>Open QR Reader</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
