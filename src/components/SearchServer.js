import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SearchServer.css';

function SearchServer() {
  const [searchType, setSearchType] = useState(''); // 'id', 'name', 'showAll'
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchType === 'showAll') {
      // Automatically fetch data when "Show All" is selected
      fetchData('showAll');
    }
    // eslint-disable-next-line
  }, [searchType]);

  const fetchData = (type) => {
    let url = 'http://localhost:8081/getServers';

    if (type === 'id') {
      url = `http://localhost:8081/getServers/${searchValue}`;
    } else if (type === 'name') {
      url = `http://localhost:8081/findByName/${searchValue}`;
    }

    axios
      .get(url)
      .then((response) => {
        if (type === 'id') {
          if (response.data.id) {
            setSearchResults([response.data]);
            setError(null);
          } else {
            setSearchResults(['404, Server not found']);
            // setError();
          }
        } else {
          const results = response.data;
          if (results.length === 0) {
            setError('404, Server not found');
          } else {
            setSearchResults(results);
            setError(null);
          }
        }
      })
      .catch((error) => {
        setError('404, Server not found');
        setSearchResults([]);
      });
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType !== 'showAll') {
      fetchData(searchType);
    }
  };

  const sortedResults = searchResults.slice().sort((a, b) => a.id - b.id);


  return (
    <div className="search-server-container">
      <h1 className="search-server-header">Search Server</h1>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-options">
          <label>Search By:</label>
          <select onChange={(e) => setSearchType(e.target.value)}>
            <option value="">Select...</option>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="showAll">Show All</option>
          </select>
        </div>
        {searchType !== 'showAll' && (
          <div className="search-options">
            <label>Search Value:</label>
            <input
              className="search-input"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        )}
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="search-results">
        <h2>Search Result</h2>
        {searchResults.length > 0 ? (
          <table className="results-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Language</th>
                <th>Framework</th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((result) => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.name}</td>
                  <td>{result.language}</td>
                  <td>{result.framework}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          searchType === 'showAll' && <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchServer;