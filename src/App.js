import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'

function App() {

  const [data, setData] = useState({buildings: []})

  useEffect(() => {

    const fetchBuildings = async () => {
      try {
        setData({buildings: data.buildings})
        const response = await axios.get(`https://applefacilities.review.blueriver.com/index.cfm/_api/json/v1/scv/building/
          ?andOpenGrouping
          &locationCode%5B0%5D=sqo
          &or
          &locationCode%5B2%5D=nwr
          &or
          &locationCode%5B4%5D=scv
          &or
          &locationCode%5B6%5D=sfo
          &closeGrouping
          &fields=buildingname,buildingabbr,lat,lng,black,buildingZone
          &active=1
          &cachedwithin=600`)
          setData({buildings: response.data})
      } catch(e) {
        console.log(e)
        setData({users: data.users})
      }
    }

    fetchBuildings()
  }, [])

  console.log(data)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
