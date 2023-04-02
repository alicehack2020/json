import React, { useState, useEffect,useRef } from 'react';
 

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import './App.css';
import district from "./india_district.geojson"
import state from "./Indian_States"

function App() {
  const [map, setMap] = useState(null);
  const [statesLayer, setStatesLayer] = useState(state);
  const [districtsLayer, setDistrictsLayer] = useState(district);
  const mapElement = useRef(null);

  useEffect(() => {
    const initialLayers = [
      new TileLayer({
        source: new OSM(),
      }),
    ];
    const initialMap = new Map({
      target: mapElement.current,
      layers: initialLayers,
      view: new View({
        center: fromLonLat([78.4767, 22.5937]), // India's center
        zoom: 4,
      }),
    });
    setMap(initialMap);
  }, []);

  useEffect(() => {
    if (!map) return;

    const statesSource = new VectorSource({
      format: new GeoJSON(),
      url: {statesLayer},
    });

    const statesLayers = new VectorLayer({
      source: statesSource,
      visible: true,
      style: {
        fill: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        stroke: {
          color: '#319FD3',
          width: 2,
        },
        text: {
          font: '12px Calibri,sans-serif',
          fill: {
            color: '#000',
          },
          stroke: {
            color: '#fff',
            width: 3,
          },
        },
      },
    });




    const districtsSources = new VectorSource({
      format: new GeoJSON(),
      url: {districtsLayer},
    });

    const districtsLayers = new VectorLayer({
      source: districtsSources,
      visible: false,
      style: {
        fill: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        stroke: {
          color: '#319FD3',
          width: 2,
        },
        text: {
          font: '12px Calibri,sans-serif',
          fill: {
            color: '#000',
          },
          stroke: {
            color: '#fff',
            width: 3,
          },
        },
      },
    });

     
    map.addLayer(statesLayers);
    map.addLayer(districtsLayers);
  }, [map]);

  const toggleStatesLayer = () => {
    statesLayer.setVisible(!statesLayer.getVisible());
  };

  const toggleDistrictsLayer = () => {
    districtsLayer.setVisible(!districtsLayer.getVisible());
  };

  return (
  <>
      
      
      <div className="App">
      <div id="map" style={{ width: "100%", height: "400px" }} ref={mapElement}> 
      <div className="layer-toggle">
        <label htmlFor="states-layer">States</label>
        <input
          id="states-layer"
          type="checkbox"
          checked={statesLayer }
          onChange={toggleStatesLayer}
        />
         
        <input
        id="districts-layer"
        type="checkbox"
        checked={districtsLayer }
        onChange={toggleDistrictsLayer}
        />
       <label htmlFor="districts-layer">Districts</label>
     
        </div>
        </div>
        </div>
      
      
  </>

   
);
}

export default App;






       
