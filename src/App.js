import React from 'react'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './styles/App.scss'

function App() {
  return (
    localStorage.getItem('token')
      ? <Redirect to='/profile' />
      : (
        <Container fluid>
          <Row className='justify-content-center'>
            <Col lg={4} md={8} className='text-center app-col'>
              <h2 className='mb-3'>Pardon</h2>
              <LinkContainer to='/login'>
                <Button variant='primary' className='app-btn'>Login</Button>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Button variant='primary' className='app-btn'>Register</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      )
  )
}

export default App
