import React, { useState } from "react";
import { amHours, pmHours } from "../utils/Hours.js";
import EventContent from "../components/EventContent.js";
import moment from "moment";
import convertToActualTime from "../utils/ConvertTime.js";

const EventHours = ({ time, events }) => {
  // if (events) {
  //   console.log("Hours Start ==> ", moment(events[6].startTime).format("LT"));
  //   console.log("End ==> ", moment(events[6].endTime).format("LT"));
  //   // console.log("End ==> ", moment(events[6].endTime).format("LT"));

  //   console.log(
  //     "Difference ==> ",
  //     (new Date(events[10].endTime) - new Date(events[10].startTime)) / 3600000
  //   );
  //   console.log("Time Test ==> ", new Date(events[6].endTime).getHours());
  // }

  // const date = new Date()

  // if (events) {
  //   console.log("End ==> ", moment(events[1].startTime).format("LT"));
  //   console.log(
  //     "Event ==> ",
  //     new Date(events[0].startTime).getHours(),
  //     new Date(events[0].startTime).getMinutes()
  //   );
  // }
  return (
    <div className="am-content">
      <span className="full">{time.full}</span>

      <div className="am-inner-content">
        <div className="half" id={`event-${time.id}`}>
          <div className="event"></div>
        </div>
        <div className="event" id={`event-${time.id + 1}`}>
          {events.map(
            (event, index) =>
              convertToActualTime(new Date(event.startTime).getHours()) ===
                time.id && (
                <EventContent
                  event={event}
                  contentHeight={
                    new Date(event.startTime).getHours() % 2 === 0
                      ? ((new Date(event.endTime) - new Date(event.startTime)) /
                          3600000) *
                        75
                      : ((new Date(event.endTime) - new Date(event.startTime)) /
                          3600000) *
                        74.5
                  }
                  contentMargin={
                    new Date(event.startTime).getMinutes() % 2 === 0 && 30.5
                  }
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
