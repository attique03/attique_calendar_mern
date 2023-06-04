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
import data from "../../utils/createEventData";
import { setFormDate, setUpdationDate } from "../../utils/datehandler";

const EventsModal = (props) => {
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    name: "",
    location: "",
  });

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
    if (success || successDelete) {
      dispatch({ type: EVENT_UPDATE_RESET });
      dispatch({ type: EVENT_LIST_RESET });
      dispatch({ type: EVENT_ALLDAY_LIST_RESET });

      navigate("/");
    } else {
      setFormData({
        startTime: setFormDate(props.event?.startTime),
        endTime: setFormDate(props.event?.endTime),
        name: props.event?.name,
        location: props.event?.location,
      });
    }
  }, [success, successDelete, dispatch, navigate, props?.event]);

  const updateEventHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateEvent(props.event?._id, {
        ...formData,
        startTime: setUpdationDate(formData.startTime),
        endTime: setUpdationDate(formData.endTime),
      })
    );
  };

  const deleteEventHandler = (e) => {
    e.preventDefault();
    dispatch(deleteEvent(props.event?._id));
  };

  const handleSetLocation = (str) => {
    setFormData({ ...formData, location: str });
  };

  // const setValue = (str) => {
  //   setLocation(str);
  // };

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

          <Form onSubmit={updateEventHandler}>
            {!props.event?.allDay && (
              <Row>
                <Col md={6}>
                  <Form.Group controlId="startTime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.startTime}
                      onChange={(e) => {
                        if (formData.endTime >= formData.startTime) {
                          setFormData({ ...formData, endTime: "0" });
                        }
                        setFormData({ ...formData, startTime: e.target.value });
                      }}
                      required
                      defaultValue={formData.startTime}
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
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      required
                      defaultValue={formData.endTime}
                    >
                      {data.map((eTime, index) => (
                        <option value={eTime.value} key={index}>
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
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              ></Form.Control>
            </Form.Group>

            <AutoComplete
              value={formData.location}
              // setValue={setValue}
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
