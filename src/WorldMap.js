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
var selectedCountryFeature;
const immiColor = "cyan";
const emiColor = "#F29F05";
let view;

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
      d3
        .scaleLinear()
        .domain([-100000, 0, 100000])
        .range(["red", "white", "blue"]),
    ],
    [
      //population color Scale
      //immigration
      d3.scaleLinear().domain([0, 50]).range(["white", "blue"]),
      //emigration
      d3.scaleLinear().domain([0, 50]).range(["white", "red"]),
      //netmigration
      d3.scaleLinear().domain([-10, 0, 30]).range(["red", "white", "blue"]),
    ],
  ];
  // const [selectedCountryFeature, setSelectedCountry] = useState(null);
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

    // .fitSize([width, height], selectedCountryFeature || data);
    //   .precision(50); //might be good to avoid glitching
    const svg = d3.select(svgRef.current);

    //tooltip-----------------------------------------------------------
    var countryTip = d3
      .tip()
      .attr("class", "d3-tip")
      .html(function (event) {
        return displayMigrationValue(event.target.id);
      });
    var arrowTip = d3
      .tip()
      .attr("class", "d3-tip")
      .html(function (event) {
        //TODO nice text
        return displayMigrationValue(event.target.id);
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
      if (!selectedCountryFeature) {
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
          selectedCountryFeature = feature;

          countryTip.hide(event);
          clickedACB(event.target);
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
      if (arrows && selectedCountryFeature) {
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
      showDetailView(target.id);
      props.setCountryID(target.id);
      props.model.setCountryID(target.id);
    }

    function changeCountry(target) {
      //TODO topography, if time
      showDetailView(target.id);
    }
    function showDetailView(id) {
      if (id) {
        // just to avoid crash
        var countryId = id;
        if (props.view == 0)
          migrationCountries = props.model.getImmigrantionCountries(countryId);
        else if (props.view == 1)
          migrationCountries = props.model.getEmigrantionCountries(countryId);
        if (migrationCountries) {
          var zoomFeatures = data.features.filter((country) => {
            return migrationCountries.some((e) => e.id == country.id);
          });
          createArrows(zoomFeatures);
          zoomFeatures.push(selectedCountryFeature);
          setZoomCountries({
            type: "FeatureCollection",
            features: zoomFeatures,
          });
        } else setZoomCountries(undefined);
      }
    }

    function createArrows(targetCountries) {
      setArrows(
        targetCountries.map((targetCountry) => {
          return {
            type: "LineString",
            data: targetCountry.id,
            coordinates: [
              getCenter(selectedCountryFeature),
              getCenter(targetCountry),
            ],
          };
        })
      );
    }

    function getCenter(feature) {
      let coords = projection.invert(path.centroid(feature));
      return coords;
    }
    //go to detail view
    if (
      data &&
      props.countryId != 900 &&
      (!selectedCountryFeature ||
        (selectedCountryFeature &&
          props.countryId != selectedCountryFeature.id))
    ) {
      selectedCountryFeature = data.features.filter((country) => {
        return props.countryId == country.id;
      })[0];

      changeCountry(selectedCountryFeature);
    }
    //go back to main view
    if (data && props.countryId == 900 && selectedCountryFeature) {
      selectedCountryFeature = undefined;
      setZoomCountries(undefined);
      svg.selectAll(".arrow").remove();
    }
    console.log(view);
    console.log(props.view);
    if (
      props.view &&
      view != props.view &&
      props.countryId &&
      props.countryId != 900
    ) {
      console.log("view changed");
      view = props.view;
      showDetailView(props.countryId);
    }
  }, [
    data,
    selectedCountryFeature,
    zoomCountries,
    props.year,
    props.countryId,
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
    if (selectedCountryFeature) return getDetailViewColor(country);
    var val = getMigrationDataByCountry(country);

    if (!val) return "darkgray"; //no data available
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
    if (selectedCountryFeature.id == country) {
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
      if (props.view == 2) return props.model.getNetMigrationValue(countryId);
    } else {
      if (props.view == 0)
        return props.model.getImigrationOverPopulation(countryId);
      if (props.view == 1)
        return props.model.getEmigrationOverPopulation(countryId);
      if (props.view == 2)
        return props.model.getNetMigrationValuePopulation(countryId);
    }
  }
  function displayMigrationValue(countryId) {
    var val = getMigrationDataByCountry(countryId);

    if (val) {
      var number = Math.abs(val.toFixed(2).toLocaleString());
      var header = props.model.codeToName(countryId) + "<br/>";
      var displayValue = "";
      var color;

      if (props.view == 2) {
        if (val < 0) {
          color = emiColor;
          displayValue += "Lost " + number + " people";
        } else {
          color = immiColor;
          displayValue += "Gained " + number + " people";
        }
      }
      if (
        props.countryId &&
        props.countryId != 900 &&
        countryId != props.countryId
      ) {
        //detail view
        var data = migrationCountries.find((el) => el.id == countryId);
        if (data) {
          if (props.isPopulationView) {
            displayValue +=
              (data.value / props.model.getPopulationValue(countryId))
                .toFixed(2)
                .toLocaleString() + " %";
          } else {
            displayValue += data.value.toFixed(2).toLocaleString() + " people";
          }
          if (props.view == 0) displayValue += " emigrated to ";
          if (props.view == 1) displayValue += " immigrated from ";
          displayValue += props.model.codeToName(props.countryId);
          return header + displayValue;
        }
      } else if (
        //main view or selected country
        (props.countryId &&
          props.countryId != 900 &&
          countryId == props.countryId) ||
        props.countryId == 900
      ) {
        if (props.isPopulationView) number += "%";
        else number += " people";
        if (props.view == 0) {
          color = immiColor;
          displayValue += number + " immigrated ";
        }
        if (props.view == 1) {
          displayValue += number + " emigrated ";
          color = emiColor;
        }
      }
      // displayValue += " in " + props.year;
      return (
        header + "<span style=color:" + color + ">" + displayValue + "</span>"
      );
    } else
      return props.model.codeToName(countryId) + "<br/>" + " no data available";
  }
  function getArrowTipText(id) {
    console.log(migrationCountries.find((el) => el.id == id));
    if (props.view == 0) {
    }
    return migrationCountries.find((el) => el.id == id).value;
  }
}

export default WorldMap;
