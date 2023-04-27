import React, { useState, useEffect } from 'react';
import './App.css'
function App() {
  const [routeData, setRouteData] = useState({});
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchData = async () => {
    try {
      const url = `http://localhost:4000/route?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
      const response = await fetch(url);
      const data = await response.json();
      setRouteData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [from, to]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the fetchData function again to update the data with the new input values
    fetchData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          From:
          <input type="text" value={from} onChange={(event) => setFrom(event.target.value)} />
        </label>
        <br />
        <label>
          To:
          <input type="text" value={to} onChange={(event) => setTo(event.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {routeData.status === 200 && (
       <div className="route-data">
       <div className="route-line">{`Line 1: ${routeData.line1.join(", ")}`}</div>
       <div className="route-line">{`Line 2: ${routeData.line2.join(", ")}`}</div>
       <div className="route-interchange">{`Interchange: ${routeData.interchange.join(", ")}`}</div>
       <div className="route-path">{`Path: ${routeData.path.join(" \u2192 ")}`}</div>
       <div className="route-time">{`Time: ${routeData.time} minutes`}</div>
     </div>
     
      )}
    </div>
  );
}

export default App;
