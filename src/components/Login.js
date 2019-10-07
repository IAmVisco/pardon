import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import api from '../api'
import '../styles/AuthForm.scss'
import { toggleButton } from '../utils'

const Login = (props) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [error, changeError] = useState('Invalid credentials')
  let passwordNode; let spinnerNode; let buttonNode; const form = React.createRef()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    toggleButton(buttonNode, spinnerNode)
    console.log(email, password)
    // this.password.setCustomValidity('')
    // this.form.classList.add('was-validated')
    // if (!e.currentTarget.checkValidity()) {
    //   toggleButton(this.button, this.spinner)
    //   return
    // }
    // api.user.signIn(email, password).then(() => {
    //   api.user.get().then((res) => {
    //     this.props.history.push('/')
    //   })
    // }).catch((err) => {
    //   changeError(err.response.data.data)
    //   passwordNode.setCustomValidity(error)
    // }).finally(() => {
    //   toggleButton(this.button, this.spinner)
    // })
  }

  return (
    <Container fluid className='h-100vh'>
      <Row className='justify-content-center h-100vh'>
        <Col lg={4} md={8} className='h-100vh'>
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
                type='email'
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
            <Button ref={node => buttonNode = node} variant='primary' type='submit'>Login
              <Spinner
                ref={node => spinnerNode = node}
                animation='border'
                className='btn-spinner ml-1 d-none'
                size='sm'
              />
            </Button>
            <small>Don't have an account yet? <Link to='/register'>Register</Link></small>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
