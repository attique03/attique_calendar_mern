import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventHours from "../components/eventHours/EventHours";
import { amHours, pmHours } from "../utils/Hours.js";
import Loader from "../components/loader/Loader";
import AllDayEvents from "../components/alldayevents/AllDayEvents";
import { listAllDayEvents, listEvents } from "../redux/actions/eventActions";

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

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { success: successUpdate } = eventUpdate;

  const eventDelete = useSelector((state) => state.eventDelete);
  const { success: successDelete } = eventDelete;

  useEffect(() => {
    dispatch(listEvents());
    dispatch(listAllDayEvents());
  }, [dispatch, successUpdate, successDelete]);

  return (
    <>
      {loading || loadingAllDay ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="events-header">Wednesday, January 11</div>
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
