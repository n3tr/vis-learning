import React, { useState, useEffect, useCallback } from 'react';
import MapGL from 'react-map-gl'
import { MapStylePicker } from './controls'

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const useScreenSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const resize = useCallback(
    () => {
      setSize(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }))
    },
    [],
  )

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.addEventListener('resize', resize);
  }, [resize])

  return size
}


const App: React.FC = () => {
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/light-v9')
  const screenSize = useScreenSize()
  const [viewport, setViewport] = useState({
    longitude: -74,
    latitude: 40.7,
    zoom: 11,
  })

  return (
    <div className="App">
      <MapStylePicker onStyleChange={setMapStyle} currentStyle={mapStyle} />
      <MapGL
        {...viewport}
        maxZoom={16}
        width={screenSize.width}
        height={screenSize.height}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle={mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
      />
    </div>
  );
}

export default App;
