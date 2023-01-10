import { useState } from "react";
import EventsModal from "../modal/EventsModal.js";

const AllDayEvents = ({ event }) => {
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
        className="all-day-event-data"
        id={event?._id}
        onClick={() => {
          setModalShow(true);
          setEventData(event);
        }}
      >
        <span>All Day - </span>
        <b>{event.name + " - "}</b>
        <span>{event.location}</span>
      </div>
    </>
  );
};

export default AllDayEvents;
