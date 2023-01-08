import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./sidebar.scss";
// import { userType } from "../../constants/userType";
import { logout } from "../../actions/userActions";

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

const userType = {
  ADMIN: "Admin",
  EMPLOYEE: "Employee",
  MANAGER: "Manager",
};

const userInfo = "Admin";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

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
  }, [location]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        {userInfo && userInfo.firstName}{" "}
        <div className="sidebar__type"> {userInfo.type}</div>
      </div>
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
          style={{ margin: "5rem 0.5rem" }}
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
