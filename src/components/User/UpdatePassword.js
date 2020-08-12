import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../other/Header";
import Show from "../../assets/img/eye.svg";
import Hide from "../../assets/img/eye-off.svg";

export default function UpdatePassword({ history }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [emptyCurrentPassword, setEmptyCurrentPassword] = useState(false);
  const [emptyNewPassword, setEmptyNewPassword] = useState(false);

  const [invalidCurrentPassword, setInvalidCurrentPassword] = useState(false);
  const [invalidNewPassword, setInvalidNewPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (form) => {
    form.preventDefault();

    let err = false;

    if (currentPassword === "") {
      setEmptyCurrentPassword(true);
      err = true;
      setTimeout(() => {
        setEmptyCurrentPassword(false);
      }, 2000);
    }

    if (newPassword === "") {
      setEmptyNewPassword(true);
      err = true;
      setTimeout(() => {
        setEmptyNewPassword(false);
      }, 2000);
    }

    if (err) {
      return;
    }

    if (!(currentPassword.length > 5) || !(currentPassword.length < 100)) {
      setInvalidCurrentPassword(true);
      err = true;
      setTimeout(() => {
        setInvalidCurrentPassword(false);
      }, 2000);
    }

    if (!(newPassword.length > 5) || !(newPassword.length < 100)) {
      setInvalidNewPassword(true);
      err = true;
      setTimeout(() => {
        setInvalidNewPassword(false);
      }, 2000);
    }

    if (err) {
      return;
    }

    setLoading(true);

    try {
      const cookie = new Cookies();
      const token = cookie.get("token");
      const api = window.API_URL;
      await axios.put(
        `${api}auth/update/password`,
        {
          currentPassword,
          newPassword,
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

  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    if (token) {
      return;
    }

    history.push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div id="update-password" className="user-form">
      <Header history={history} />

      <form onSubmit={submit}>
        <h1>Change Password</h1>
        <div className="password">
          <p>Current Password</p>

          <div className="wrapper">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
            />
            <div
              className="show"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <img src={!showCurrentPassword ? Show : Hide} alt="Eye Icon" />
            </div>
          </div>

          {emptyCurrentPassword ? (
            <div className="empty-input">
              <p>Please provide current password</p>
            </div>
          ) : null}
          {invalidCurrentPassword ? (
            <div className="empty-input">
              <p>Please provide a 6 char password</p>
            </div>
          ) : null}
        </div>

        <div className="password">
          <p>New Password</p>
          <div className="wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <div
              className="show"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <img src={!showNewPassword ? Show : Hide} alt="Eye Icon" />
            </div>
          </div>

          {emptyNewPassword ? (
            <div className="empty-input">
              <p>Please provide new password</p>
            </div>
          ) : null}
          {invalidNewPassword ? (
            <div className="empty-input">
              <p>Please provide a 6 char password</p>
            </div>
          ) : null}
        </div>

        <div className="submit">
          <button type="submit">
            {loading ? <div className="loader"></div> : null} Update Password
          </button>
          {error ? (
            <div className="empty-input">
              <p>Invalid Credentials</p>
            </div>
          ) : null}

          {success ? (
            <div className="empty-input success">
              <p>Password Updated Successfully</p>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
