import { useMapData } from "./useMapData";
import * as d3module from "d3";
import React, { useRef, useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";
import d3tip from "d3-tip";
const d3 = {
  ...d3module,
  tip: d3tip,
};
var migrationCountries;
var selectedCountry;

function WorldMap(props) {
  const { height, width } = useWindowDimensions();
  const mapContainerRef = useRef();
  const svgRef = useRef();
  const data = useMapData();

  const colorScales = [
    [
      //immigration
      d3.scaleLinear().domain([0, 50000000]).range(["white", "blue"]),
      //emigration
      d3.scaleLinear().domain([0, 50000000]).range(["white", "red"]),
      //netmigration
      d3.scaleLinear().domain([0.0, 1.0, 2.0]).range(["red", "white", "blue"]),
    ],
    [
      //population color Scale
      //immigration
      d3.scaleLinear().domain([0, 50]).range(["white", "blue"]),
      //emigration
      d3.scaleLinear().domain([0, 50]).range(["white", "red"]),
      //netmigration
      d3.scaleLinear().domain([0.0, 1.0, 2.0]).range(["red", "white", "blue"]),
    ],
  ];
  // const [selectedCountry, setSelectedCountry] = useState(null);
  const [zoomCountries, setZoomCountries] = useState(null);

  const [arrows, setArrows] = useState(null);

  useEffect(() => {
    var rootProjection = d3.geoEquirectangular().fitSize([width, height], data);

    var projection;
    if (zoomCountries)
      projection = d3
        .geoEquirectangular()
        .fitSize([width, height], zoomCountries || data);
    else projection = d3.geoEquirectangular().fitSize([width, height], data);

    // .fitSize([width, height], selectedCountry || data);
    //   .precision(50); //might be good to avoid glitching
    const svg = d3.select(svgRef.current);

    //tooltip-----------------------------------------------------------
    var countryTip = d3
      .tip()
      .attr("class", "d3-tip")
      .html(function (event) {
        return (
          event.target.getAttribute("name") +
          "<br>" +
          displayMigrationValue(event.target.id)
        );
      });
    var arrowTip = d3
      .tip()
      .attr("class", "d3-tip")
      .html(function (event) {
        //TODO nice text
        return migrationCountries.find((el) => el.id == event.target.id).value;
      });
    const mapContainer = d3.select(mapContainerRef.current);
    svg.call(countryTip);
    svg.call(arrowTip);

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
      if (!selectedCountry) {
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
        .style("stroke", "darkgrey")
        .attr("fill", (feature) => getColor(feature.id))
        .attr("class", "country")
        .attr("d", (feature) => path(feature))
        .on("click", (event, feature) => {
          selectedCountry = feature;

          countryTip.hide(event);
          clickedACB(event);
        })

        .on("mouseover", function (d) {
          countryTip.show(d, this);
          mouseOverACB(d);
        })

        .on("mouseleave", (event) => {
          countryTip.hide(event);
          mouseLeaveACB(event);
        });

      //arrows
      if (arrows && selectedCountry) {
        svg.selectAll(".arrow").remove();
        svg
          .selectAll("arrows")
          .data(arrows)
          .join("path")

          .attr("id", (feature) => feature.data)

          .attr("class", "arrow")
          .attr("d", function (d) {
            return path(d);
          })
          .style("fill", "none")
          .style("stroke", getArrowColor())
          .style("stroke-width", 3)
          .attr("markerWidth", 50)
          .attr("markerHeight", 50)
          .attr("marker-end", "url(#arrow)")
          .attr("marker-start", "url(#arrow)")

          .on("mouseover", function (d) {
            arrowTip.show(d, this);
          })
          .on("mouseleave", (event) => {
            arrowTip.hide(event);
          });
      }
    }
    function clickedACB(target) {
      //TODO topography, if time
      console.log(target.originalTarget.id);
      //console.log(target);

      // props.setCountryName(props.model.codeToName(target.id));
      console.log(Number(target.originalTarget.id));
      props.setCountryID(Number(Number(target.originalTarget.id)));
      props.model.setCountryID(Number(target.originalTarget.id));
      //props.setCountryName(props.model.codeToName(target.id));
      showDetailView(target);
    }
    function showDetailView(event) {
      var countryId = event.target.id;
      if (props.view == 0)
        migrationCountries = props.model.getImmigrantionCountries(countryId);
      else if (props.view == 1)
        migrationCountries = props.model.getEmigrantionCountries(countryId);
      if (migrationCountries) {
        var zoomFeatures = data.features.filter((country) => {
          return migrationCountries.some((e) => e.id == country.id);
        });
        createArrows(zoomFeatures);
        zoomFeatures.push(selectedCountry);
        setZoomCountries({
          type: "FeatureCollection",
          features: zoomFeatures,
        });
      }
    }
    function createArrows(targetCountries) {
      setArrows(
        targetCountries.map((targetCountry) => {
          return {
            type: "LineString",
            data: targetCountry.id,
            coordinates: [getCenter(selectedCountry), getCenter(targetCountry)],
          };
        })
      );
    }

    function getCenter(feature) {
      let coords = projection.invert(path.centroid(feature));
      return coords;
    }
  }, [
    data,
    selectedCountry,
    zoomCountries,
    props.year,
    props.view,
    props.scale,
  ]);

  if (!data) {
    //console.log("loading");
    return <pre>Loading...</pre>;
  }
  return (
    <div ref={mapContainerRef}>
      <svg ref={svgRef} width={width} height={height} id="map"></svg>
    </div>
  );
  function mouseOverACB(event) {
    d3.selectAll(".country").transition().duration(200).style("opacity", 0.5);
    d3.select(event.target).transition().duration(200).style("opacity", 1);
  }
  function mouseLeaveACB(event) {
    d3.selectAll(".country").transition().duration(200).style("opacity", 1);
    d3.select(this).transition().duration(200).style("stroke", "transparent");
  }
  /*    */
  function getColor(country) {
    if (selectedCountry) return getDetailViewColor(country);
    var val = getMigrationDataByCountry(country);

    if (!val) return "black"; //no data available
    if (val < props.scale[1] && val > props.scale[0])
      return colorScales[+props.isPopulationView][props.view](val);
    else return "grey";
  }
  function getDetailViewColor(country) {
    if (
      migrationCountries &&
      migrationCountries.find((item) => item.id == country)
    ) {
      if (props.view == 0) return "red";
      if (props.view == 1) return "blue";
      if (props.view == 2) return "LightGrey";
    }
    if (selectedCountry.id == country) {
      if (props.view == 0) return "blue";
      if (props.view == 1) return "red";
      if (props.view == 2) {
        var val = getMigrationDataByCountry(country);
        if (!val) return "black";
        return colorScales[+props.isPopulationView][props.view](val);
      }
    }
    return "lightgrey";
  }
  function getArrowColor() {
    if (props.view == 0) return "darkred";
    if (props.view == 1) return "darkblue";
  }
  function getMigrationDataByCountry(countryId) {
    if (!props.isPopulationView) {
      if (props.view == 0) return props.model.getImmigrationValue(countryId);
      if (props.view == 1) return props.model.getEmigrationValue(countryId);
      if (props.view == 2)
        return props.model.getNetRatioMigrationValue(countryId);
    } else {
      if (props.view == 0)
        return props.model.getImigrationOverPopulation(countryId);
      if (props.view == 1)
        return props.model.getEmigrationOverPopulation(countryId);
      if (props.view == 2)
        return props.model.getNetRatioMigrationValue(countryId);
    }
  }
  function displayMigrationValue(countryId) {
    var val = getMigrationDataByCountry(countryId);
    if (val) return val.toFixed(2).toLocaleString();
    else return " -";
  }
}

export default WorldMap;
