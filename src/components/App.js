import React from 'react'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Col, Container, Row } from 'react-bootstrap'

function App() {
  return (
    localStorage.getItem('token')
      ? <Redirect to='/profile' />
      : (
        <Container fluid>
          <Row className='justify-content-center align-items-center full-vh-row'>
            <Col lg={4} md={8} className='text-center app-col'>
              <h2 className='mb-3'>Pardon</h2>
              <LinkContainer to='/login'>
                <Button variant='primary' className='btn-full-width btn-shadow'>Login</Button>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Button variant='primary' className='btn-full-width btn-shadow'>Register</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      )
  )
}

export default App
