import { CountriesOutline } from "./CountiresOutline";
import { useMapData } from "./useMapData";
import * as d3module from "d3";
import { select, geoPath } from "d3";
import React, { useRef, useState, useEffect } from "react";
import useWindowDimensions from "./useWindowDimensions";
import d3tip from "d3-tip";
const d3 = {
  ...d3module,
  tip: d3tip,
};
function WorldMap() {
  const { height, width } = useWindowDimensions();

  // const [projection, setProjection] = React.useState(d3.geoEquirectangular());
  const mapContainerRef = useRef();

  const svgRef = useRef();
  const tooltipRef = useRef();
  const tooltip = d3.select(tooltipRef.current);

  const data = useMapData();
  const [rerender, setRerender] = useState(false);
  var selectedCountry;

  useEffect(() => {
    var rootProjection = d3.geoEquirectangular().fitSize([width, height], data);

    const projection = d3.geoEquirectangular().fitSize([width, height], data); //TODO descide on projection
    const svg = d3.select(svgRef.current);
    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .html(function (event) {
        return event.target.id;
      });
    const mapContainer = d3.select(mapContainerRef.current);
    svg.call(tip);
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
      // draw();
      mapContainer.selectAll("path").attr("d", path.projection(projection));
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
        .attr("id", (feature) => feature.properties.name)

        .on("click", (event) => {
          clickedACB(event);
        })
        .on("mouseover", function (d) {
          tip.show(d, this);
          mouseOverACB(d);
        })
        .on("mouseleave", (event) => {
          tip.hide(event);
          mouseOverACB(event);
        })
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
      <div ref={tooltipRef} className="hideTooltip" id="countryTooltip">
        Tooltip
      </div>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        id="map"
        // className="country"
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
  function clickedACB(event) {
    if (selectedCountry) selectedCountry.style.fill = "black";

    selectedCountry = event.target;
    // console.log(event.target.id);
    // console.log(d3.select("#" + event.target.id));
    console.log();
    event.target.style.fill = "red";
  }
  function mouseOverACB(event) {
    d3.select("#countryTooltip").attr("class", "showTooltip");
    console.log(d3.select("#countryTooltip"));
    d3.selectAll(".country").transition().duration(200).style("opacity", 0.5);
    d3.select(event.target).transition().duration(200).style("opacity", 1);
    //.style("stroke", "black");
  }
  function mouseLeaveACB(event) {
    var tooltip = d3.select("#countryTooltip");
    tooltip.attr("class", "hideTooltip");
    tooltip.style("top", getOffset(event.target).top + "px");
    tooltip.style("left", getOffset(event.target).left + "px");

    d3.selectAll(".country").transition().duration(200).style("opacity", 1);
    d3.select(this).transition().duration(200).style("stroke", "transparent");
  }
  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    };
  }
}

export default WorldMap;
