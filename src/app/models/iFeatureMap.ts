export interface iFeatureMaps {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: number[];
  };
  properties: {
    popupContent: string;
    name: number,
  };
}
