import React, { useEffect } from "react";
import EventContent from "../eventContent/EventContent.js";
import convertToActualTime from "../../utils/ConvertTime.js";
import fixOverLap from "../../utils/FixOverlap.js";

const EventHours = ({ time, events }) => {
  
  useEffect(() => {
    if (events) {
      fixOverLap();
    }
  }, [events]);

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
                    new Date(event.endTime).getHours() % 2 === 0 &&
                    new Date(event.endTime).getMinutes() !== 0
                      ? ((new Date(event.endTime) - new Date(event.startTime)) /
                          3600000) *
                        70
                      : ((new Date(event.endTime) - new Date(event.startTime)) /
                          3600000) *
                        72.5
                  }
                  contentMargin={
                    new Date(event.startTime).getMinutes() !== 0 &&
                    new Date(event.startTime).getMinutes() % 2 === 0 &&
                    30.5
                  }
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
