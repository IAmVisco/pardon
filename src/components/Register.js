import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
// import api from '../api'
import '../styles/AuthForm.scss'
import { toggleButton } from '../utils'

const Register = (props) => {
  const [email, changeEmail] = useState('')
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const [passwordConfirmation, changePasswordConfirmation] = useState('')
  // const [error, changeError] = useState('Invalid credentials')
  const form = React.createRef()
  let spinnerNode = React.createRef()
  let buttonNode = React.createRef()
  //   errors: {
  //     email: [],
  //     username: [],
  //     password: []
  //   },
  //   emailTaken: false,
  //   usernameTaken: false

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // eslint-disable-next-line react/prop-types
      props.history.push('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    toggleButton(buttonNode, spinnerNode)
    if (!e.currentTarget.checkValidity()) {
      toggleButton(buttonNode, spinnerNode)
      form.classList.add('was-validated')
    }
    console.log(email, username, password, passwordConfirmation)

    // api.user.register(this.state.email, this.state.username, this.state.password).then(() => {
    //   this.props.dispatch({ type: LOGIN_USER })
    //   api.user.get().then((res) => {
    //     this.props.dispatch({ type: SAVE_USER, payload: res.data.user })
    //     this.props.history.push('/')
    //   })
    // }).catch((err) => {
    //   this.setState({ errors: err.response.data.errors })
    // }).finally(() => {
    //   toggleButton(this.button, this.spinner)
    // })
  }
  return (
    <Container fluid>
      <Row className='justify-content-center'>
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
                type='text'
                name='username'
                placeholder='Username'
                onChange={(e) => changeUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='registerPassword'>
              <Form.Control
                required
                minLength='8'
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => changePassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='registerPasswordConfirmation'>
              <Form.Control
                required
                minLength='8'
                type='password'
                name='passwordConfirmation'
                placeholder='Password confirmation'
                onChange={(e) => changePasswordConfirmation(e.target.value)}
                isInvalid={passwordConfirmation !== password}
              />
              <Form.Control.Feedback type='invalid'>Passwords don't match.</Form.Control.Feedback>
            </Form.Group>
            <Button ref={node => buttonNode = node} variant='primary' type='submit'><b>Register</b>
              <Spinner
                ref={node => spinnerNode = node}
                animation='border'
                className='btn-spinner ml-1 d-none'
                size='sm'
              />
            </Button>
            <small>Have an account already? <Link to='/login'>Login</Link></small>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
