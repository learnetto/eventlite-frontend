import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const formatDate = datetime =>
  new Date(datetime).toDateString()

function Event(props){
  const [event, setEvent] = useState({})
  return (
    <div className="event">
      <button onClick={() => setEvent({
        title: 'React Conf 2018',
        start_datetime: '25 October 2018',
        location: 'Henderson, Nevada',
        image_url: 'https://learnetto-blog.s3.amazonaws.com/blog/2020-07-17/1595000175824-reactconf2018.png',
        description: 'Dan Abramov introduces React Hooks!!!'
      })}> Set Event!</button>
      {event.currentUserCanEdit &&
        <Link to={`/events/${props.match.params.id}/edit`}>
          Edit
        </Link>
      }
      {event.image_url && <img src={event.image_url} />}
      <h2 className="event-title">{event.title}</h2>
      <div className="event-datetime">{formatDate(event.start_datetime)}</div>
      <div className="event-location">{event.location}</div>
      <div className="event-description">{event.description}</div>
    </div>
  )
}

export default Event
