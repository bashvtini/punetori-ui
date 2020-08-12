import React from "react";
import Header from "../other/Header";
import Form from "./Form";
import Results from "./Results";

export default function Index({ history }) {
  return (
    <React.Fragment>
      <Header history={history} />
      <Form />
      <Results />
    </React.Fragment>
  );
}
