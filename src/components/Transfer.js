import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import '../styles/Transfer.scss'

const Transfer = ({ location }) => {
  const quickChangeAmount = 100
  const [transferAmount, changeTransferAmount] = useState('')
  const id = (location.state && location.state.data) || 123

  const handleInputChange = (e) => {
    changeTransferAmount(e.target.value)
  }

  const handleSend = () => {
    // eslint-disable-next-line
    console.log(transferAmount, 'to', id)
  }

  return id
    ? (
      <Container>
        <Row className='justify-content-center align-items-center full-vh-row'>
          <Col lg={4} md={8} className='text-center'>
            <div className='avatar--container'>
              <div className='avatar--content' />
            </div>
            <div className='mt-4 mb-5'>
              <h3>Name</h3>
            </div>
            <input
              type='number'
              placeholder='Amount'
              className='points-input mb-3'
              value={transferAmount}
              onChange={handleInputChange}
            />
            <div className='mb-5'>
              <Button variant='secondary' className='btn-shadow btn-transfer mr-2'>{-quickChangeAmount}</Button>
              <Button variant='secondary' className='btn-shadow btn-transfer ml-2'>{'+' + quickChangeAmount}</Button>
            </div>
            <Button
              variant='primary'
              className='btn-shadow btn-send mt-5 mb-2'
              onClick={handleSend}
            >
              Send
            </Button>
            <small>
              Doesn't look right?
              <Link to='/profile'> Go back</Link>
            </small>
          </Col>
        </Row>
      </Container>
    )
    : <Redirect to='/profile' />
}

export default Transfer
