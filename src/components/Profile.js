import React from 'react'
import { Button } from 'react-bootstrap'

const Profile = (props) => {
  return (
    <div>
      Profile
      <Button variant='danger' onClick={(e) => {
        localStorage.removeItem('token')
        props.history.push('/')
      }}>Log out</Button>
    </div>
  )
}

export default Profile
