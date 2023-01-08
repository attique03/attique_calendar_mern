import React, { useState, useRef, useEffect } from "react";
import EventsModal from "./modal/EventsModal.js";
import convertToActualTime from "../utils/ConvertTime.js";

const EventContent = ({ event, contentHeight, contentMargin }) => {
  const [modalShow, setModalShow] = useState(false);
  const [eventData, setEventData] = useState(null);
  const eventRef = useRef();

  useEffect(() => {
    // if (event.startTime % 2 === 0) {
    //   eventRef.current.style.marginTop = "30.5px";
    // }

    // console.log("Event Data ", eventData);
  }, []);

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
        <span className="all-day">{convertToActualTime(event.startTime)}</span>
        <b className="sample-item">{event.name}</b>
        <span className="sample-location" style={{ marginLeft: "0px" }}>
          {event.location}
        </span>
      </div>
    </>
  );
};

export default EventContent;
