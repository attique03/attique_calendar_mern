import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../actions/eventActions";
import { useNavigate } from "react-router-dom";
import { EVENT_CREATE_RESET } from "../constants/eventConstants";

const EventCreateScreen = () => {
  const [startTime, setStartTime] = useState("1");
  const [endTime, setEndTime] = useState("2");
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [isAllDay, setIsAllDay] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventCreate = useSelector((state) => state.eventCreate);
  const { loading, error, success, event } = eventCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: EVENT_CREATE_RESET });
      navigate("/events");
    }
  }, [success, dispatch]);

  const createEventHandler = (e) => {
    e.preventDefault();
    console.log("Data ", startTime, endTime, name, location);
    dispatch(
      createEvent({ startTime, endTime, name, location, allDay: false })
    );
  };

  return (
    <div class="create-blog content">
      <form onSubmit={createEventHandler}>
        <div style={{ display: "flex" }}>
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label for="html">HTML</label>
          <br />
          <input type="radio" id="css" name="fav_language" value="CSS" />
          <label for="css">CSS</label>
          <br />
        </div>

        <label for="start">Start Time:</label>
        <select
          id="start"
          name="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        >
          <option value="1" selected>
            9:00AM
          </option>
          <option value="2">9:30AM</option>
          <option value="3">10:00AM</option>
          <option value="4">10:30AM</option>
          <option value="5">11:00AM</option>
          <option value="6">11:30AM</option>
          <option value="7">12:00PM</option>
          <option value="8">12:30PM</option>
          <option value="9">1:00PM</option>
          <option value="10">1:30PM</option>
          <option value="11">2:00PM</option>
          <option value="12">2:30PM</option>
          <option value="13">3:00PM</option>
          <option value="14">3:30PM</option>
          <option value="15">4:00PM</option>
          <option value="16">4:30PM</option>
          <option value="17">5:00PM</option>
          <option value="18">5:30PM</option>
          <option value="19">6:00PM</option>
          <option value="20">6:30PM</option>
          <option value="21">7:00PM</option>
          <option value="22">7:30PM</option>
          <option value="23">8:00PM</option>
          <option value="24">8:30PM</option>
        </select>
        <label for="end">End Time:</label>
        <select
          id="end"
          name="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        >
          <option value="2" selected>
            9:30AM
          </option>
          <option value="3">10:00AM</option>
          <option value="4">10:30AM</option>
          <option value="5">11:00AM</option>
          <option value="6">11:30AM</option>
          <option value="7">12:00PM</option>
          <option value="8">12:30PM</option>
          <option value="9">1:00PM</option>
          <option value="10">1:30PM</option>
          <option value="11">2:00PM</option>
          <option value="12">2:30PM</option>
          <option value="13">3:00PM</option>
          <option value="14">3:30PM</option>
          <option value="15">4:00PM</option>
          <option value="16">4:30PM</option>
          <option value="17">5:00PM</option>
          <option value="18">5:30PM</option>
          <option value="19">6:00PM</option>
          <option value="20">6:30PM</option>
          <option value="21">7:00PM</option>
          <option value="22">7:30PM</option>
          <option value="23">8:00PM</option>
          <option value="24">8:30PM</option>
        </select>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label for="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button>Create</button>
      </form>
    </div>
  );
};

export default EventCreateScreen;
