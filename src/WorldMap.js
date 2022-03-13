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
  const [countryCenters, setCenters] = useState(null);
  const [view, setView] = useState(1); //immigration = 0, emmigration 1, net migration=2

  const { height, width } = useWindowDimensions();
  const mapContainerRef = useRef();
  const svgRef = useRef();
  const data = useMapData();

  const colorScales = [
    //immigration
    d3.scaleLinear().domain([0, 50000000]).range(["white", "blue"]),
    //emigration
    d3.scaleLinear().domain([0, 50000000]).range(["white", "red"]),
    //netmigration
    d3.scaleLinear().domain([0.0, 1.0, 2.0]).range(["red", "white", "blue"]),
  ];
  // const [selectedCountry, setSelectedCountry] = useState(null);
  const [zoomCountries, setZoomCountries] = useState(null);

  const [arrows, setArrows] = useState(null);

  useEffect(() => {
    console.log(props.year);
    setView(props.view)
    var rootProjection = d3.geoEquirectangular().fitSize([width, height], data);
    console.log(data);

    var projection;
    if (zoomCountries)
      projection = d3
        .geoEquirectangular()
        .fitSize([width, height], zoomCountries || data);
    else projection = d3.geoEquirectangular().fitSize([width, height], data);

    // .fitSize([width, height], selectedCountry || data);
    //   .precision(50); //might be good to avoid glitching
    const svg = d3.select(svgRef.current);

    getCenters().then((data) => {
      setCenters(data);
    });


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
        .style("stroke", "darkgrey")
        .attr("fill", (feature) => getColor(feature.id))
        .attr("class", "country")
        .attr("d", (feature) => path(feature))
        .on("click", (event, feature) => {
          selectedCountry = selectedCountry === feature ? null : feature;

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
      if (countryCenters && arrows && selectedCountry) {
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
  }, [data, selectedCountry, zoomCountries]);

  if (!data) {
    //console.log("loading");
    return <pre>Loading...</pre>;
  }
  return (
    <div ref={mapContainerRef}>
      <svg ref={svgRef} width={width} height={height} id="map"></svg>
    </div>
  );

  function clickedACB(event) {
    //TODO topography, if time
    showDetailView(event);
  }
  function showDetailView(event) {
    createArrows(event.target.id);
    var zoomFeatures = data.features.filter((country) => {
      return migrationCountries.some((e) => e.id == country.id);
    });
    console.log(zoomFeatures);
    zoomFeatures.push(selectedCountry);
    setZoomCountries({
      type: "FeatureCollection",
      features: zoomFeatures,
    });
  }
  function createArrows(countryId) {
    var val;

    if (view == 0) val = props.model.getImmigrantionCountries(countryId);
    else if (view == 1) val = props.model.getEmigrantionCountries(countryId);
    if (val) {
      migrationCountries = val;
      setArrows(
        val.map((item) => {
            console.log("item: ", item.id);
          return {
            type: "LineString",
            data: item.id,
            coordinates: [
              [
                countryCenters[parseInt(countryId, 10)].longitude,
                countryCenters[parseInt(countryId, 10)].latitude,
              ],
              [
                countryCenters[item.id].longitude,
                countryCenters[item.id].latitude,
              ],
            ],
          };
        })
      );
    }
  }
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
    return colorScales[view](val);
  }
  function getDetailViewColor(country) {
    if (
      migrationCountries &&
      migrationCountries.find((item) => item.id == country)
    ) {
      if (view == 0) return "red";
      if (view == 1) return "blue";
      if (view == 2) return "LightGrey";
    }
    if (selectedCountry.id == country) {
      if (view == 0) return "blue";
      if (view == 1) return "red";
      if (view == 2) {
        var val = getMigrationDataByCountry(country);
        if (!val) return "black";
        return colorScales[view](val);
      }
    }
    return "lightgrey";
  }
  function getArrowColor() {
    if (view == 0) return "darkred";
    if (view == 1) return "darkblue";
  }
  function getMigrationDataByCountry(countryId) {
    if (view === 0) return props.model.getimmigrationValue(countryId);
    if (view === 1) return props.model.getEmigrationValue(countryId);
    if (view === 2) return props.model.getNetRatioMigrationValue(countryId);
  }
  function displayMigrationValue(countryId) {
    var val = getMigrationDataByCountry(countryId);
    if (val) return val.toFixed(2).toLocaleString();
    else return " -";
  }

  function getCenters() {
    /* fetch data for country center */
    //TODO needs to be adabted, some countries are missing,
    //some centers are outside if countries consist of multible areas, or have complicated shape
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
