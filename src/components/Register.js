import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import api from '../api'
import '../styles/AuthForm.scss'
import { toggleButton } from '../utils'

const Register = ({ history }) => {
  const [email, changeEmail] = useState('')
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const [passwordConfirmation, changePasswordConfirmation] = useState('')
  const [userNameError, changeUserNameError] = useState('Username has to be 4 to 12 symbols long.')
  // const [error, changeError] = useState('Invalid credentials')
  const form = useRef()
  let spinnerNode = useRef()
  let buttonNode = useRef()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/profile')
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    toggleButton(buttonNode, spinnerNode)
    if (!e.currentTarget.checkValidity()) {
      toggleButton(buttonNode, spinnerNode)
      form.current.classList.add('was-validated')
      return
    }

    try {
      const res = await api.user.register(email, username, password)
      const { token } = res.data
      localStorage.setItem('token', token)
      history.push('/profile')
    } catch (err) {
      toggleButton(buttonNode, spinnerNode)
      if (err.response.status !== 200 || err.response.data.errors) {
        const { errors } = err.response.data
        if (errors.UserName) {
          changeUserNameError(errors.UserName[0])
        }
        console.error(err.response)
      }
    }
  }

  return (
    <Container fluid>
      <Row className='justify-content-center align-items-center full-vh-row'>
        <Col lg={4} md={8}>
          <Form
            ref={form}
            noValidate
            className='register-form'
            onSubmit={handleSubmit}
          >
            <h2>Register</h2>
            <Form.Group controlId='registerEmail'>
              <Form.Control
                required
                type='email'
                name='email'
                placeholder='Email'
                onChange={(e) => changeEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='registerUsername'>
              <Form.Control
                required
                minLength='4'
                maxLength='12'
                type='text'
                name='username'
                placeholder='Username'
                onChange={(e) => changeUsername(e.target.value)}
                isInvalid={username !== '' && (username.length < 4 || username.length > 12)}
              />
              <Form.Control.Feedback type='invalid'>{userNameError}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='registerPassword'>
              <Form.Control
                required
                minLength='6'
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => changePassword(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>Password should be at least 6 symbols long.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='registerPasswordConfirmation'>
              <Form.Control
                required
                minLength='6'
                type='password'
                name='passwordConfirmation'
                placeholder='Password confirmation'
                onChange={(e) => changePasswordConfirmation(e.target.value)}
                isInvalid={passwordConfirmation !== password}
              />
              <Form.Control.Feedback type='invalid'>Passwords don't match.</Form.Control.Feedback>
            </Form.Group>
            <Button
              ref={node => buttonNode = node}
              className='btn-shadow btn-full-width'
              variant='primary'
              type='submit'
            >
              Register
              <Spinner
                ref={node => spinnerNode = node}
                animation='border'
                className='btn-spinner ml-1 d-none'
                size='sm'
              />
            </Button>
            <small className='d-block'>Have an account already? <Link to='/login'>Login</Link></small>
            <small><Link to='/'>Go back</Link></small>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
