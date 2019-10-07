import React from 'react'
import { Link, Redirect } from 'react-router-dom'

function App() {
  return (
    <>
      <Link to='/login'>Login</Link>
      <br />
      <Link to='/register'>Register</Link>
    </>
)
}

export default App
