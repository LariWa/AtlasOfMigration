import React, { useState, useEffect } from "react";

import { json } from "d3";
import { feature } from "topojson";
const worldJSONUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useMapData = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    json(worldJSONUrl).then((topojsonData) => {
      const { countries } = topojsonData.objects;
      setMapData(feature(topojsonData, countries)); //convert to geojson is easier to work with (topojson better to save data)
    });
  }, []);

  return mapData;
};
