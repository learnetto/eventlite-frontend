import React from 'react'
import PropTypes from 'prop-types'
import EventSummary from './EventSummary'

const EventsList = props => (
  <div>
    {props.events.map(function(event){
      return(
        <EventSummary key={event.id} event={event} />
      )
    })}
  </div>
)

EventsList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventsList
