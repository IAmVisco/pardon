import React, { useEffect, useRef, useState } from 'react'
import { MdCheck } from 'react-icons/md'
import { Link, Redirect } from 'react-router-dom'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import api from '../api'
import '../styles/Transfer.scss'
import { toggleButton } from '../utils'

const Transfer = ({ location, history }) => {
  const buttonRef = useRef()
  const spinnerRef = useRef()
  const checkId = 'icon-check'
  const quickChangeAmount = 100
  const [transferAmount, changeTransferAmount] = useState(0)
  const [transferUsername, changeTransferUsername] = useState('​')
  const [transferredStatus, changeTransferredStatus] = useState(false)
  const id = location.state && location.state.data

  const handleInputChange = (e) => {
    changeTransferAmount(+e.target.value)
  }

  const handleSend = async () => {
    if (transferredStatus) {
      return
    }

    const button = buttonRef.current
    const spinner = spinnerRef.current

    toggleButton(button, spinner)
    try {
      await api.transfer.transfer(id, transferAmount)
      changeTransferredStatus(true)
      toggleButton(button, spinner)
      button.classList.add('btn-transfer-success')
      document.getElementById(checkId).removeAttribute('hidden')
      setTimeout(() => history.push('/profile'), 500)
    } catch (err) {
      toggleButton(button, spinner)
      console.error(err.data)
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
              ref={node => buttonRef.current = node}
              variant='primary'
              className='btn-shadow btn-send mt-5 mb-2'
              onClick={handleSend}
            >
              Send
              <Spinner
                ref={node => spinnerRef.current = node}
                animation='border'
                className='btn-spinner ml-1 d-none'
                size='sm'
              />
              <MdCheck size='1.5em' id={checkId} hidden />
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
