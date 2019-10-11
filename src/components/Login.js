import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import api from '../api'
import '../styles/AuthForm.scss'
import { toggleButton } from '../utils'

const Login = (props) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [error] = useState('Invalid credentials')
  const passwordNode = useRef()
  const form = useRef()
  let spinnerNode = useRef()
  let buttonNode = useRef()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.history.push('/profile')
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    toggleButton(buttonNode, spinnerNode)

    passwordNode.current.setCustomValidity('')
    form.current.classList.add('was-validated')
    if (!e.currentTarget.checkValidity()) {
      toggleButton(buttonNode, spinnerNode)
      return
    }

    try {
      const res = await api.user.login(email, password)
      if (!res.data) {
        passwordNode.current.setCustomValidity('invalid')
      }
      const { token, login, balance } = res.data
      localStorage.setItem('token', token)
      props.history.push('/profile', { login, balance })
    } catch (err) {
      console.error(err.response)
      toggleButton(buttonNode, spinnerNode)
      // changeError(err.response.data.data)
      // passwordNode.setCustomValidity(error)
    }
  }

  return (
    <Container fluid>
      <Row className='justify-content-center align-items-center full-vh-row'>
        <Col lg={4} md={8}>
          <Form
            ref={form}
            noValidate
            className='login-form'
            onSubmit={handleSubmit}
          >
            <h2>Login</h2>
            <Form.Group controlId='loginEmail'>
              <Form.Control
                required
                type='text'
                name='email'
                placeholder='Email'
                onChange={(e) => changeEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='loginPassword'>
              <Form.Control
                ref={passwordNode}
                required
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => changePassword(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
            </Form.Group>
            <Button ref={node => buttonNode = node} variant='primary' className='btn-shadow' type='submit'>
              <b>Login</b>
              <Spinner
                ref={node => spinnerNode = node}
                animation='border'
                className='btn-spinner ml-1 d-none'
                size='sm'
              />
            </Button>
            <small className='d-block'>Don't have an account yet? <Link to='/register'>Register</Link></small>
            <small><Link to='/'>Go back</Link></small>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
