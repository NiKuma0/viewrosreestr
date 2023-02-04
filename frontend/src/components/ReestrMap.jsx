import React from 'react'
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet'

export function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom)
  return null;
}

function ReestrMap({ center, coordinates }) {
  return (
    <MapContainer center={center} zoom={19} className={'map-container'}>
      <ChangeView center={center} zoom={19} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon positions={coordinates}/>
    </MapContainer>
  )
};

export default ReestrMap;
