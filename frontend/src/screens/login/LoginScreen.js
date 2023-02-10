import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="align-form">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first" style={{ marginTop: "2rem" }}>
            <h2>Login</h2>
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

            <input type="submit" className="fadeIn fourth" value="Login" />

            <Row className="py-3">
              <Col>
                New User? <Link to="/register">Register</Link>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
