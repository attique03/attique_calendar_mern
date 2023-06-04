import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/formContainer/FormContainer";
import {
  EVENT_CREATE_RESET,
  EVENT_LIST_RESET,
} from "../../redux/constants/eventConstants";
import { createEvent } from "../../redux/actions/eventActions";
import data from "../../utils/createEventData";
import AutoComplete from "../../components/autoComplete/AutoComplete";
import { setCreationDate } from "../../utils/datehandler";

const EventCreateScreen = () => {
  const [isAllDay, setIsAllDay] = useState(false);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    name: "",
    location: "",
    allDay: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventCreate = useSelector((state) => state.eventCreate);
  const { error, success } = eventCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: EVENT_CREATE_RESET });
      dispatch({ type: EVENT_LIST_RESET });
      navigate("/");
    }
  }, [success, dispatch, navigate]);

  const createEventHandler = (e) => {
    e.preventDefault();

    dispatch(
      createEvent({
        ...formData,
        startTime: isAllDay ? Date.now() : setCreationDate(formData.startTime),
        endTime: isAllDay ? Date.now() : setCreationDate(formData.endTime),
      })
    );
  };

  const handleSetLocation = (str) => {
    setFormData({ ...formData, location: str });
  };

  // const setValue = (str) => {
  //   setLocation(str);
  // };

  return (
    <FormContainer>
      <h1 className="mb-4">Create Event</h1>
      {error && <div class="error">{error}</div>}

      <Form onSubmit={createEventHandler}>
        <div className="mb-3">
          <Form.Check
            inline
            label="Timed Event"
            name="group1"
            type="radio"
            defaultChecked
            id="inline-timed"
            onChange={(e) => {
              setIsAllDay(false);
              setFormData({ ...formData, allDay: false });
            }}
          />
          <Form.Check
            inline
            label="All Day Event"
            name="group1"
            type="radio"
            id="inline-allday"
            onChange={(e) => {
              setIsAllDay(true);
              setFormData({ ...formData, allDay: true });
            }}
          />
        </div>

        {!isAllDay && (
          <Row>
            <Col md={6}>
              <Form.Group controlId="startTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  as="select"
                  startTime
                  value={formData.startTime}
                  onChange={(e) => {
                    if (formData.endTime >= formData.startTime) {
                      setFormData({ ...formData, endTime: 0 });
                    }
                    setFormData({ ...formData, startTime: e.target.value });
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
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  required
                >
                  <option value="0">Please Select End Time</option>
                  {data.map((eTime, index) => (
                    <option
                      value={eTime.id}
                      key={index}
                      disabled={formData.startTime >= eTime.id ? true : false}
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
