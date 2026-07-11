import { useState, useEffect, useRef } from "react";
import { FaBell, FaChevronDown, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(e) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="navbar">

      <div className="navbar-left">

        <h2>RentPilot AI Dashboard</h2>

      </div>

      <div className="navbar-right">

        <button className="notification-btn">

          <FaBell />

          <span className="notification-dot"></span>

        </button>

        <div
          className="profile-wrapper"
          ref={dropdownRef}
        >

          <button
            className="profile-btn"
            onClick={() => setOpen(!open)}
          >

            <div className="avatar">

              A

            </div>

            <FaChevronDown
              className={`arrow ${open ? "rotate" : ""}`}
            />

          </button>

          {open && (

            <div className="profile-dropdown">

              <div className="profile-top">

                <FaUserCircle className="profile-icon" />

                <div>

                  <h4>Admin</h4>

                  <p>admin@rentpilot.ai</p>

                </div>

              </div>

              <hr />

              <button
                className="logout-btn"
                onClick={logout}
              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}