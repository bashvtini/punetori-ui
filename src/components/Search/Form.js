import React, { useState, useContext } from "react";
import SearchIcon from "../../assets/img/search.svg";
import axios from "axios";
import { Context } from "../Context";

export default function Form() {
  const [query, setquery] = useState("");
  const [emptyQuery, setEmptyQuery] = useState(false);
  const [city, setCity] = useState("");
  const [type, setType] = useState(0);

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
      const data = await axios.get(
        `${api}search/${query}?city=${city}&type=${type}`
      );
      setState("jobs", data.data.data);
      setState("query", query);
      setState("count", data.data.count);
    } catch (error) {
      setState("search-error", true);
    }

    setState("search-loading", false);
  };

  const availableCity = [
    "",
    "tirane",
    "durres",
    "elbasan",
    "fier",
    "gjirokaster",
    "kavaje",
    "korce",
    "kruje",
    "kukes",
    "lezhe",
    "lushnje",
    "permet",
    "peshkopi",
    "pogradec",
    "puke",
    "sarande",
    "shkoder",
    "skrapar",
    "tepelene",
    "tirane",
    "tropoje",
    "vlore",
  ];

  const availableType = [
    { name: "Select Type", value: 0 },
    { name: "Full time", value: 1 }, // Full time
    { name: "Part time", value: 2 }, // Part time
    { name: "Intership", value: 3 }, // Intership
  ];

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

        <div className="more-info">
          <div className="city">
            <select
              onChange={(e) => {
                if (e.target.value !== "") {
                  setCity(e.target.value);
                }
              }}
            >
              {availableCity.map((option, index) => (
                <option value={option} key={index}>
                  {option === "" ? "Select City" : null}
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="type">
            <select
              onChange={(e) => {
                if (e.target.value !== 0) {
                  setType(e.target.value);
                }
              }}
            >
              {availableType.map((option, index) => (
                <option value={option.value} key={index}>
                  {option === 0 ? "Select Type" : null}
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button>Search</button>
      </form>
    </div>
  );
}
