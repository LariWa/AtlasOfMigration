import { CountriesOutline } from "./CountiresOutline";
import { useMapData } from "./useMapData";
import * as d3 from "d3";
import { select, geoPath } from "d3";
import React, { useRef, useState, useEffect } from "react";
const width = 960;
const height = 500;

function WorldMap() {
  // const [projection, setProjection] = React.useState(d3.geoEquirectangular());
  const mapContainerRef = useRef();

  const svgRef = useRef();

  const data = useMapData();
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    var rootProjection = d3.geoEquirectangular();

    const projection = d3.geoEquirectangular(); //TODO descide on projection
    const svg = d3.select(svgRef.current);
    const mapContainer = d3.select(mapContainerRef.current);
    var yaw = d3.scaleLinear().domain([0, width]).range([0, 360]);
    var zoom = d3
      .zoom()
      .scaleExtent([1, 5])
      .extent([
        [0, 0],
        [width, height],
      ])
      .translateExtent([
        [-Infinity, -Infinity],
        [Infinity, Infinity],
      ])
      .on("zoom", (event) => {
        console.log("zoom");
        zoomed(event);
      });
    function zoomed(event) {
      var scale = rootProjection.scale();
      var translate = rootProjection.translate();
      var t = event.transform;
      var tx = translate[0] - t.invertX(translate[0]);
      var ty = translate[1] * t.k + t.y;
      projection
        .scale(t.k * scale)
        .rotate([yaw(tx), 0, 0])
        .translate([translate[0], ty]);
      // setRerender(!rerender);
      //  setProjection(projection);
      // draw();
      draw();
    }
    mapContainer.call(zoom);

    var path = geoPath(projection);
    if (data) {
      draw();
    }
    function draw() {
      svg.selectAll("*").remove();
      svg
        .selectAll(".country")
        .data(data.features)
        .join("path")
        .attr("class", "country")
        .transition()
        .attr("d", (feature) => path(feature));
    }
  }, [data]);
  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <div ref={mapContainerRef}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        id="map"
        className="country"
      >
        {/* <g className="countries">
          {data.features.map((feature) => (
            <svg title={feature.properties.name} key={feature.properties.name}>
              <title>{feature.properties.name}</title>
              <path
                className="countryOutline"
                onClick={() => console.log(feature.properties.name)}
                // onMouseOver={mouseOver}
                // onMouseLeave={mouseLeave}
                d={path(feature)}
              />
            </svg>
          ))}
        </g> */}
      </svg>
    </div>
  );
}

export default WorldMap;
