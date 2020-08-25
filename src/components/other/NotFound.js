import React from "react";
import Header from "./Header";

export default function NotFound({ history }) {
  return (
    <div id="not-found">
      <Header history={history} />

      <h1
        style={{
          textAlign: "center",
          margin: "50px 0",
        }}
      >
        404 Page Not Found
      </h1>
    </div>
  );
}
