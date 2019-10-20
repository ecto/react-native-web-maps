import React from 'react';
import { Polygon } from 'react-google-maps';
import { LatLng } from './utils';

const MapPolygon = ({ coordinates, ...args }) => (
  <Polygon path={coordinates.map(LatLng)} options={args} />
);

export default MapPolygon;
