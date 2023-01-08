import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventHours from "../components/EventHours";
import { amHours, pmHours } from "../utils/Hours.js";
import { listEvents } from "../actions/eventActions";

const EventsScreen = () => {
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);
  
  return (
    <div className="container">
      <header>Friday, January 6</header>
      <div className="all-day-section"></div>

      <div className="am">
        <div className="am-title">AM</div>
        <div className="am-data">
          {events && amHours.map((hour, index) => (
            <EventHours time={hour} key={index} events={events} />
          ))}
        </div>
      </div>

      <div className="pm">
        <div className="pm-title">PM</div>
        <div className="am-data">
          {events && pmHours.map((hour, index) => (
            <EventHours time={hour} key={index} events={events} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsScreen;
