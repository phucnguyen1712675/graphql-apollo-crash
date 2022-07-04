import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BookDetails from './BookDetails'

import { useQuery } from '@apollo/client'
import { getBooks } from '../graphql-client/queries'

const BookList = () => {
  const [bookSelected, setBookSelected] = useState()

  const { loading, error, data } = useQuery(getBooks)

  if (loading) return <p>Loading books....</p>
  if (error) return <p>Error loading books!</p>

  return (
    <Row>
      <Col xs={8}>
        <Row xs={1} md={5} className="g-4">
          {data.books.map((book) => (
            <Col key={book.id}>
              <Card
                border="info"
                text="info"
                className="text-center shadow"
                onClick={setBookSelected.bind(this, book.id)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>{book.name}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Col>
        <BookDetails bookId={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookList
