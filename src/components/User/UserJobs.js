import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../other/Header";
import BookmarkIcon from "../../assets/img/bookmark.svg";

export default function UserJobs({ history }) {
  const [jobs, setJobs] = useState([]);
  const [query, setquery] = useState("");

  const [loading, setLoading] = useState(true);

  const getJobId = (link) => {
    if (link.includes("njoftimefalas")) {
      const newLink = link.split("/");
      return newLink[newLink.length - 1];
    }
    if (link.includes("duapune")) {
      return link.split("/jobs/")[1];
    }
    if (link.includes("njoftime")) {
      return link.split("showthread.php?")[1];
    }
  };

  const bookmark = async (index) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    const api = window.API_URL;

    if (!jobs[index].bookmarked) {
      try {
        await axios.post(
          `${api}auth/bookmark`,
          {
            ...jobs[index],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const bookmarkJob = [...jobs];
        bookmarkJob[index].bookmarked = true;
        setJobs(bookmarkJob);
      } catch (error) {
        console.log("Somthing went wrong");
      }
    } else {
      try {
        await axios.delete(
          `${api}auth/bookmark/${getJobId(jobs[index].link)}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const bookmarkJob = [...jobs];
        bookmarkJob[index].bookmarked = false;
        setJobs(bookmarkJob);
      } catch (error) {}
    }
  };

  const getJobs = async (token) => {
    const api = window.API_URL;
    try {
      const data = await axios.get(`${api}auth/jobs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setquery(data.data.query);
      setJobs(data.data.data);
      setLoading(false);
    } catch (err) {
      // history.push("/")
    }
  };

  useEffect(() => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    if (token) {
      getJobs(token);
      return;
    }

    history.push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div id="user-jobs" className="job-table">
      <Header history={history} />

      <div className="jobs-wrapper">
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
          </div>
        ) : null}

        {jobs.length !== 0 ? (
          <React.Fragment>
            <div className="results-header">
              <p>{query.charAt(0).toUpperCase() + query.slice(1)} in Albania</p>
              <p className="jobs-no">{jobs.length} Jobs</p>
            </div>

            <ul className="jobs">
              {jobs.map((job, index) => (
                <li key={index}>
                  {/* eslint-disable-next-line */}
                  <a href={job.link} target="_blank">
                    {job.title}
                  </a>
                  <div
                    className={`bookmark ${job.bookmarked ? "bookmarked" : ""}`}
                    onClick={() => bookmark(index)}
                  >
                    <img src={BookmarkIcon} alt="Bookmark Icon" />
                  </div>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
}
