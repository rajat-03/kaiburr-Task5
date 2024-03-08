import React, { useState } from 'react';
import CreateServer from './components/CreateServer';
import SearchServer from './components/SearchServer';
import DeleteServer from './components/DeleteServer';
import './App.css'; // Import your CSS file

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderComponent = () => {
    switch (selectedOption) {
      case 'create':
        return <CreateServer />;
      case 'search':
        return <SearchServer />;
      case 'delete':
        return <DeleteServer />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Server Management</h1>
      <div className="button-container">
        <button className="app-btn create-btn" onClick={() => setSelectedOption('create')}>Create Server</button>
        <button className="app-btn search-btn" onClick={() => setSelectedOption('search')}>Search Server</button>
        <button className="app-btn delete-btn" onClick={() => setSelectedOption('delete')}>Delete Server</button>
      </div>
      {renderComponent()}
    </div>
  );
}

export default App;
