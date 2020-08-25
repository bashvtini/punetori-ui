import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../other/Header";
import ItGirl from "../../assets/img/it-girl.svg";
import Toolbox from "../../assets/img/toolbox.svg";
import Pc from "../../assets/img/pc.svg";
import Printer from "../../assets/img/printer.svg";
import { Context } from "../Context";

export default function Index({ history }) {
  const { token } = useContext(Context);
  return (
    <div id="main-page">
      <Header history={history} />

      <div className="jumbotron">
        <div className="slogan">
          <h1>Your Passion Begins Here !</h1>
          <p>Get notified via email every time a new job its available.</p>
          {!token ? (
            <Link to="/register">Sign Up for free now.</Link>
          ) : (
            <Link to="/search" className="link-search">
              <button>Search Jobs</button>
            </Link>
          )}
        </div>
        <div className="slogan-img">
          <img src={ItGirl} alt="It Girl Icon" />
        </div>
      </div>

      <div className="explore">
        <h3>Explore The Opportunities</h3>
        <div className="row">
          <div className="col">
            <img src={Pc} alt="Pc Icon" />
            <p>Developer</p>
          </div>
          <div className="col">
            <img src={Toolbox} alt="Toolbox Icon" />
            <p>Worker</p>
          </div>
          <div className="col">
            <img src={Printer} alt="Printer Icon" />
            <p>Office Worker</p>
          </div>
        </div>
        <Link to="/search" className="link-search">
          <button>Search Jobs</button>
        </Link>
      </div>

      <footer>
        <div className="wrapper">
          <p className="copyright">@Punetori 2020. All Rights Reserved</p>

          <a href="https://github.com/bashvtini/punetori">API</a>
        </div>
      </footer>
    </div>
  );
}
