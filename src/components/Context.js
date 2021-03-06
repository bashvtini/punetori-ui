import React, { Component } from "react";
import Cookies from "universal-cookie";

export const Context = React.createContext();

export default class Provider extends Component {
  state = {
    jobs: [],
    query: "",
    count: 0,
    searchLoading: false,
    searchError: false,
    token: null,
    dropdownMenu: false,
    verifySuccess: false,
    verifyError: false,
    theme: true,
    setState: (state, data) => {
      switch (state) {
        case "jobs":
          this.setState({ jobs: data });
          break;
        case "query":
          this.setState({ query: data });
          break;
        case "count":
          this.setState({ count: data });
          break;
        case "search-loading":
          this.setState({ searchLoading: data });
          break;
        case "search-error":
          this.setState({ searchError: data });
          break;
        case "token":
          this.setState({ token: data });
          break;
        case "dropdown":
          this.setState({ dropdownMenu: data });
          break;
        case "verifySuccess":
          this.setState({ verifySuccess: data });
          break;
        case "verifyError":
          this.setState({ verifyError: data });
          break;
        case "theme":
          this.setState({ theme: data });
          break;
        default:
          break;
      }
    },
    reset: () => {
      this.setState({
        jobs: [],
        query: "",
        count: 0,
        searchError: false,
      });
    },
  };

  componentDidMount() {
    const cookie = new Cookies();
    const token = cookie.get("token");
    const theme = cookie.get("theme");

    if (!theme) {
      cookie.set("theme", "light");
    } else {
      if (theme === "dark") {
        this.setState({ theme: false });
        window.document.querySelector("body").classList.add("dark");
        cookie.set("theme", "dark");
      } else {
        this.setState({ theme: true });
        window.document.querySelector("body").classList.remove("dark");
        cookie.set("theme", "light");
      }
    }

    if (token) {
      this.setState({ token });
    }
  }

  render() {
    if (this.state.dropdownMenu) {
      document.body.classList.add("body");
    } else {
      document.body.classList.remove("body");
    }
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
