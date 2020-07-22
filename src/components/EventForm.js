import React from 'react'
import PropTypes from 'prop-types'
import FormErrors from './FormErrors'
import validations from '../validations'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

class EventForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: {value: '', valid: false},
      start_datetime: {value: '', valid: false},
      location: {value: '', valid: false},
      image_url: {value: '', valid: false},
      description: {value: '', valid: false},
      formErrors: {},
      formValid: false,
      editing: false
    }
  }

  static formValidations = {
    title: [
      (value) => { return(validations.checkMinLength(value, 3)) }
    ],
    start_datetime: [
      (value) => { return(validations.checkMinLength(value, 1)) },
      (value) => { return(validations.timeShouldBeInTheFuture(value)) }
    ],
    location: [
      (value) => { return(validations.checkMinLength(value, 1)) }
    ],
    image_url: [],
    description: []
  }

  componentDidMount () {
    if(this.props.match) {
      this.setState({editing: this.props.match.path === '/events/:id/edit'})
      axios({
        method: "GET",
        url: `http://localhost:3001/events/${this.props.match.params.id}`,
        headers: JSON.parse(localStorage.getItem('user'))
      }).then((response) => {
        this.setState({
          title: {valid: true, value: response.data.title},
          location: {valid: true, value: response.data.location},
          start_datetime: {valid: true, value: new Date(response.data.start_datetime).toDateString()},
          image_url: {valid: true, value: response.data.image_url},
          description: {valid: true, value: response.data.description},
        }, this.validateForm)
      });
    }
  }

  handleInput = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    const newState = {}
    newState[name] = {...this.state[name], value: value}
    this.setState(newState, () => this.validateField(name, value, EventForm.formValidations[name]))
  }

  handleSubmit = e => {
    e.preventDefault()

    const event = {
      title: this.state.title.value,
      start_datetime: this.state.start_datetime.value,
      location: this.state.location.value,
      image_url: this.state.image_url.value,
      description: this.state.description.value,
    }
    const method = this.state.editing ? 'PUT' : 'POST'
    const url = this.state.editing ? `http://localhost:3001/events/${this.props.match.params.id}` : 'http://localhost:3001/events'

    axios({
      method: method,
      url: url,
      headers: JSON.parse(localStorage.user),
      data: { event: event }
    })
    .then(response => {
      if(!this.state.editing && this.props.onSuccess) {
        this.props.onSuccess(response.data)
      }
      this.resetFormErrors();
    })
    .catch(error => {
      this.setState({formErrors: error.response.data, formValid: false})
    })
  }

  validateField(fieldName, fieldValue, fieldValidations) {
    let fieldValid = true
    let errors = fieldValidations.reduce((errors, validation) => {
      let [valid, fieldError] = validation(fieldValue)
      if(!valid) {
        errors = errors.concat([fieldError])
      }
      return(errors);
    }, []);

    fieldValid = errors.length === 0

    const newState = {formErrors: {...this.state.formErrors, [fieldName]: errors}}
    newState[fieldName] = {...this.state[fieldName], valid: fieldValid}
    this.setState(newState, this.validateForm)
  }

  validateForm() {
    this.setState({formValid: this.state.title.valid && this.state.location.valid && this.state.start_datetime.valid})
  }

  resetFormErrors () {
    this.setState({formErrors: {}})
  }

  deleteEvent = () => {
    if(window.confirm("Are you sure you want to delete this event?")) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3001/events/${this.props.match.params.id}`,
        headers: JSON.parse(localStorage.getItem('user'))
      }).then((response) => {
        this.props.history.push('/')
      })
    }
  }

  render() {
    return (
      <Container className="event-form-container">
        <div className={!this.state.editing && "card"}>
          <h4>{this.state.editing ? "Edit Event" : "Create a new Event"}</h4>
          {this.state.editing &&
          <a href={`/events/${this.props.match.params.id}`} className="float-right">
            View Event
          </a>
          }
          <FormErrors formErrors = {this.state.formErrors} />
          <Form
            inline={!this.state.editing}
            onSubmit={this.handleSubmit}>
            <Form.Label htmlFor="title" srOnly>
              Title
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="title"
              name="title"
              placeholder="Title"
              value={this.state.title.value}
              onChange={this.handleInput}
            />
            <Form.Label htmlFor="start_datetime" srOnly>
              Start date
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="start_datetime"
              name="start_datetime"
              placeholder="Start Date"
              value={this.state.start_datetime.value}
              onChange={this.handleInput}
            />
            <Form.Label htmlFor="location" srOnly>
              Location
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="location"
              name="location"
              placeholder="Location"
              value={this.state.location.value}
              onChange={this.handleInput}
            />
            {this.state.editing &&
            <>
            <Form.Label htmlFor="image_url" srOnly>
              Image URL
            </Form.Label>
            <Form.Control
              className="mb-2 mr-sm-2"
              id="image_url"
              name="image_url"
              placeholder="Image URL"
              value={this.state.image_url.value}
              onChange={this.handleInput}
            />
            <Form.Label htmlFor="description" srOnly>
              Description
            </Form.Label>
            <Form.Control
              as="textarea" rows="3"
              className="mb-2 mr-sm-2"
              id="description"
              name="description"
              placeholder="Description"
              value={this.state.description.value}
              onChange={this.handleInput}
            />
            </>
            }
            <Button variant="danger" type="submit" className="mb-2  mr-sm-2 " disabled={!this.state.formValid} >
              {this.state.editing ? "Update Event" : "Create Event"}
            </Button>
            {this.state.editing &&
             <Link href="#" className="float-right text-muted mb-2 mr-sm-2" onClick={this.deleteEvent}>Delete Event</Link>
            }
          </Form>
        </div>
      </Container>
    )
  }
}

EventForm.propTypes = {
  onSuccess: PropTypes.func,
}

export default EventForm
