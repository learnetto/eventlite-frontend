import React from 'react'
import PropTypes from 'prop-types'
import EventSummary from './EventSummary'
import Row from 'react-bootstrap/Row'

const EventsList = props => (
  <Row>
    {props.events.map(function(event){
      return(
        <EventSummary key={event.id} event={event} />
      )
    })}
  </Row>
)

EventsList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventsList
