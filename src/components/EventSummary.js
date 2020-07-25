import React from 'react'
import PropTypes from 'prop-types'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import moment from 'moment'

const EventSummary = props => (
  <Col md={4}>
    <a href={`/events/${props.event.id}`} className="event-card-link">
      <Card className="mb-4 event-card">
        <Card.Img variant="top" src={props.event.image_url} />
        <Card.Body>
          <Card.Text className="event-card-datetime">
            {moment(props.event.start_datetime).format('ddd, MMM DD, YYYY hh:mm A z')}
          </Card.Text>
          <Card.Title>
            {props.event.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </a>
  </Col>
)

Event.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start_datetime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  })
}

export default EventSummary
