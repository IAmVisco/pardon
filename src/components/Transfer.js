import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import api from '../api'
import '../styles/Transfer.scss'
import { toggleButton } from '../utils'

const Transfer = ({ location, history }) => {
  const quickChangeAmount = 100
  const [transferUsername, changeTransferUsername] = useState('​')
  const [transferAmount, changeTransferAmount] = useState(0)
  const id = location.state && location.state.data
  let buttonNode = null
  let spinnerNode = null

  const handleInputChange = (e) => {
    changeTransferAmount(+e.target.value)
  }

  const handleSend = async () => {
    toggleButton(buttonNode, spinnerNode)
    try {
      await api.transfer.transfer(id, transferAmount)
      history.push('/profile')
    } catch (err) {
      console.error(err.data)
      toggleButton(buttonNode, spinnerNode)
    }
  }

  const handleQuickChangeClick = (changeValue) => {
    if (changeValue <= 0 && transferAmount < quickChangeAmount) {
      changeTransferAmount(0)
      return
    }
    changeTransferAmount(transferAmount + +changeValue)
  }

  useEffect(() => {
    if (!id) {
      history.push('/profile')
      return
    }

    const fetchUser = async () => {
      const res = await api.user.getUser(id)
      const { userName } = res.data
      changeTransferUsername(userName)
    }

    fetchUser()
    // eslint-disable-next-line
  }, [])

  return id
    ? (
      <Container>
        <Row className='justify-content-center align-items-center full-vh-row'>
          <Col lg={4} md={8} className='text-center'>
            <div className='avatar--container'>
              <div className='avatar--content' />
            </div>
            <div className='mt-4 mb-5'>
              <h3>{transferUsername}</h3>
            </div>
            <input
              type='number'
              placeholder='Amount'
              className='points-input mb-3'
              value={transferAmount}
              onChange={handleInputChange}
            />
            <div className='mb-5'>
              <Button
                variant='secondary'
                className='btn-shadow btn-quick-transfer mr-2'
                onClick={() => handleQuickChangeClick(-quickChangeAmount)}
              >
                {-quickChangeAmount}
              </Button>
              <Button
                variant='secondary'
                className='btn-shadow btn-quick-transfer ml-2'
                onClick={() => handleQuickChangeClick(quickChangeAmount)}
              >
                {'+' + quickChangeAmount}
              </Button>
            </div>
            <Button
              ref={node => buttonNode = node}
              variant='primary'
              className='btn-shadow btn-send mt-5 mb-2'
              onClick={handleSend}
            >
              Send
              <Spinner
                ref={node => spinnerNode = node}
                animation='border'
                className='btn-spinner ml-1 d-none'
                size='sm'
              />
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
