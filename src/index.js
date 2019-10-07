import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/scss/bootstrap.scss'
import './index.scss'
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'
import Login from './components/Login'
import Register from './components/Register'

const routing = (
  <Router>
    <Route exact path='/' component={App} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/register' component={Register} />
    {/* <Route exact path='/profile' component={RequireAuth(Profile)} /> */}
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.register()
