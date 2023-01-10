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

const data = [
  {
    value: "09:00",
    content: "9:00AM",
  },
  {
    value: "09:30",
    content: "9:30AM",
  },
  {
    value: "10:00",
    content: "10:00AM",
  },
  {
    value: "10:30",
    content: "10:30AM",
  },
  {
    value: "11:00",
    content: "11:00AM",
  },
  {
    value: "11:30",
    content: "11:30AM",
  },
  {
    value: "12:00",
    content: "12:00PM",
  },
  {
    value: "12:30",
    content: "12:30PM",
  },
  {
    value: "13:00",
    content: "1:00PM",
  },
  {
    value: "13:30",
    content: "1:30PM",
  },
  {
    value: "14:00",
    content: "2:00PM",
  },
  {
    value: "14:30",
    content: "2:30PM",
  },
  {
    value: "15:00",
    content: "3:00PM",
  },
  {
    value: "15:30",
    content: "3:30PM",
  },
  {
    value: "16:00",
    content: "4:00PM",
  },
  {
    value: "16:30",
    content: "4:30PM",
  },
  {
    value: "17:00",
    content: "5:00PM",
  },
  {
    value: "17:30",
    content: "5:30PM",
  },
  {
    value: "18:00",
    content: "6:00PM",
  },
  {
    value: "18:30",
    content: "6:30PM",
  },
  {
    value: "19:00",
    content: "7:00PM",
  },
  {
    value: "19:30",
    content: "7:30PM",
  },
  {
    value: "20:00",
    content: "8:00PM",
  },
  {
    value: "20:30",
    content: "8:30PM",
  },
];

const EventCreateScreen = () => {
  const [startTime, setStartTime] = useState("0");
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

  // console.log("Start Time ", startTime.split(":")[0]);
  // if (error) {
  //   console.log("Error ", error);
  // }

 
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
                  // defaultValue="1"
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
                  {data.map((endTime, index) => (
                    <option
                      value={endTime.value}
                      // disabled={
                      //   Number(startTime) >= Number(endTime.id) ? true : false
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
