import React, { useState, useContext } from "react";
import SearchIcon from "../../assets/img/search.svg";
import axios from "axios";
import { Context } from "../Context";

export default function Form() {
  const [query, setquery] = useState("");
  const [emptyQuery, setEmptyQuery] = useState(false);

  const { setState, reset } = useContext(Context);

  const submit = async (form) => {
    form.preventDefault();

    if (query === "") {
      setEmptyQuery(true);
      setTimeout(() => {
        setEmptyQuery(false);
      }, 2000);
      return;
    }

    setState("search-loading", true);
    reset();

    try {
      const api = window.API_URL;
      const data = await axios.get(`${api}search/${query}`);
      setState("jobs", data.data.data);
      setState("query", query);
      setState("count", data.data.count);
    } catch (error) {
      setState("search-error", true);
    }

    setState("search-loading", false);
  };

  return (
    <div id="search-form">
      <form onSubmit={submit}>
        <div className="search-query">
          <img src={SearchIcon} alt="Search Icon" />
          <input
            type="text"
            placeholder="Search Jobs..."
            onChange={(e) => setquery(e.target.value)}
            value={query}
          />

          {emptyQuery ? (
            <div className="empty-input">
              <p>Please provide a search query</p>
            </div>
          ) : null}
        </div>

        <button>Search</button>
      </form>
    </div>
  );
}
