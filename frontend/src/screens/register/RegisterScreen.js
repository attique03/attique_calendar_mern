import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/userActions";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setMessage("Email is not valid");
      return;
    }

    if (password.match(decimal)) {
      setMessage("");
      dispatch(register(email, password));
    } else {
      setMessage(
        "Minimum Length is 8 Characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
    }
  };

  return (
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
            {error?.password && <div className="error">{error.password}</div>}
            {message && <div className="error">{message}</div>}

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
  );
};

export default RegisterScreen;
