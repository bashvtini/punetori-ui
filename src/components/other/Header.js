import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import Cookies from "universal-cookie";
import SunIcon from "../../assets/img/sun.svg";
import MoonIcon from "../../assets/img/moon.svg";
import ArrowUpIcon from "../../assets/img/arrow-up.svg";

// DropDownMenu Icon
import DropDownMenu from "../../assets/img/menu.svg";

export default function Header({ history }) {
  const { token, setState, dropdownMenu, theme } = useContext(Context);

  const changeTheme = () => {
    const cookie = new Cookies();
    if (theme) {
      setState("theme", false);
      window.document.querySelector("body").classList.add("dark");
      cookie.set("theme", "dark");
    } else {
      setState("theme", true);
      window.document.querySelector("body").classList.remove("dark");
      cookie.set("theme", "light");
    }
  };

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
      <div id="header" className={dropdownMenu ? "test" : ""}>
        <div className="header-container">
          <div className="logo">
            <h2>
              <Link to="/">Punetori</Link>
            </h2>
          </div>

          <div
            className="dropdown-button"
            onClick={() => setState("dropdown", !dropdownMenu)}
          >
            <img src={DropDownMenu} alt="Dropdown Menu Icon" />
          </div>

          <ul>
            {!token ? (
              <React.Fragment>
                <li>
                  <Link to="/search">Search</Link>
                </li>
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
                  <Link to="/search">Search</Link>
                </li>
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
            <li onClick={changeTheme} className="theme">
              <img src={!theme ? SunIcon : MoonIcon} alt="Theme Icon" />
            </li>
          </ul>
        </div>
      </div>

      <div
        className="bc"
        style={{
          display: dropdownMenu ? "block" : null,
        }}
        onClick={() => setState("dropdown", !dropdownMenu)}
      ></div>

      <ul
        className="dropdown-menu"
        style={{
          transform: dropdownMenu ? "translateY(40px)" : null,
        }}
        onClick={(e) => {
          setState("dropdown", !dropdownMenu);
        }}
      >
        {!token ? (
          <React.Fragment>
            <li>
              <Link to="/search">Search</Link>
            </li>
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
              <Link to="/search">Search</Link>
            </li>
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
              <p>Log Out</p>
            </li>
          </React.Fragment>
        )}
        <li onClick={changeTheme} className="theme">
          <img src={!theme ? SunIcon : MoonIcon} alt="Theme Icon" />
        </li>
      </ul>

      <div
        className="goTop"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img src={ArrowUpIcon} alt="Arrow Up Icon" />
      </div>
    </React.Fragment>
  );
}
