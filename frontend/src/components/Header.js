import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { USER_LOGOUT } from "../constants/userConstants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userLogout = useSelector((state) => state.userLogout);
  const { loading, success, error } = userLogout;

  console.log("Success ", success, userInfo);

  useEffect(() => {
    console.log('Logout');
  }, [success, userInfo, navigate]);

  const logoutHandler = () => {
    console.log("Logoout ");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav>
      <div className="site-title">
        <Link to="/">
          <h1 className="blog-heading">Calendar</h1>
        </Link>
        <p>An Event Creation Site</p>
      </div>
      <ul>
        {userInfo ? (
          <>
            <li>
              <Link to="/createEvent">New Event</Link>
            </li>
            <li>
              <Link to="/createAllDayEvent">All Day</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            {/* <li className="welcome">Welcome, User</li> */}
            <li onClick={logoutHandler}>
              <Link>Log out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
