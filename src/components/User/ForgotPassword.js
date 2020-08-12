import React, { useState } from "react";
import axios from "axios";
import Header from "../other/Header";

export default function ForgotPassword({ history }) {
  const [email, setEmail] = useState("");

  const [emptyEmail, setEmptyEmail] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

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
    try {
      const api = window.API_URL;
      await axios.post(`${api}auth/forgotpassword`, { email });
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
    <div id="forgot-password" className="user-form">
      <Header history={history} />

      <form onSubmit={submit}>
        <h1>Reset your password</h1>
        <p>
          Enter your user account's verified email address and we will send you
          a password reset link.
        </p>
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

        <div className="submit">
          <button type="submit">
            {loading ? <div className="loader"></div> : null}
            Send
          </button>

          {error ? (
            <div className="empty-input">
              <p>Invalide Credentials</p>
            </div>
          ) : null}

          {success ? (
            <div className="empty-input success">
              <p>Email Send Successfully</p>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
