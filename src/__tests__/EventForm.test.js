import React from "react"
import { render, fireEvent } from "@testing-library/react"
import EventForm from "../components/EventForm"
import moment from 'moment'

let container, submitButton, title, startDate, location

beforeEach(() => {
  container = render(<EventForm />)
  submitButton = container.getByRole("button", { type: "submit"} )
  title = container.getByLabelText(/Title/i)
  startDate = container.getByLabelText(/Start Date/i)
  location = container.getByLabelText(/Location/i)
})

test("submit button is disabled for empty form", () => {
  expect(submitButton).toBeDisabled()
})

test("submit button is enabled if all form inputs are valid", () => {
  expect(submitButton).toBeDisabled()
  fireEvent.input(title, { target: { value: 'My Shiny Conference' } })
  expect(submitButton).toBeDisabled()
  fireEvent.input(startDate, { target: { value: moment().add(10, 'days') } })
  expect(submitButton).toBeDisabled()
  fireEvent.input(location, { target: { value: 'London' } })
  expect(submitButton).toBeEnabled()
})

describe("single invalid inputs", () => {
  beforeEach(() => {
    fireEvent.input(title, { target: { value: 'My Shiny Conference' } })
    fireEvent.input(startDate, { target: { value: moment().add(10, 'days') } })
    fireEvent.input(location, { target: { value: 'London' } })    
  })

  test("submit button is disabled if title is invalid", () => {
    expect(submitButton).toBeEnabled()
    fireEvent.input(title, { target: { value: 'My' } })
    expect(submitButton).toBeDisabled()
  })

  test("submit button is disabled if start_datetime is invalid", () => {
    expect(submitButton).toBeEnabled()
    fireEvent.input(startDate, { target: { value: moment().subtract(10, 'days') } })
    expect(submitButton).toBeDisabled()
  })

  test("submit button is disabled if location is invalid", () => {
    expect(submitButton).toBeEnabled()
    fireEvent.input(location, { target: { value: '' } })
    expect(submitButton).toBeDisabled()
  })
})
