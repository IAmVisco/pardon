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
  const form = useRef()
  const passwordNode = useRef()
  let buttonNode = useRef()
  let spinnerNode = useRef()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/profile')
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

      const { token } = res.data
      localStorage.setItem('token', token)
      history.push('/profile')
    } catch (err) {
      toggleButton(buttonNode, spinnerNode)
      console.error(err.response)
      const { Authorization, errors } = err.response.data
      if (Authorization) {
        changeError(Authorization[0])
      } else {
        changeError(Object.values(errors)[0][0])
      }
      passwordNode.current.setCustomValidity('invalid')
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
                placeholder='Email'
                onChange={(e) => changeEmail(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                The Email field is not a valid e-mail address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='loginPassword'>
              <Form.Control
                ref={passwordNode}
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
              ref={node => buttonNode = node}
              className='btn-shadow btn-full-width'
              variant='primary'
              type='submit'
            >
              Login
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
