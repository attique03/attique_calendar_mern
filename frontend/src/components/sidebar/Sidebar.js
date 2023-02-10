import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import "./sidebar.scss";

const sidebarNavItems = [
  {
    display: "Calendar",
    icon: <i className="bx bx-calendar"></i>,
    to: "/",
    section: "",
  },
  {
    display: "New Event",
    icon: <i className="bx bx-calendar-event"></i>,
    to: "/createEvent",
    section: "createEvent",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);

    const curPath = window.location.pathname.split("/")[1];

    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo"></div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>

        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}

        <div
          className="sidebar__menu__item"
          type="submit"
          style={{  minHeight: "100.8vh" }}
          onClick={logoutHandler}
        >
          <div className="sidebar__menu__item__icon">
            <i className="bx bx-log-out"></i>
          </div>
          <div className="sidebar__menu__item__text">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
