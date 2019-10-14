import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import api from '../api'
import '../styles/AuthForm.scss'
import { toggleButton } from '../utils'

const Login = ({ history }) => {
  const minPasswordLength = 6
  const maxPasswordLength = 64
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [error, changeError] = useState('Incorrect username/password')
  const formRef = useRef()
  const buttonRef = useRef()
  const spinnerRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/profile')
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = formRef.current
    const button = buttonRef.current
    const spinner = spinnerRef.current
    const passwordNode = passwordRef.current

    passwordNode.setCustomValidity('')
    form.classList.add('was-validated')
    if (!e.currentTarget.checkValidity()) {
      return
    }

    toggleButton(button, spinner)
    try {
      const res = await api.user.login(email, password)
      if (!res.data) {
        passwordNode.setCustomValidity('invalid')
      }

      const { token } = res.data
      localStorage.setItem('token', token)
      history.push('/profile')
    } catch (err) {
      toggleButton(button, spinner)
      console.error(err.response)
      const { Authorization, errors } = err.response.data
      if (Authorization) {
        changeError(Authorization[0])
      } else {
        changeError(Object.values(errors)[0][0])
      }
      passwordNode.setCustomValidity('invalid')
    }
  }

  return (
    <Container fluid>
      <Row className='justify-content-center align-items-center full-vh-row'>
        <Col lg={4} md={8}>
          <Form
            ref={formRef}
            noValidate
            className='login-form'
            onSubmit={handleSubmit}
          >
            <h2>Login</h2>
            <Form.Group controlId='loginEmail'>
              <Form.Control
                required
                type='email'
                placeholder='Email'
                onChange={(e) => changeEmail(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                The Email field is not a valid e-mail address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='loginPassword'>
              <Form.Control
                ref={node => passwordRef.current = node}
                required
                minLength={minPasswordLength}
                maxLength={maxPasswordLength}
                type='password'
                placeholder='Password'
                onChange={(e) => changePassword(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
            </Form.Group>
            <Button
              ref={node => buttonRef.current = node}
              className='btn-shadow btn-full-width'
              variant='primary'
              type='submit'
            >
              Login
              <Spinner
                ref={node => spinnerRef.current = node}
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
