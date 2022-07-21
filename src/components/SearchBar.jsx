import React, { useEffect, useState } from "react";

const SearchBar = ({ topic, onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState(topic);

  useEffect(() => {
    setSearchTerm(topic);
  }, [topic]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav class="navbar navbar-light bg-light justify-content-between">
      <div style={{width: '100vw', display: 'flex', justifyContent: 'space-between'}}>
        <a href="/#" class="navbar-brand">List</a>
        <input
          value={searchTerm}
          onChange={handleChange}
          class="form-control mr-sm-2"
          type="search"yeah
          placeholder="Search"
          aria-label="Search"
        />
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          onClick={() => onSearchChange(searchTerm)}
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default SearchBar;
