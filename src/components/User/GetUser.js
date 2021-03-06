import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../other/Header";
import { Link } from "react-router-dom";
import CheckIcon from "../../assets/img/check.svg";
import { Context } from "../Context";

export default function Register({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [city, setCity] = useState("");
  const [type, setType] = useState(0);

  const [deleteModal, setDeleteModal] = useState(false);

  const [emptyName, setemptyName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyJobTitle, setEmptyJobTitle] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { setState } = useContext(Context);

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

    if (err) {
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const cookie = new Cookies();
      const token = cookie.get("token");
      const api = window.API_URL;
      await axios.put(
        `${api}auth/update`,
        {
          name,
          email,
          jobTitle,
          sendEmail,
          jobCity: city,
          jobType: type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }

    setLoading(false);
  };

  const getUser = async (token) => {
    const api = window.API_URL;
    const data = await axios.get(`${api}auth/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const {
      name,
      email,
      jobTitle,
      sendEmail,
      jobCity,
      jobType,
    } = data.data.user;

    setName(name);
    setEmail(email);
    setJobTitle(jobTitle);
    setSendEmail(sendEmail);
    setCity(jobCity);
    setType(jobType);
  };

  const deleteAccount = async () => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    const api = window.API_URL;
    try {
      await axios.delete(`${api}auth/remove`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      cookie.remove("token");
      setState("token", null);
      history.push("/");
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    if (token) {
      getUser(token);
      return;
    }

    history.push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div id="user-detail" className="user-form">
      <Header history={history} />
      {deleteModal ? (
        <div className="delete-modal">
          <h1>Are you shure you want to delete your account</h1>
          <div>
            <button className="delete" onClick={() => deleteAccount()}>
              Yes
            </button>
            <button onClick={() => setDeleteModal(false)}>No</button>
          </div>
        </div>
      ) : null}

      <form onSubmit={submit}>
        <div className="head">
          <h1>User Detail</h1>
          <button
            className="delete"
            type="button"
            onClick={() => setDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
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

        <div className="send-emails">
          <p>Send Email</p>
          <div className="check" onClick={() => setSendEmail(!sendEmail)}>
            {sendEmail ? <img src={CheckIcon} alt="Check Icon" /> : null}
          </div>
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
              value={city}
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
              value={type}
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

        <div className="submit">
          <button type="submit">
            {loading ? <div className="loader"></div> : null} Update
          </button>
          {error ? (
            <div className="empty-input">
              <p>Invalid Credentials</p>
            </div>
          ) : null}

          {success ? (
            <div className="empty-input success">
              <p>Details Updated Successfully</p>
            </div>
          ) : null}
        </div>

        <Link to="/account/password">Change Password</Link>
      </form>
    </div>
  );
}
