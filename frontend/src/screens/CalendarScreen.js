import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventHours from "../components/EventHours";
import { amHours, pmHours } from "../utils/Hours.js";
import { listEvents, listAllDayEvents } from "../actions/eventActions";
import Loader from "../components/Loader";
import AllDayEvents from "../components/alldayevents/AllDayEvents";
import moment from "moment";

const CalendarScreen = () => {
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  const eventAllDayList = useSelector((state) => state.eventAllDayList);
  const {
    loading: loadingAllDay,
    error: errorAllDay,
    eventsAllDay,
  } = eventAllDayList;

  useEffect(() => {
    dispatch(listEvents());
    dispatch(listAllDayEvents());
  }, [dispatch]);

  const userInput = "09:30";
  const hours = userInput.slice(0, 2);
  const minutes = userInput.slice(3);

  const startDate = new Date();
  startDate.setHours(hours, minutes);

  const endDate = new Date();
  endDate.setHours("11", "00");

  // endDate.setHours(startTime.split(":")[0], startTime.split(":")[1]);

  // console.log("Start Date, ", moment(startDate).format("LT"),moment(endDate).format('LT'));
  // console.log("Difference , ", endDate.getTime()-startDate.getTime());
  // console.log("End Date, ", endDate);

  // if (events) {
  //   console.log("Start ==> ", moment(events[6].startTime).format("LT"));
  //   console.log("End ==> ", moment(events[6].endTime).format("LT"));
  //   // console.log("End ==> ", moment(events[6].endTime).format("LT"));

  //   console.log("Difference ==> ",  (new Date(events[10].endTime) - new Date(events[10].startTime))/3600000); 
  //   console.log("Time Test ==> ",  (new Date(events[6].endTime).getHours())); 
    
  // }

  return (
    <>
      {loading || loadingAllDay ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="events-header">Monday, January 9</div>
          <div className="all-day-section">
            {eventsAllDay?.map((event, index) => (
              <AllDayEvents event={event} key={index} />
            ))}
          </div>

          <div className="am">
            <div className="am-title">AM</div>
            <div className="am-data">
              {events &&
                amHours.map((hour, index) => (
                  <EventHours time={hour} key={index} events={events} />
                ))}
            </div>
          </div>

          <div className="pm">
            <div className="pm-title">PM</div>
            <div className="am-data">
              {events &&
                pmHours.map((hour, index) => (
                  <EventHours time={hour} key={index} events={events} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarScreen;
