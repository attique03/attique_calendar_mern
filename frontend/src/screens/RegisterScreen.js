import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "../redux/actions/userActions";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(email, password));
  };

  return (
    <>
      <div className="container">{loading && <Loader />}</div>

      <div className="align-form">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first" style={{ marginTop: "2rem" }}>
              <h2>Register</h2>
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

              <input type="submit" className="fadeIn fourth" value="Register" />

              <Row className="py-3">
                <Col>
                  Already have an Acount? <Link to="/login">Login</Link>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
