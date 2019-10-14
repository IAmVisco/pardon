import React from 'react'
import dayjs from 'dayjs'
import { Col, Row } from 'react-bootstrap'

const HistoryEntry = ({ userName, amount, dateTime }) => {
  return (
    <>
      <Row>
        <Col xs={2}>{localStorage.getItem('userName')}</Col>
        <Col xs={7} className='text-center'>{dayjs(dateTime).format('DD.MM.YYYY HH:MM')} <br /> {amount}</Col>
        <Col xs={2}>{userName}</Col>
      </Row>
    </>
  )
}

export default HistoryEntry
