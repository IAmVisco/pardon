import React from 'react'
import { Button } from 'react-bootstrap'
import '../styles/Profile.scss'

const Profile = (props) => {
  const logout = (e) => {
    localStorage.removeItem('token')
    props.history.push('/')
  }

  return (
    <div>
      <p>Profile</p>
      <Button variant='danger' onClick={logout}>Log out</Button>
      <br />
      <Button variant='outline-primary' className='mr-3'>Show QR</Button>
      <Button variant='primary'>Open QR Reader</Button>
    </div>
  )
}

export default Profile
