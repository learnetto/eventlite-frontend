import React from "react"
import { render } from "@testing-library/react"
import EventSummary from "../components/EventSummary"
import renderer from "react-test-renderer"

it("renders event title", () => {
  const { getByText } = render(
    <EventSummary event={{ title: "My Test Event" }} />
  )
  const title = getByText("My Test Event")
  expect(title).toBeInTheDocument()
})

it("renders event start_datetime", () => {
  const { getByText } = render(
    <EventSummary
      event={{ start_datetime: new Date("10 September 2020, 10:00 am") }}
    />
  )
  const start_datetime = getByText("Thu, Sep 10, 2020 10:00 AM")
  expect(start_datetime).toBeInTheDocument()
})

it("renders event image", () => {
  const { getByRole } = render(
    <EventSummary event={{ image_url: "event.png" }} />
  )
  const image = getByRole("img", { src: "event.png" })
  expect(image).toBeInTheDocument()
})

it("should render an event summary card", () => {
  const tree = renderer
    .create(
      <EventSummary
        event={{
          id: 1,
          title: "My Test Event",
          start_datetime: new Date("10 September 2020, 10:00 am"),
          image_url: "event.png",
        }}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it("should render a prettier event summary card", () => {
  const tree = renderer
    .create(
      <EventSummary
        event={{
          id: 1,
          title: "My Test Event",
          start_datetime: new Date("10 September 2020, 10:00 am"),
          image_url: "event.png",
        }}
      />
    )
    .toJSON()
  expect(tree).toMatchInlineSnapshot(`
    <div
      className="col-md-4"
    >
      <a
        className="event-card-link"
        href="/events/1"
      >
        <div
          className="mb-4 event-card card"
        >
          <img
            className="card-img-top"
            src="event.png"
          />
          <div
            className="card-body"
          >
            <p
              className="event-card-datetime card-text"
            >
              Thu, Sep 10, 2020 10:00 AM 
            </p>
            <div
              className="card-title h5"
            >
              My Test Event
            </div>
          </div>
        </div>
      </a>
    </div>
  `)
})
