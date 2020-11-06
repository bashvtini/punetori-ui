import React from "react";
import Header from "../other/Header";

import Slogan from "./Slogan";
import Path from "./Path";
import Explore from "./Explore";
import NewsLetter from "./NewsLetter";
import Ready from "./Ready";
import Footer from "./Footer";

export default function Index({ history }) {
  return (
    <div id="main-page">
      <Header history={history} />

      <Slogan />

      <Path />

      <Explore />

      <NewsLetter />

      <Ready />

      <Footer />
    </div>
  );
}
