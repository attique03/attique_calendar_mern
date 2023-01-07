import React from "react";
// import convertToActualTime from "../utils/convertTime";

const EventContent = ({ startTime, name, location, eventId, contentHeight }) => {
  console.log("Content Data ", startTime, eventId, contentHeight);
  return (
    <div
      className="event event-content"
      style={{ height: contentHeight+"px" }}
      id={`${eventId}`}
    >
      <span className="all-day">{startTime}</span>
      <b className="sample-item">{name}</b>
      <span className="sample-location" style={{ marginLeft: "0px" }}>
        {location}
      </span>
    </div>
  );
};

export default EventContent;
