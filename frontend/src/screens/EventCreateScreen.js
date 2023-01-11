import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/loader/Loader";
import FormContainer from "../components/formContainer/FormContainer";
import {
  EVENT_ALLDAY_CREATE_RESET,
  EVENT_CREATE_RESET,
} from "../redux/constants/eventConstants";
import { createAllDayEvent, createEvent } from "../redux/actions/eventActions";
import data from "../utils/CreateEventData";

const EventCreateScreen = () => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState("0");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventCreate = useSelector((state) => state.eventCreate);
  const { loading, error, success } = eventCreate;

  const eventAllDayCreate = useSelector((state) => state.eventAllDayCreate);
  const {
    loading: loadingAllDayCreate,
    error: errorAllDayCreate,
    success: successAllDayCreate,
  } = eventAllDayCreate;

  useEffect(() => {
    if (success || successAllDayCreate) {
      dispatch({ type: EVENT_CREATE_RESET });
      dispatch({ type: EVENT_ALLDAY_CREATE_RESET });
      navigate("/");
    }
  }, [success, successAllDayCreate, dispatch, navigate]);

  const createEventHandler = (e) => {
    e.preventDefault();
    if (!isAllDay) {
      dispatch(
        createEvent({
          startTime: new Date().setHours(
            startTime.split(":")[0],
            startTime.split(":")[1]
          ),
          endTime: new Date().setHours(
            endTime.split(":")[0],
            endTime.split(":")[1]
          ),
          name,
          location,
        })
      );
    } else {
      dispatch(createAllDayEvent({ name, location }));
    }
  };

  return (
    <FormContainer>
      <h1 className="mb-4">Create Event</h1>
      {(loading || loadingAllDayCreate) && <Loader />}
      <Form onSubmit={createEventHandler}>
        <div className="mb-3">
          <Form.Check
            inline
            label="Timed Event"
            name="group1"
            type="radio"
            defaultChecked
            id="inline-timed"
            onChange={(e) => setIsAllDay(false)}
          />
          <Form.Check
            inline
            label="All Day Event"
            name="group1"
            type="radio"
            id="inline-allday"
            onChange={(e) => setIsAllDay(true)}
          />
        </div>

        {!isAllDay && (
          <Row>
            <Col md={6}>
              <Form.Group controlId="startTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  as="select"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    // if (Number(endTime) >= Number(startTime)) {
                    //   setEndTime("");
                    // }
                  }}
                  required
                >
                  <option value="">Please Select Start Time</option>
                  {data.map((startTime, index) => (
                    <option value={startTime.value} key={index} id={endTime.id}>
                      {startTime.content}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  as="select"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                >
                  <option value="">Please Select End Time</option>
                  {data.map((endTime, index) => (
                    <option
                      value={endTime.value}
                      // disabled={
                      //   Number(startTime.id) >= Number(endTime.id) ? true : false
                      // }
                      key={index}
                    >
                      {endTime.content}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        )}

        <Form.Group controlId="endTime" className="pt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        {error?.name?.message && <div class="error">{error.name.message}</div>}
        {error?.name?.message && <div class="error">{error.name.message}</div>}

        <Form.Group controlId="location" className="pt-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="location"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-5">
          Create Event
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EventCreateScreen;
