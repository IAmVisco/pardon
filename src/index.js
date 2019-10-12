import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/scss/bootstrap.scss'
import * as serviceWorker from './serviceWorker'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import './index.scss'
import App from './components/App'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import QrReader from './components/QrReader'
import Transfer from './components/Transfer'

const Routing = withRouter(({ location }) => {
  return (
    <TransitionGroup className='transition-group'>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 200, exit: 200 }}
        classNames='fade-route'
      >
        <div className='route-section'>
          <Switch location={location}>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/qr-reader' component={QrReader} />
            <Route exact path='/transfer' component={Transfer} />
          </Switch>
        </div>
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
