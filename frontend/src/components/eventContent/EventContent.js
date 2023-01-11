import React, { useState, useRef } from "react";
import EventsModal from "../modal/EventsModal.js";
import moment from "moment";

const EventContent = ({ event, contentHeight, contentMargin }) => {
  const [modalShow, setModalShow] = useState(false);
  const [eventData, setEventData] = useState(null);
  const eventRef = useRef();

  return (
    <>
      <EventsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={eventData}
      />

      <div
        className="event event-content"
        ref={eventRef}
        style={{
          height: contentHeight + "px",
          marginTop: contentMargin + "px",
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
