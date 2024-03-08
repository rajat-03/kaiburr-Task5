import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ServerDetails() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    // Make a GET request to your Spring Boot backend to fetch all servers
    axios.get('http://localhost:8081/getServers') // Adjust the URL to match your backend's API endpoint
      .then((response) => {
        setServers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching servers:', error);
      });
  }, []);

  return (
    <div>
      <h1>Servers List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Framework</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server) => (
            <tr >
              <td>{server.name}</td>
              <td>{server.language}</td>
              <td>{server.framework}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServerDetails;
