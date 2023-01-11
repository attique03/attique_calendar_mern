import React from "react";
import EventContent from "../eventContent/EventContent.js";
import convertToActualTime from "../../utils/ConvertTime.js";

const EventHours = ({ time, events }) => {
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
                    new Date(event.startTime).getMinutes() !== 0 &&
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
