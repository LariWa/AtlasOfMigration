import { useMapData } from "./useMapData";
import * as d3module from "d3";
import React, { useRef, useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";
import d3tip from "d3-tip";
const d3 = {
  ...d3module,
  tip: d3tip,
};
function WorldMap(props) {
  const { height, width } = useWindowDimensions();
  const mapContainerRef = useRef();
  const svgRef = useRef();
  const data = useMapData();
  /* data for total migration for each country. Saved as [{Country:value}]*/
  const [yearData, setYearData] = useState(null);

  var selectedCountry;

  useEffect(() => {
    var rootProjection = d3.geoEquirectangular().fitSize([width, height], data);

    const projection = d3.geoEquirectangular().fitSize([width, height], data); //TODO descide on projection
    const svg = d3.select(svgRef.current);


    /*  Get total mig data from model for props.model.year.
     Year can be set to test and get different years from 1980-2010 */
    //props.model.setYear('2000_2005');
    //props.model.year = ('2000_2005');
    props.model.getData()
      .then(res => {
        setYearData(res)
        console.log(res)
      });



    //tooltip-----------------------------------------------------------
    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .html(function (event) {
        return event.target.id;
      });
    const mapContainer = d3.select(mapContainerRef.current);
    svg.call(tip);

    //zoom-------------------------------------------------------------
    var yaw = d3.scaleLinear().domain([0, width]).range([0, 360]);
    var zoom = d3
      .zoom()
      .scaleExtent([1, 5])
      .extent([
        [0, 0],
        [width, height],
      ])
      .translateExtent([
        [-Infinity, 0],
        [Infinity, height],
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
      mapContainer.selectAll("path").attr("d", path.projection(projection));
    }
    mapContainer.call(zoom);
    //------------------------------------------------------------------------------
    var path = d3.geoPath(projection);
    if (data) {
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
          mouseLeaveACB(event);
        })
        .attr("class", "country")
        .transition()
        .attr("d", (feature) => path(feature));
    }
  }, [data]);

  /* so this is the structure now for each country but can be rearranged */
  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <div ref={mapContainerRef}>
        {yearData && console.log(yearData[0].Armenia)}
        {yearData && console.log(yearData[0].Panama)}
      <svg ref={svgRef} width={width} height={height} id="map"></svg>
    </div>
  );
  function clickedACB(event) {
    //TODO topography
    if (selectedCountry) selectedCountry.style.fill = "black";
    selectedCountry = event.target;
    event.target.style.fill = "red";
  }
  function mouseOverACB(event) {
    d3.selectAll(".country").transition().duration(200).style("opacity", 0.5);
    d3.select(event.target).transition().duration(200).style("opacity", 1);
  }
  function mouseLeaveACB(event) {
    d3.selectAll(".country").transition().duration(200).style("opacity", 1);
    d3.select(this).transition().duration(200).style("stroke", "transparent");
  }
}

export default WorldMap;
