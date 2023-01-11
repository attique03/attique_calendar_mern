import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import FormContainer from "../formContainer/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import Message from "../message/Message";
import { deleteEvent, updateEvent } from "../../redux/actions/eventActions";
import { EVENT_UPDATE_RESET } from "../../redux/constants/eventConstants";

const EventsModal = (props) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

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

  useEffect(() => {
    if (success) {
      dispatch({ type: EVENT_UPDATE_RESET });
      navigate("/");
    } else {
      setStartTime(
        `${new Date(props.event?.startTime).getHours()}:${new Date(
          props.event?.startTime
        ).getMinutes()}`
      );
      setEndTime(
        `${new Date(props.event?.endTime).getHours()}:${new Date(
          props.event?.endTime
        ).getMinutes()}`
      );
      setName(props.event?.name);
      setLocation(props.event?.location);
    }
  }, [success, dispatch, navigate, props?.event]);

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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
                      <option value="09:00">9:00AM</option>
                      <option value="09:30">9:30AM</option>
                      <option value="10:00">10:00AM</option>
                      <option value="10:30">10:30AM</option>
                      <option value="11:00">11:00AM</option>
                      <option value="11:30">11:30AM</option>
                      <option value="12:00">12:00PM</option>
                      <option value="12:30">12:30PM</option>
                      <option value="13:00">1:00PM</option>
                      <option value="13:30">1:30PM</option>
                      <option value="14:00">2:00PM</option>
                      <option value="14:30">2:30PM</option>
                      <option value="15:00">3:00PM</option>
                      <option value="15:30">3:30PM</option>
                      <option value="16:00">4:00PM</option>
                      <option value="16:30">4:30PM</option>
                      <option value="17:00">5:00PM</option>
                      <option value="17:30">5:30PM</option>
                      <option value="18:00">6:00PM</option>
                      <option value="18:30">6:30PM</option>
                      <option value="19:00">7:00PM</option>
                      <option value="19:30">7:30PM</option>
                      <option value="20:00">8:00PM</option>
                      <option value="20:30">8:30PM</option>
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
