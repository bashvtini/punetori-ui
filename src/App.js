import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Provider from "./components/Context";
import Main from "./components/Main";
import Search from "./components/Search";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import GetUser from "./components/User/GetUser";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import UserJobs from "./components/User/UserJobs";
import BookmarkedJobs from "./components/User/BookmarkedJobs";
import VerifyAccount from "./components/User/VerifyAccount";
import NotFound from "./components/other/NotFound";
import ScrollToTop from "./components/other/ScrollToTop";

export default function App() {
  return (
    <Provider>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/verify/:token" component={VerifyAccount} />
          <Route exact path="/account" component={GetUser} />
          <Route exact path="/account/password" component={UpdatePassword} />
          <Route exact path="/account/jobs" component={UserJobs} />
          <Route exact path="/account/bookmark" component={BookmarkedJobs} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword/:token" component={ResetPassword} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}
