import { CountriesOutline } from "./CountiresOutline";
import { useMapData } from "./useMapData";
import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
const width = 960;
const height = 500;
function WorldMap() {
  const svgRef = useRef();
  const mapContainerRef = useRef();

  const data = useMapData();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const mapContainer = d3.select(mapContainerRef.current);

    const zoom = d3
      .zoom()
      .scaleExtent([1, 2])
      .on("zoom", (event) => {
        svg.attr("transform", event.transform);
      })
      .scaleExtent([1, 40]);
    mapContainer.call(zoom);
  });

  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <div ref={mapContainerRef}>
      <svg ref={svgRef} width={width} height={height} id="map">
        <CountriesOutline data={data} />
      </svg>
    </div>
  );
}

export default WorldMap;
