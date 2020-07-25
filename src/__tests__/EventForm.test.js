import React from "react"
import { render, fireEvent } from "@testing-library/react"
import EventForm from "../components/EventForm"
import moment from 'moment'

test("submit button is disabled for empty form", () => {
  const { getByRole } = render(<EventForm />)
  const submitButton = getByRole("button", { type: "submit"} )
  expect(submitButton).toBeDisabled()
})

test("submit button is enabled if all form inputs are valid", () => {
  const { getByRole, getByLabelText } = render(<EventForm />)
  const submitButton = getByRole("button", { type: "submit"} )
  expect(submitButton).toBeDisabled()
  fireEvent.input(getByLabelText(/Title/i), { target: { value: 'My Shiny Conference' } })
  expect(submitButton).toBeDisabled()
  fireEvent.input(getByLabelText(/Start Date/i), { target: { value: moment().add(10, 'days') } })
  expect(submitButton).toBeDisabled()
  fireEvent.input(getByLabelText(/Location/i), { target: { value: 'London' } })
  expect(submitButton).toBeEnabled()
})

test("submit button is disabled if title is invalid", () => {
  const { getByRole, getByLabelText } = render(<EventForm />)
  const submitButton = getByRole("button", { type: "submit"} )
  fireEvent.input(getByLabelText(/Title/i), { target: { value: 'My Shiny Conference' } })
  fireEvent.input(getByLabelText(/Start Date/i), { target: { value: moment().add(10, 'days') } })
  fireEvent.input(getByLabelText(/Location/i), { target: { value: 'London' } })
  expect(submitButton).toBeEnabled()
  fireEvent.input(getByLabelText(/Title/i), { target: { value: 'My' } })
  expect(submitButton).toBeDisabled()
})


test("submit button is disabled if start_datetime is invalid", () => {
  const { getByRole, getByLabelText } = render(<EventForm />)
  const submitButton = getByRole("button", { type: "submit"} )
  fireEvent.input(getByLabelText(/Title/i), { target: { value: 'My Shiny Conference' } })
  fireEvent.input(getByLabelText(/Start Date/i), { target: { value: moment().add(10, 'days') } })
  fireEvent.input(getByLabelText(/Location/i), { target: { value: 'London' } })
  expect(submitButton).toBeEnabled()
  fireEvent.input(getByLabelText(/Start Date/i), { target: { value: moment().subtract(10, 'days') } })
  expect(submitButton).toBeDisabled()
})


test("submit button is disabled if location is invalid", () => {
  const { getByRole, getByLabelText } = render(<EventForm />)
  const submitButton = getByRole("button", { type: "submit"} )
  fireEvent.input(getByLabelText(/Title/i), { target: { value: 'My Shiny Conference' } })
  fireEvent.input(getByLabelText(/Start Date/i), { target: { value: moment().add(10, 'days') } })
  fireEvent.input(getByLabelText(/Location/i), { target: { value: 'London' } })
  expect(submitButton).toBeEnabled()
  fireEvent.input(getByLabelText(/Location/i), { target: { value: '' } })
  expect(submitButton).toBeDisabled()
})
