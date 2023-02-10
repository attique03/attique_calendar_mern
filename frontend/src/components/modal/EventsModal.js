import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import FormContainer from "../formContainer/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import Message from "../message/Message";
import { deleteEvent, updateEvent } from "../../redux/actions/eventActions";
import {
  EVENT_ALLDAY_LIST_RESET,
  EVENT_LIST_RESET,
  EVENT_UPDATE_RESET,
} from "../../redux/constants/eventConstants";
import AutoComplete from "../autoComplete/AutoComplete";
import data from "../../utils/CreateEventData";

const EventsModal = (props) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cities, setCities] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { loading, error, success } = eventUpdate;

  const eventDelete = useSelector((state) => state.eventDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete;

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
    if (success || successDelete) {
      dispatch({ type: EVENT_UPDATE_RESET });
      dispatch({ type: EVENT_LIST_RESET });
      dispatch({ type: EVENT_ALLDAY_LIST_RESET });

      navigate("/");
    } else {
      setStartTime(
        `${new Date(props.event?.startTime).getHours()}:${
          new Date(props.event?.startTime).getMinutes() === 0
            ? "00"
            : new Date(props.event?.startTime).getMinutes()
        }`
      );
      setEndTime(
        `${new Date(props.event?.endTime).getHours()}:${
          new Date(props.event?.endTime).getMinutes() === 0
            ? "00"
            : new Date(props.event?.endTime).getMinutes()
        }`
      );
      setName(props.event?.name);
      setLocation(props.event?.location);
    }

    getLocations();
  }, [success, successDelete, dispatch, navigate, props?.event]);

  const editEventHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEvent(props.event?._id, {
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
  };

  const deleteEventHandler = (e) => {
    e.preventDefault();
    dispatch(deleteEvent(props.event?._id));
  };

  const handleSetLocation = (str) => {
    setLocation(str);
  };

  const setValue = (str) => {
    setLocation(str);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // style={{paddingLeft: "215px !important"}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.event?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormContainer>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}

          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}

          <Form onSubmit={editEventHandler}>
            {!props.event?.allDay && (
              <Row>
                <Col md={6}>
                  <Form.Group controlId="startTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      as="select"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      defaultValue={startTime}
                    >
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
                      defaultValue={endTime}
                    >
                      {data.map((eTime, index) => (
                        <option
                          value={eTime.value}
                          key={index}
                          // disabled={startTime >= eTime.id ? true : false}
                        >
                          {eTime.content}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Form.Group controlId="name" className="pt-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId="location" className="pt-3">
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
            </Form.Group> */}

            <AutoComplete
              value={location}
              setValue={setValue}
              handleSetLocation={handleSetLocation}
            />

            <Row>
              <Col md={9}>
                <Button type="submit" variant="primary" className="my-5">
                  Update
                </Button>
              </Col>
              <Col md={3}>
                <Button
                  variant="danger"
                  className="my-5"
                  onClick={deleteEventHandler}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="dark">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventsModal;
