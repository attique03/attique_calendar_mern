import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventHours from "../../components/eventHours/EventHours";
import { amHours, pmHours } from "../../utils/Hours.js";
import AllDayEvents from "../../components/alldayevents/AllDayEvents";
import { listAllDayEvents, listEvents } from "../../redux/actions/eventActions";
import { Container } from "react-bootstrap";
import "./calendar.css";
import { overLappingEvents } from "../../utils/handleOverLapping";

const CalendarScreen = () => {
  const [sortedEvents, setSortedEvents] = useState([]);
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { events, error } = eventList;

  const eventAllDayList = useSelector((state) => state.eventAllDayList);
  const { error: errorAllDay, eventsAllDay } = eventAllDayList;

  const eventsLength = events?.length === 0;
  const eventsAllDayLength = eventsAllDay?.length === 0;

  // const allDay= useMemo(()=>{

  // },[])

  // const timedDays= useMemo(()=>{
    
  // },[])
  
  useEffect(() => {
    if (events?.length === 0 || eventsAllDay?.length === 0) {
      dispatch(listEvents({ allDay: false }));
      dispatch(listAllDayEvents({ allDay: true }));
    }

    if (events.length !== 0) {
      setSortedEvents(overLappingEvents(events));
    }
  }, [dispatch, eventsLength, eventsAllDayLength, events, eventsAllDay]);

  // let afterOverLapping;
  // if (events.length !== 0) {
  //   afterOverLapping = events && overLappingEvents(events);
  //   setSortedEvents(overLappingEvents(events));
  //   console.log("after over ===> ", afterOverLapping);
  // }

  // console.log("Sorted Events: ", sortedEvents);

  return (
    <Container>
      {error && <div class="error">{error}</div>}
      {errorAllDay && <div class="error">{errorAllDay}</div>}

      <div className="events-header">Thursday, February 09</div>
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
              <EventHours
                time={hour}
                key={index}
                events={events}
                sortedEvents={events && sortedEvents}
              />
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
    </Container>
  );
};

export default CalendarScreen;
