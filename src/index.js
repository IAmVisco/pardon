import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/scss/bootstrap.scss'
import './index.scss'
import App from './App'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import * as serviceWorker from './serviceWorker'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import QrReader from './components/QrReader'

const Routing = withRouter(({ location }) => {
  return (
    <TransitionGroup className='transition-group'>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 200, exit: 200 }}
        classNames='fade-route'
      >
        <section className='route-section'>
          <Switch location={location}>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/qr-reader' component={QrReader} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  )
})

const routing = (
  <Router>
    <Routing />
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
serviceWorker.register()
