import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateServer.css'; // Import your CSS file

function CreateServer() {
    const [serverData, setServerData] = useState({
        id: '',
        name: '',
        language: '',
        framework: '',
    });

    const [serverCreated, setServerCreated] = useState(false); // Track server creation status

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put('http://localhost:8081/insertServer', serverData)
            .then((response) => {
                console.log('Server created:', response.data);
                setServerCreated(true); // Set server creation status to true
                // Reset the form and clear the message after 3 seconds
                setTimeout(() => {
                    setServerCreated(false);
                    setServerData({
                        id: '',
                        name: '',
                        language: '',
                        framework: '',
                    });
                }, 3000);
            })
            .catch((error) => {
                console.error('Error creating server:', error);
            });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setServerData({ ...serverData, [name]: value });
    };

    return (
        <div className="create-server-container">
            <h1 className="create-server-header">Create Server</h1>
            <form onSubmit={handleSubmit} className="create-server-form">
                <div className="form-group">
                    <label htmlFor="id">Server ID:</label>
                    <input type="text" id="id" name="id" value={serverData.id} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={serverData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="language">Language:</label>
                    <input type="text" id="language" name="language" value={serverData.language} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="framework">Framework:</label>
                    <input type="text" id="framework" name="framework" value={serverData.framework} onChange={handleChange} />
                </div>
                <button type="submit" className="create-server-button">Create Server</button>
                {serverCreated && <p className="server-created-message">Server Created</p>}
            </form>
        </div>
    );
}

export default CreateServer;
