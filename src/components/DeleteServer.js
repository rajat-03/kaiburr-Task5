import React, { useState } from 'react';
import axios from 'axios';
import '../css/DeleteServer.css'; // Import your CSS file

function DeleteServer() {
  const [serverId, setServerId] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:8081/deleteServer/${serverId}`)
      .then(() => {
        setIsDeleted(true);
        // Perform any necessary actions after server deletion

        // Clear the input field and the "Server has been deleted" message after 3 seconds
        setTimeout(() => {
          setServerId('');
          setIsDeleted(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error deleting server:', error);
      });
  };

  return (
    <div className="delete-server-container">
      <h1 className="delete-server-header">Delete Server</h1>
      <form onSubmit={handleDelete} className="delete-server-form">
        <div className="form-group">
          <label>Server ID to Delete:</label>
          <input type="text" value={serverId} onChange={(e) => setServerId(e.target.value)} />
        </div>
        <button type="submit" className="delete-server-button">Delete Server</button>
      </form>
      {isDeleted && <p className="server-deleted-message">Server has been deleted.</p>}
    </div>
  );
}

export default DeleteServer;
