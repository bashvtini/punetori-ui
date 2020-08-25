import React, { useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import { Context } from "../Context";
import axios from "axios";

export default function VerifyAccount({ match, history }) {
  const { setState } = useContext(Context);

  const verifyUser = async () => {
    const api = window.API_URL;

    try {
      const response = await axios.get(
        `${api}auth/verify/${match.params.token}`
      );

      const cookie = new Cookies();
      cookie.set("token", response.data.token);
      setState("token", response.data.token);
      setState("verifySuccess", true);
      history.push("/");
    } catch (error) {
      setState("verifyError", true);
      history.push("/");
    }
  };
  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    if (!token) {
      verifyUser();
    }
    history.push("/");
    // eslint-disable-next-line
  }, []);
  return <div>Please Wait</div>;
}
