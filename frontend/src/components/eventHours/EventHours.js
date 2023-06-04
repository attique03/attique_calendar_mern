import EventContent from "../eventContent/EventContent.js";
import convertToActualTime from "../../utils/convertTime.js";
import "./eventHours.css";
import { contentHeight, contentMargin } from "../../utils/datehandler.js";

const EventHours = ({ time, events, sortedEvents }) => {
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
                    contentHeight={contentHeight(
                      event.startTime,
                      event.endTime
                    )}
                    contentMargin={contentMargin(event.startTime)}
                    contentMarginLeft={
                      sortedEvent.length > 1 && idx >= 1 && 100 * (idx + 1)
                    }
                    key={idx}
                  />
                )
            )
          )}
        </div>
        <div className="am-inner-half">{time.half}</div>
      </div>
    </div>
  );
};

export default EventHours;
