import React, { useContext } from "react";
import { Context } from "../Context";

export default function Results() {
  const { count, query, jobs, searchLoading, searchError } = useContext(
    Context
  );

  return (
    <div id="search-results">
      {searchLoading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : null}

      {searchError ? (
        <h1 style={{ textAlign: "center" }}>Nothing was found</h1>
      ) : null}

      {jobs.length !== 0 ? (
        <React.Fragment>
          <div className="results-header">
            <p>{query.charAt(0).toUpperCase() + query.slice(1)} in Albania</p>
            <p className="jobs-no">{count} Jobs</p>
          </div>

          <ul className="jobs">
            {jobs.map((job, index) => (
              // eslint-disable-next-line
              <a href={job.link} key={index} target="_blank">
                <p>{job.title}</p>
              </a>
            ))}
          </ul>
        </React.Fragment>
      ) : null}
    </div>
  );
}
