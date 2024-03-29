import React, { useState } from "react";
import EventsModal from "../modal/EventsModal.js";
import moment from "moment";
import "./eventContent.css";

const EventContent = ({
  event,
  contentHeight,
  contentMargin,
  sortedEvents,
  contentMarginLeft,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [eventData, setEventData] = useState(null);

  return (
    <>
      <EventsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={eventData}
      />

      <div
        className="event event-content"
        style={{
          height: contentHeight + "px",
          marginTop: contentMargin + "px",
          marginLeft: contentMarginLeft && contentMarginLeft + "px",
        }}
        id={`${event._id}`}
        onClick={() => {
          setModalShow(true);
          setEventData(event);
        }}
      >
        <span className="all-day">{moment(event.startTime).format("LT")}</span>
        <b className="sample-item">{event.name}</b>
        <span className="sample-location" style={{ marginLeft: "0px" }}>
          {event.location}
        </span>
      </div>
    </>
  );
};

export default EventContent;
