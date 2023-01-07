import React from "react";
import { amHours, pmHours } from "../utils/Hours.js";
import EventContent from "../components/EventContent.js";

const EventHours = ({ time, events }) => {
  // console.log("Events ===> ", events);
  // time.map(event => (
  console.log("Event ===> ", String(time.id + 1));
  // ))
  return (
    <div class="am-content">
      <span class="full">{time.full}</span>

      <div class="am-inner-content">
        <div class="half" id={`event-${time.id}`}>
          <div class="event">
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
        <div class="event" id={`event-${time.id + 1}`}>
          {events.map(
            (event, i) =>
              (event.startTime === String(time.id + 1) ||
                event.startTime === String(time.id)) && (
                <EventContent
                  startTime={event.startTime}
                  name={event.name}
                  location={event.location}
                  eventId={event._id}
                  contentHeight={
                    event.startTime % 2 === 0
                      ? (event.endTime - event.startTime) * 37.2
                      : (event.endTime - event.startTime) * 33.5
                  }
                />
              )
          )}
        </div>

        <div class="am-inner-half">{time.half}</div>
      </div>
    </div>
  );
};

<div class="am-content">
  <span class="full">10:00</span>
  <div class="am-inner-content">
    <div class="half" id="event-3">
      <div class="event"></div>
    </div>
    <div class="event" id="event-4"></div>
    <div class="am-inner-half">10:30</div>
  </div>
</div>;

export default EventHours;
