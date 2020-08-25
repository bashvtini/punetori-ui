import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../other/Header";

export default function Register({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState(0);

  const [emptyName, setemptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyJobTitle, setEmptyJobTitle] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const availableCity = [
    "",
    "tirane",
    "durres",
    "elbasan",
    "fier",
    "gjirokaster",
    "kavaje",
    "korce",
    "kruje",
    "kukes",
    "lezhe",
    "lushnje",
    "permet",
    "peshkopi",
    "pogradec",
    "puke",
    "sarande",
    "shkoder",
    "skrapar",
    "tepelene",
    "tirane",
    "tropoje",
    "vlore",
  ];

  const availableType = [
    { name: "Select Type", value: 0 },
    { name: "Full time", value: 1 }, // Full time
    { name: "Part time", value: 2 }, // Part time
    { name: "Intership", value: 3 }, // Intership
  ];

  const submit = async (form) => {
    form.preventDefault();

    let err = false;

    if (name === "") {
      setemptyName(true);
      err = true;
      setTimeout(() => {
        setemptyName(false);
      }, 2000);
    }
    if (email === "") {
      setEmptyEmail(true);
      err = true;
      setTimeout(() => {
        setEmptyEmail(false);
      }, 2000);
    }
    if (jobTitle === "") {
      setEmptyJobTitle(true);
      err = true;
      setTimeout(() => {
        setEmptyJobTitle(false);
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
    setError(false);

    try {
      const api = window.API_URL;
      await axios.post(`${api}auth/register`, {
        name,
        email,
        jobTitle,
        password,
        city,
        type,
      });

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
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
    <div id="register" className="user-form">
      <Header history={history} />

      <form onSubmit={submit}>
        <h1>Register</h1>
        <div className="name">
          <p>Full Name</p>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {emptyName ? (
            <div className="empty-input">
              <p>Please provide a Name</p>
            </div>
          ) : null}
        </div>

        <div className="email">
          <p>Email Address</p>
          <input
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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

        <div className="job-title">
          <p>Job Title</p>
          <input
            type="text"
            placeholder="Job Title"
            onChange={(e) => setJobTitle(e.target.value)}
            value={jobTitle}
          />
          {emptyJobTitle ? (
            <div className="empty-input">
              <p>Please provide a job title</p>
            </div>
          ) : null}
        </div>

        <div className="more-info">
          <div className="city">
            <p>City</p>
            <select
              onChange={(e) => {
                if (e.target.value !== "") {
                  setCity(e.target.value);
                }
              }}
            >
              {availableCity.map((option, index) => (
                <option value={option} key={index}>
                  {option === "" ? "Select City" : null}
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="type">
            <p>Type</p>
            <select
              onChange={(e) => {
                if (e.target.value !== 0) {
                  setType(e.target.value);
                }
              }}
            >
              {availableType.map((option, index) => (
                <option value={option.value} key={index}>
                  {option === 0 ? "Select Type" : null}
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="password">
          <p>Password</p>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
            {loading ? <div className="loader"></div> : null} Register
          </button>
          {error ? (
            <div className="empty-input">
              <p>User already exists</p>
            </div>
          ) : null}

          {success ? (
            <div className="empty-input success">
              <p>Please check your email address</p>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
