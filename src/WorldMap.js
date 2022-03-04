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
  const [countryCenters, setCenters] = useState(null);
  const [view, setView] = useState(2); //immigration = 0, emmigration 1, net migration=2

  const { height, width } = useWindowDimensions();
  const mapContainerRef = useRef();
  const svgRef = useRef();
  const data = useMapData();
  const min = -20;
  const max = 20; //TODO adapt to data
  const colorScale = d3
    .scaleLinear()
    .domain([min, 0, max])
    .range(["red", "white", "blue"]);

  const colorScales = [
    //immigration
    d3.scaleLinear().domain([0, 50000000]).range(["white", "blue"]),
    //emigration
    d3.scaleLinear().domain([0, 50000000]).range(["white", "red"]),
    //netmigration
    d3.scaleLinear().domain([0.0, 1.0, 2.0]).range(["red", "white", "blue"]),
  ];

  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    var rootProjection = d3.geoEquirectangular().fitSize([width, height], data);

    const projection = d3
      .geoEquirectangular()
      .fitSize([width, height], selectedCountry || data);
    //   .precision(50); //might be good to avoid glitching
    const svg = d3.select(svgRef.current);

    getCenters().then((data) => {
      setCenters(data);
    });
    //tooltip-----------------------------------------------------------
    var tip = d3
      .tip()
      .attr("class", "d3-tip")
      .html(function (event) {
        return (
          event.target.getAttribute("name") +
          "<br>" +
          displayMigrationValue(event.target.id)
        );
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

    /* check so both data and yearData are not null */
    if (data) {
      svg
        .selectAll(".country")
        .data(data.features)
        .join("path")
        .attr("id", (feature) => feature.id)
        .attr("name", (feature) => feature.properties.name)
        .style("stroke", "lightgrey")

        .on("click", (event, feature) => {
          tip.hide(event);
          clickedACB(event);
          setSelectedCountry(selectedCountry === feature ? null : feature);
        })

        .on("mouseover", function (d) {
          tip.show(d, this);
          mouseOverACB(d);
        })

        .on("mouseleave", (event) => {
          tip.hide(event);
          mouseLeaveACB(event);
        })

        .transition()
        .attr("fill", (feature) => getColor(feature.id))
        .attr("class", "country")
        .attr("d", (feature) => path(feature));

      //arrow test
      var sweden = 752;
      var thailand = 764;
      var germany = 276;
      if (countryCenters) {
        var link = [
          {
            type: "LineString",
            coordinates: [
              [
                countryCenters[sweden].longitude,
                countryCenters[sweden].latitude,
              ],
              [
                countryCenters[thailand].longitude,
                countryCenters[thailand].latitude,
              ],
            ],
          },
          {
            type: "LineString",
            coordinates: [
              [
                countryCenters[sweden].longitude,
                countryCenters[sweden].latitude,
              ],
              [
                countryCenters[germany].longitude,
                countryCenters[germany].latitude,
              ],
            ],
          },
        ];

        svg
          .selectAll("myPath")
          .data(link)
          .enter()
          .append("path")
          .attr("d", function (d) {
            return path(d);
          })
          .style("fill", "none")
          .style("stroke", "orange")
          .style("stroke-width", 3);
      }
    }
  }, [data, selectedCountry]);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <div ref={mapContainerRef}>
      <svg ref={svgRef} width={width} height={height} id="map"></svg>
    </div>
  );
  function clickedACB(event) {
    //TODO topography
    if (selectedCountry) {
      var prevCountry = document.getElementById(selectedCountry.id);
      prevCountry.style.fill = getColor(selectedCountry.id);
    }
    event.target.style.fill = "green";
  }
  function mouseOverACB(event) {
    d3.selectAll(".country").transition().duration(200).style("opacity", 0.5);
    d3.select(event.target).transition().duration(200).style("opacity", 1);
  }
  function mouseLeaveACB(event) {
    d3.selectAll(".country").transition().duration(200).style("opacity", 1);
    d3.select(this).transition().duration(200).style("stroke", "transparent");
  }
  function getColor(country) {
    var val = getMigrationDataByCountry(country);
    if (!val) return "black";
    return colorScales[view](val);
  }
  function getMigrationDataByCountry(countryId) {
    if (view === 0) return props.model.getImigrationValue(countryId);
    if (view === 1) return props.model.getEmigrationValue(countryId);
    if (view === 2) return props.model.getNetRatioMigrationValue(countryId);
  }
  function displayMigrationValue(countryId) {
    var val = getMigrationDataByCountry(countryId);
    if (val) return val.toFixed(2).toLocaleString();
    else return " -";
  }

  function getCenters() {
    /* fetch data for country x */
    return fetch(`./data/centerCountries.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        return resData;
      })
      .catch((_) => console.log(_));
  }
}

export default WorldMap;
