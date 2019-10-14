import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import api from '../../api'
import '../../styles/History.scss'
import HistoryEntry from './HistoryEntry'

const History = () => {
  const [historyEntries, changeHistoryEntries] = useState()

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await api.transfer.history()
      changeHistoryEntries(res.data)
    }

    fetchHistory()
  })

  return (
    <Container fluid>
      <Row className='justify-content-center align-items-center full-vh-row'>
        <Col lg={4} md={8} className={historyEntries ? '' : 'text-center'}>
          {historyEntries
            ? historyEntries.map((entry, i) => (
              <>
                <HistoryEntry key={i} {...entry} />
                <hr className='history-delimiter' />
              </>))
            : <Spinner animation='border' size='md' />}
        </Col>
      </Row>
    </Container>
  )
}

export default History
