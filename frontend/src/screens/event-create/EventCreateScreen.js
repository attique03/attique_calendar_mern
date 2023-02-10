import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/formContainer/FormContainer";
import {
  EVENT_ALLDAY_CREATE_RESET,
  EVENT_ALLDAY_LIST_RESET,
  EVENT_CREATE_RESET,
  EVENT_LIST_RESET,
} from "../../redux/constants/eventConstants";
import { createAllDayEvent, createEvent } from "../../redux/actions/eventActions";
import data from "../../utils/CreateEventData";
import hoursMapper from "../../utils/HoursMapper";
import AutoComplete from "../../components/autoComplete/AutoComplete";

const EventCreateScreen = () => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventCreate = useSelector((state) => state.eventCreate);
  const { error, success } = eventCreate;

  const eventAllDayCreate = useSelector((state) => state.eventAllDayCreate);
  const { error: errorAllDayCreate, success: successAllDayCreate } =
    eventAllDayCreate;

  useEffect(() => {
    if (success || successAllDayCreate) {
      dispatch({ type: EVENT_CREATE_RESET });
      dispatch({ type: EVENT_ALLDAY_CREATE_RESET });
      dispatch({ type: EVENT_LIST_RESET });
      dispatch({ type: EVENT_ALLDAY_LIST_RESET });
      navigate("/");
    }
  }, [success, successAllDayCreate, dispatch, navigate]);

  const createEventHandler = (e) => {
    e.preventDefault();
    if (!isAllDay) {
      dispatch(
        createEvent({
          startTime: new Date().setHours(
            Object.values(hoursMapper[startTime - 1])[0].split(":")[0],
            Object.values(hoursMapper[startTime - 1])[0].split(":")[1]
          ),
          endTime: new Date().setHours(
            Object.values(hoursMapper[endTime - 1])[0].split(":")[0],
            Object.values(hoursMapper[endTime - 1])[0].split(":")[1]
          ),
          name,
          location,
        })
      );
    } else {
      dispatch(createAllDayEvent({ name, location }));
    }
  };

  const handleSetLocation = (str) => {
    setLocation(str);
  };

  // const setValue = (str) => {
  //   setLocation(str);
  // };

  return (
    <FormContainer>
      <h1 className="mb-4">Create Event</h1>
      {error && <div class="error">{error}</div>}
      {errorAllDayCreate && <div class="error">{errorAllDayCreate}</div>}

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
                    if (endTime >= startTime) {
                      setEndTime(0);
                    }
                  }}
                  required
                >
                  <option value="0">Please Select Start Time</option>
                  {data.map((startTime, index) => (
                    <option value={startTime.id} key={index}>
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
                  <option value="0">Please Select End Time</option>
                  {data.map((eTime, index) => (
                    <option
                      value={eTime.id}
                      key={index}
                      disabled={startTime >= eTime.id ? true : false}
                    >
                      {eTime.content}
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

        <AutoComplete handleSetLocation={handleSetLocation} />
        {/* <AutoComplete setValue={setValue} /> */}

        <Button type="submit" variant="primary" className="my-5">
          Create Event
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EventCreateScreen;
