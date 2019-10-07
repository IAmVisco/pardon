import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
// import api from '../api'
import '../styles/AuthForm.scss'
import { toggleButton, validationMessages } from '../utils'

class Register extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      email: [],
      username: [],
      password: []
    },
    emailTaken: false,
    usernameTaken: false
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    this.spinner = document.querySelector('.btn-spinner')
    this.button = document.querySelector('button[type=submit]')
    this.form = document.querySelector('.register-form')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    toggleButton(this.button, this.spinner)
    if (!e.currentTarget.checkValidity()) {
      toggleButton(this.button, this.spinner)
      this.form.classList.add('was-validated')
      return
    }

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

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col lg={4} md={8}>
            <Form
              noValidate
              className="register-form"
              onSubmit={this.handleSubmit}>
              <h2>Register</h2>
              <Form.Group controlId="registerEmail">
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  isInvalid={this.state.emailTaken} />
                <Form.Control.Feedback type="invalid">{this.state.emailTaken
                  ? validationMessages.takenEmailErrorText
                  : this.state.errors.email[0] || validationMessages.invalidEmailErrorText
                }</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="registerUsername">
                <Form.Control
                  required
                  minLength="4"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  isInvalid={this.state.usernameTaken} />
                <Form.Control.Feedback type="invalid">{this.state.usernameTaken
                  ? validationMessages.takenUsernameErrorText
                  : this.state.errors.username[0] || validationMessages.invalidUsernameErrorText
                }</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="registerPassword">
                <Form.Control
                  required
                  minLength="8"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange} />
                <Form.Control.Feedback type="invalid">
                  {this.state.errors.password[0] || 'Password must be at least 8 symbols long.'}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="registerPasswordConfirmation">
                <Form.Control
                  required
                  minLength="8"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Password confirmation"
                  onChange={this.handleChange}
                  isInvalid={this.state.passwordConfirmation !== this.state.password} />
                <Form.Control.Feedback type="invalid">Passwords don't match.</Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">Register
                <Spinner
                  animation="border"
                  className="btn-spinner ml-1 d-none"
                  size="sm" />
              </Button>
              <small>Have an account already? <Link to="/login">Login</Link></small>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Register
