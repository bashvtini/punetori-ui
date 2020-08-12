import React, { useState } from "react";
import Header from "../other/Header";
import axios from "axios";
import Show from "../../assets/img/eye.svg";
import Hide from "../../assets/img/eye-off.svg";

export default function ResetPassword({ history, match }) {
  const [password, setPassword] = useState("");

  const [emptyPassword, setEmptyPassword] = useState(false);

  const [invalidPassword, setInvalidPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (form) => {
    form.preventDefault();
    let err = false;

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
      const token = match.params.token;
      const api = window.API_URL;
      await axios.put(`${api}auth/resetpassword/${token}`, { password });

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
  return (
    <div id="reset-password" className="user-form">
      <Header history={history} />
      <form onSubmit={submit}>
        <h1>Reset Password</h1>
        <div className="password">
          <p>New Password</p>
          <div className="wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div
              className="show"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={!showPassword ? Show : Hide} alt="Eye Icon" />
            </div>
          </div>

          {emptyPassword ? (
            <div className="empty-input">
              <p>Please provide new password</p>
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
            {loading ? <div className="loader"></div> : null} Reset Password
          </button>
          {error ? (
            <div className="empty-input">
              <p>Invalid Token</p>
            </div>
          ) : null}

          {success ? (
            <div className="empty-input success">
              <p>Password Reseted Successfully</p>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
