import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../other/Header";
import { Context } from "../Context";
import { Link } from "react-router-dom";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const { setState } = useContext(Context);

  const submit = async (form) => {
    form.preventDefault();

    let err = false;
    if (email === "") {
      setEmptyEmail(true);
      err = true;
      setTimeout(() => {
        setEmptyEmail(false);
      }, 2000);
    }

    if (password === "") {
      setEmptyPassword(true);
      err = true;
      setTimeout(() => {
        setEmptyPassword(false);
      }, 2000);
    }

    if (err) {
      return;
    }

    // eslint-disable-next-line
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex.test(email)) {
      setInvalidEmail(true);
      err = true;
      setTimeout(() => {
        setInvalidEmail(false);
      }, 2000);
    }

    if (!(password.length > 5) || !(password.length < 100)) {
      setInvalidPassword(true);
      err = true;
      setTimeout(() => {
        setInvalidPassword(false);
      }, 2000);
    }

    if (err) {
      return;
    }

    setLoading(true);

    try {
      const api = window.API_URL;
      const response = await axios.post(`${api}auth/login`, {
        email,
        password,
      });

      const cookie = new Cookies();
      cookie.set("token", response.data.token);
      setState("token", response.data.token);
      setLoading(false);
      history.push("/");
    } catch (error) {
      seterror(true);
      setLoading(false);
      setTimeout(() => {
        seterror(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    if (token) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div id="login" className="user-form">
      <Header history={history} />
      <form onSubmit={submit}>
        <h2>Login</h2>
        <div className="email">
          <p>Email Address</p>
          <input
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
            style={
              error
                ? {
                    boxShadow: "0 0 0px 2px #ad1212e6",
                  }
                : {}
            }
          />

          {emptyEmail ? (
            <div className="empty-input">
              <p>Please provide an email address</p>
            </div>
          ) : null}

          {invalidEmail ? (
            <div className="empty-input">
              <p>Please provide a valid email address</p>
            </div>
          ) : null}
        </div>

        <div className="password">
          <p>Passsword</p>
          <input
            type="password"
            placeholder="Passsword"
            min="6"
            max="100"
            onChange={(e) => setPassword(e.target.value)}
            style={
              error
                ? {
                    boxShadow: "0 0 0px 2px #ad1212e6",
                  }
                : {}
            }
          />

          {emptyPassword ? (
            <div className="empty-input">
              <p>Please provide a password</p>
            </div>
          ) : null}

          {invalidPassword ? (
            <div className="empty-input">
              <p>Please provide a 6 char password</p>
            </div>
          ) : null}
        </div>

        <div className="submit">
          <button type="submit">
            {loading ? <div className="loader"></div> : null}
            Login
          </button>

          {error ? (
            <div className="empty-input">
              <p>Invalide Credentials</p>
            </div>
          ) : null}
        </div>

        <Link to="/forgotpassword">Forgot Password</Link>
      </form>
    </div>
  );
}
