import React, { useEffect } from "react";
import EventContent from "../eventContent/EventContent.js";
import convertToActualTime from "../../utils/ConvertTime.js";
import fixOverLap from "../../utils/FixOverlap.js";
import "./eventHours.css";
import moment from "moment";

const EventHours = ({ time, events, sortedEvents }) => {
  // useEffect(() => {
  //   if (events) {
  //     fixOverLap();
  //   }
  // }, [events]);

  // console.log("Inside Time Hours ==> ", new Date(events[0]?.startTime).getHours());

  // console.log("Event ===> ", moment(events[0]?.startTime).format("LT") - moment(events[1]?.startTime).format("LT"));
  // console.log("Content ", <EventContent />);

  // console.log("Events in events hours ==> ", sortedEvents);
  // console.log("Events  ==> ", events);
  // console.log(" lkdsjflkd ",!Object.values(se)[0]);
  return (
    <div className="am-content">
      <span className="full">{time.full}</span>

      <div className="am-inner-content">
        <div className="half" id={`event-${time.id}`}>
          <div className="event"></div>
        </div>

        <div className="event" id={`event-${time.id + 1}`}>
          {sortedEvents?.map((sortedEvent, index) =>
            sortedEvent.map(
              (event, idx) =>
                convertToActualTime(new Date(event.startTime).getHours()) ===
                  time.id && (
                  <EventContent
                    event={event}
                    contentHeight={
                      new Date(event.endTime).getHours() % 2 === 0 &&
                      new Date(event.endTime).getMinutes() !== 0
                        ? ((new Date(event.endTime) -
                            new Date(event.startTime)) /
                            3600000) *
                          70
                        : ((new Date(event.endTime) -
                            new Date(event.startTime)) /
                            3600000) *
                          72.5
                    }
                    contentMargin={
                      new Date(event.startTime).getMinutes() !== 0 &&
                      new Date(event.startTime).getMinutes() % 2 === 0 &&
                      30.5
                    }
                    contentMarginLeft={sortedEvent.length > 1 && idx >= 1 && 100 * (idx + 1)}
                    key={idx}
                  />
                )
            )
          )}
          {/* {events.map(
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
                  // sortedEvents={sortedEvents}
                />
              )
          )} */}
        </div>

        <div className="am-inner-half">{time.half}</div>
      </div>
    </div>
  );
};

export default EventHours;
