import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import EventsModal from "../components/modal/EventsModal";

const AuthUserScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    userInfo: userInfoRegister,
  } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();

    if (isRegistered) {
      dispatch(login(email, password));
    } else {
      dispatch(register(email, password));
    }
  };

  return (
    <>
      <div className="container">
        {loading && <Loader />}
        {loadingRegister && <Loader />}
      </div>

      <div className="align-form">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Launch vertically centered modal
            </Button>

            <EventsModal show={modalShow} onHide={() => setModalShow(false)} />
            <div className="fadeIn first" style={{ marginTop: "2rem" }}>
              <h2>{isRegistered ? "Login" : "Register"}</h2>
            </div>

            <form onSubmit={submitHandler}>
              <input
                type="email"
                id="login"
                className="fadeIn second email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error?.email && <div class="error">{error.email}</div>}
              {errorRegister?.email && (
                <div class="error">{errorRegister.email}</div>
              )}

              <input
                type="password"
                id="password"
                className="fadeIn third password"
                name="login"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error?.password && <div class="error">{error.password}</div>}
              {errorRegister?.password && (
                <div class="error">{errorRegister.password}</div>
              )}

              <input
                type="submit"
                className="fadeIn fourth"
                value={isRegistered ? "Login" : "Register"}
              />

              <Row className="py-3">
                {isRegistered ? (
                  <Col>
                    New User?{" "}
                    <Link
                      onClick={() => {
                        setIsRegistered(false);
                        setEmail("");
                        setPassword("");
                      }}
                    >
                      Register
                    </Link>
                  </Col>
                ) : (
                  <Col>
                    Already have an Acount?{" "}
                    <Link
                      onClick={() => {
                        setIsRegistered(true);
                        setEmail("");
                        setPassword("");
                      }}
                    >
                      Login
                    </Link>
                  </Col>
                )}
              </Row>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthUserScreen;
