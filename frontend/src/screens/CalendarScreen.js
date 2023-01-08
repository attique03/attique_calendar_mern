import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventHours from "../components/EventHours";
import { amHours, pmHours } from "../utils/Hours.js";
import { listEvents, listAllDayEvents } from "../actions/eventActions";
import Loader from "../components/Loader";
import AllDayEvents from "../components/alldayevents/AllDayEvents";

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
