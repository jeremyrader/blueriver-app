import React, { useEffect, useState } from 'react';

import axios from 'axios'

function App() {

  const [data, setData] = useState({zones: []})

  useEffect(() => {

    const fetchBuildings = async () => {
      try {
        setData({zones: data.zones})
        const response = await axios.get(`https://applefacilities.review.blueriver.com/index.cfm/_api/json/v1/scv/building/?andOpenGrouping&locationCode%5B0%5D=sqo&or&locationCode%5B2%5D=nwr&or&locationCode%5B4%5D=scv&or&locationCode%5B6%5D=sfo&closeGrouping&fields=buildingname,buildingabbr,lat,lng,black,buildingZone&active=1&cachedwithin=600`)
          
        let zones = {}

        let items = response.data.data.items

        for (var item in items) {
          if (!zones[items[item].buildingzone]) {
            zones[items[item].buildingzone] = [ items[item] ]
          } 
          else {
            zones[items[item].buildingzone].push(items[item])
          }
        }
        setData({zones: zones})
      } catch(e) {
        console.log(e)
        setData({zones: data.zones})
      }
    }

    fetchBuildings()
  }, [])

  return (
    <div style={{padding: 20 }} className="App">
      <h1>Index</h1>
      {
          Object.keys(data.zones)
            .filter(zone => zone.length > 1)
            .sort()
            .map(zone => {
            return (
              <div>
                <hr/>
                <h2>{zone}</h2>
                <div style={{display: 'flex', flexDirection: 'row', flexFlow: 'row wrap'}}>
                {
                  data.zones[zone]
                    .sort((a,b) => {
                      if (a.buildingname < b.buildingname) return -1
                      if (a.buildingname > b.buildingname) return 1
                      return 0
                    })
                    .map(building => {
                    return building.black ? (
                      <span style={{flexBasis: '20%', width: '200px;'}}>{building.buildingname}</span>
                      ) :
                      (
                        <a style={{flexBasis: '20%', width: '200px;'}} href="https://applefacilities.review.blueriver.com">{building.buildingname}</a>
                      )
                  })
                }
                </div>
              </div>
            )
          })
        }
    </div>
  );
}

export default App;
