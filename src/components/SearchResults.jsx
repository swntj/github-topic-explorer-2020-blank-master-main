import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_GIT_TOPICS } from "../graphql/query";

const SearchResult = ({ searchTerm, onChange }) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (searchTerm) {
      setQuery(`${searchTerm} stars:>10000`);
    }
  }, [searchTerm]);

  const { loading, error, data } = useQuery(GET_GIT_TOPICS, {
    variables: { query },
  });

  if (loading) {
    return (
      <div>
        <i className="fa fa-spinner fa-spin mr-4" />
        <span>...Searching for {searchTerm}</span>
      </div>
    );
  }
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data &&
        data.search.edges &&
        data.search.edges.map((edge, index) => (
          <ul className="list-group" key={index}>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <h5>{edge.node.resourcePath}</h5>
                <span className="badge badge-success badge-pill badge-star">
                  <i className="fa fa-star mr-2" aria-hidden="true" />
                  {edge.node.stargazers.totalCount}
                </span>
              </div>
              <div>
                Related Topics:
                {edge.node.repositoryTopics.nodes.map((node, j) => (
                  <button
                    key={j}
                    onClick={() => onChange(node.topic.name)}
                    type="button"
                    className="btn btn-outline-info btn-sm mx-1 my-1"
                  >
                    {node.topic.name}{" "}
                    <span className="badge badge-light badge-pill">
                      <i className="fa fa-star m1-2" aria-hidden="true" />
                      {node.topic.stargazerCount}
                    </span>
                  </button>
                ))}
              </div>
            </li>
          </ul>
        ))}
    </>
  );
};

export default SearchResult;
