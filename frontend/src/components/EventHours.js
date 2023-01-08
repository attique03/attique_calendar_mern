import React, { useState } from "react";
import { amHours, pmHours } from "../utils/Hours.js";
import EventContent from "../components/EventContent.js";

const EventHours = ({ time, events }) => {
  return (
    <div className="am-content">
      <span className="full">{time.full}</span>

      <div className="am-inner-content">
        <div className="half" id={`event-${time.id}`}>
          <div className="event">
            {/* {events.map(
              (event, i) =>
                event.startTime === String(time.id) && (
                  <EventContent
                    startTime={event.startTime}
                    eventId={time.id.toString()}
                    style={{ height: "104.4px" }}
                  />
                )
            )} */}
          </div>
        </div>
        <div className="event" id={`event-${time.id + 1}`}>
          {events.map(
            (event, index) =>
              (event.startTime === String(time.id + 1) ||
                event.startTime === String(time.id)) && (
                <EventContent
                 event={event}
                  contentHeight={
                    event.startTime % 2 === 0
                      ? (event.endTime - event.startTime) * 39
                      : (event.endTime - event.startTime) * 37.5
                  }
                  contentMargin={event.startTime % 2 === 0 && 30.5}
                  // style={{marginTop: "15.5px"}}
                  key={index}
                />
              )
          )}
        </div>

        <div className="am-inner-half">{time.half}</div>
      </div>
    </div>
  );
};

export default EventHours;
