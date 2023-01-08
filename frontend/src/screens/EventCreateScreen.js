import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAllDayEvent, createEvent } from "../actions/eventActions";
import { useNavigate } from "react-router-dom";
import {
  EVENT_ALLDAY_CREATE_RESET,
  EVENT_CREATE_RESET,
} from "../constants/eventConstants";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const EventCreateScreen = () => {
  const [startTime, setStartTime] = useState("1");
  const [endTime, setEndTime] = useState("2");
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
  }, [success, successAllDayCreate, dispatch]);

  const createEventHandler = (e) => {
    e.preventDefault();
    if (!isAllDay) {
      dispatch(createEvent({ startTime, endTime, name, location }));
    } else {
      dispatch(createAllDayEvent({ name, location }));
    }
  };

  return (
    <FormContainer>
      <h1 className="mb-4">Create Event</h1>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : errorAllDayCreate ? (
        <Message variant="danger">{errorAllDayCreate}</Message>
      ) : null}

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
                  // value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  defaultValue="1"
                >
                  <option value="1">9:00AM</option>
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
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  as="select"
                  // value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  defaultValue="2"
                >
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
