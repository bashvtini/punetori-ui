import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import Cookies from "universal-cookie";

// DropDownMenu Icon
import DropDownMenu from "../../assets/img/menu.svg";

export default function Header({ history }) {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const { token, setState } = useContext(Context);

  const logout = () => {
    setState("token", null);
    const cookie = new Cookies();
    cookie.remove("token");

    if (history.location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <React.Fragment>
      <div id="header">
        <div className="header-container">
          <div className="logo">
            <h2>
              <Link to="/">Punetori</Link>
            </h2>
          </div>

          <div
            className="dropdown-button"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          >
            <img src={DropDownMenu} alt="Dropdown Menu Icon" />
          </div>

          <ul>
            {!token ? (
              <React.Fragment>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link to="/account">My Account</Link>
                </li>
                <li>
                  <Link to="/account/jobs">My Jobs</Link>
                </li>
                <li>
                  <Link to="/account/bookmark">My Bookmarks</Link>
                </li>
                <li onClick={() => logout()} className="logout">
                  Log Out
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>

      <div
        className="bc"
        style={{
          display: dropdownMenu ? "block" : null,
        }}
        onClick={() => setDropdownMenu(!dropdownMenu)}
      ></div>

      <ul
        className="dropdown-menu"
        style={{
          top: dropdownMenu ? "40px" : null,
        }}
      >
        {!token ? (
          <React.Fragment>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link to="/account">My Account</Link>
            </li>
            <li>
              <Link to="/account/jobs">My Jobs</Link>
            </li>
            <li>
              <Link to="/account/bookmark">My Bookmarks</Link>
            </li>
            <li onClick={() => logout()} className="logout">
              Log Out
            </li>
          </React.Fragment>
        )}
      </ul>
    </React.Fragment>
  );
}
