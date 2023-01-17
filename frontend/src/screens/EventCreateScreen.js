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
import convertToActualTime from "../utils/ConvertTime";

const EventCreateScreen = () => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [cities, setCities] = useState([]);

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

  const getLocations = async () => {
    const where = encodeURIComponent(
      JSON.stringify({
        name: {
          $exists: true,
        },
      })
    );
    const response = await fetch(
      `https://parseapi.back4app.com/classes/City?limit=1000&order=name&where=${where}`,
      {
        headers: {
          "X-Parse-Application-Id": "q1QfxhDv1KLM5OPzUFzZRIvYERUAFLWEWX9r053J",
          "X-Parse-Master-Key": "POcTYBgrQ52WGn2lJrcQrYwFFM44uhQ2eqmoy8hS",
        },
      }
    );
    const data = await response.json();
    setCities(data);
  };

  useEffect(() => {
    if (success || successAllDayCreate) {
      dispatch({ type: EVENT_CREATE_RESET });
      dispatch({ type: EVENT_ALLDAY_CREATE_RESET });
      navigate("/");
    }

    getLocations();
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

  // console.log(
  //   "Locaiton ",
  //   startTime,
  //   endTime,
  //   Number(startTime?.split(":")[0]) >= Number(endTime?.split(":")[0]),
  //   startTime >= endTime
  // );

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
                    <option value={startTime.value} key={index}>
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
                  {data.map((eTime, index) => (
                    <option
                      value={eTime.value}
                      key={index}
                      // disabled={startTime >= endTime ? true : false}
                      // disabled={
                      //   Number(startTime?.split(":")[0]) >=
                      //   Number(eTime.value.split(":")[0])
                      //     ? true
                      //     : false
                      // }
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
        {error?.name?.message && <div class="error">{error.name.message}</div>}

        <Form.Group controlId="location" className="pt-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            as="select"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            required
          >
            <option value="">Please Select Location</option>
            {cities?.results?.map((city, index) => (
              <option value={city.name} key={index}>
                {city.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-5">
          Create Event
        </Button>
      </Form>
    </FormContainer>
  );
};

export default EventCreateScreen;
