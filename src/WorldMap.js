import { useMapData } from "./useMapData";
import * as d3module from "d3";
import React, { useRef, useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";
import d3tip from "d3-tip";
const d3 = {
  ...d3module,
  tip: d3tip,
};
let migrationCountries;
var selectedCountryFeature;
let zoomCountriesCurrent;
let selectedCountry;
const immiColor = "cyan";
const emiColor = "#F29F05";
let view;
let arrows;

function WorldMap(props) {
  const height = useWindowDimensions().height * 0.8;
  var width = useWindowDimensions().width * 0.73;
  if (useWindowDimensions().width * 0.2)
    width =
      useWindowDimensions().width - (270 + useWindowDimensions().width * 0.07);
  const mapContainerRef = useRef();
  const svgRef = useRef();
  const data = useMapData();
  const colorScales = [
    [
      //immigration
      d3.scaleLinear().domain([0, 10000000]).range(["white", immiColor]),
      //emigration
      d3.scaleLinear().domain([0, 10000000]).range(["white", emiColor]),
      //netmigration
      d3
        .scaleLinear()
        .domain([-10000000, 0, 10000000])
        .range([emiColor, "white", immiColor]),
    ],
    [
      //population color Scale
      //immigration
      d3.scaleLinear().domain([0, 30]).range(["white", immiColor]),
      //emigration
      d3.scaleLinear().domain([0, 30]).range(["white", emiColor]),
      //netmigration
      d3
        .scaleLinear()
        .domain([-20, 0, 20])
        .range([emiColor, "white", immiColor]),
    ],
  ];
  // const [selectedCountryFeature, setSelectedCountry] = useState(null);
  const [zoomCountriesChange, setZoomCountriesChange] = useState(null);

  useEffect(() => {
    d3.selectAll(".d3-tip-map").remove(); //remove all tooltips --> fixes bug

    var projection = d3
      .geoEquirectangular()
      .fitSize([width, height], zoomCountriesCurrent || data);
    var rootProjection = d3
      .geoEquirectangular()
      .fitSize([width, height], zoomCountriesCurrent || data);

    const svg = d3.select(svgRef.current);

    //tooltip-----------------------------------------------------------
    var countryTip = d3
      .tip()
      .attr("class", "d3-tip-map")

      .html(function (event) {
        return displayMigrationValue(event.target);
      });

    var arrowTip = d3
      .tip()
      .attr("class", "d3-tip-map")

      .html(function (event) {
        //TODO nice text
        return displayMigrationValue(event.target);
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
      // if (!selectedCountryFeature) {
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
      // }
    }
    mapContainer.call(zoom);
    //keep track of view changes
    // if (
    //   props.view &&
    //   view != props.view &&
    //   props.countryId &&
    //   props.countryId != 900
    // ) {
    //   view = props.view;

    // }
    //------------------------------------------------------------------------------
    var path = d3.geoPath(projection);

    /* check so both data and yearData are not null */
    if (data) {
      //updateDetailView
      showDetailView(selectedCountry);

      svg
        .selectAll(".country")
        .data(data.features)
        .join("path")
        .attr("id", (feature) => feature.id)
        .attr("name", (feature) => feature.properties.name)
        .style("stroke", "darkgrey")
        .on("click", (event, feature) => {
          selectedCountryFeature = feature;
          selectedCountry = feature.id;
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
        })
        .attr("fill", (feature) => getColor(feature.id))
        .attr("class", "country")
        .attr("d", (feature) => path(feature));

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
          .style("stroke-width", (feature) => getArrowWidth(feature.data))
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
      getMigrationCountries(target.id);
      showDetailView(target.id);
      props.setCountryID(target.id);
      props.model.setCountryID(target.id);
    }

    function changeCountry(target) {
      //TODO topography, if time
      if (target) showDetailView(target.id);
    }
    function getMigrationCountries(countryId) {
      if (countryId != 900) {
        if (props.view == 0)
          migrationCountries = props.model.getImmigrantionCountries(countryId);
        else if (props.view == 1)
          migrationCountries = props.model.getEmigrantionCountries(countryId);
      }
    }
    function showDetailView(id) {
      if (
        //check if immi/emi detail view
        id &&
        (props.view == 0 || props.view == 1 || props.view == 2) &&
        props.countryId != 900
      ) {
        if (props.view == 0 || props.view == 1) {
          getMigrationCountries(selectedCountry);

          if (props.view != 2 && migrationCountries) {
            var zoomFeatures = data.features.filter((country) => {
              return migrationCountries.some((e) => e.id == country.id);
            });
            createArrows(zoomFeatures);
            zoomFeatures.push(selectedCountryFeature);

            if (
              !zoomCountriesChange ||
              JSON.stringify(zoomFeatures) !=
                JSON.stringify(zoomCountriesChange.features)
            ) {
              setZoomCountriesChange({
                type: "FeatureCollection",
                features: zoomFeatures,
              });
              zoomCountriesCurrent = {
                type: "FeatureCollection",
                features: zoomFeatures,
              };
            }
          }
        } else {
          setZoomCountriesChange(selectedCountryFeature);
          zoomCountriesCurrent = selectedCountryFeature;
        }
      }
    }

    function createArrows(targetCountries) {
      arrows = targetCountries.map((targetCountry) => {
        return {
          type: "LineString",
          data: targetCountry.id,
          coordinates: [
            getCenter(selectedCountryFeature),
            getCenter(targetCountry),
          ],
        };
      });
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
      selectedCountry = props.countryId;
      if (selectedCountryFeature) changeCountry(selectedCountryFeature);
    }
    //go back to main view
    if (data && props.countryId == 900 && selectedCountryFeature) {
      selectedCountryFeature = undefined;
      if (zoomCountriesChange) {
        setZoomCountriesChange(undefined);
        zoomCountriesCurrent = undefined;
      }
      svg.selectAll(".arrow").remove();
    }
  }, [
    data,
    selectedCountryFeature,
    zoomCountriesChange,
    props.year,
    props.countryId,
    props.view,
    props.filterValues,
    useWindowDimensions(),
  ]);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <div ref={mapContainerRef} className="mapContainer">
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
    if (!val || country == null) return "darkgray"; //no data available
    if (checkFilter(val))
      return colorScales[+props.isPopulationView][props.view](val);
    else return "grey";
  }
  function checkFilter(val) {
    if (val < props.filterValues[1] && val > props.filterValues[0]) return true;

    if (
      props.sliderValues[1] == props.filterValues[1] &&
      val > props.filterValues[0]
    )
      return true;
    if (
      props.sliderValues[0] == props.filterValues[0] &&
      val < props.filterValues[1]
    )
      return true;
    if (
      props.sliderValues[0] == props.filterValues[0] &&
      props.sliderValues[1] == props.filterValues[1]
    )
      return true;
  }
  function getDetailViewColor(country) {
    if (
      migrationCountries &&
      migrationCountries.find((item) => item.id == country)
    ) {
      if (props.view == 0) return getColorTop5(true, country);
      if (props.view == 1) return getColorTop5(false, country);
      if (props.view == 2) return "LightGrey";
    }
    if (selectedCountryFeature.id == country) {
      if (props.view == 0) return immiColor;
      if (props.view == 1) return emiColor;
      if (props.view == 2) {
        var val = getMigrationDataByCountry(country);
        if (!val) return "darkgrey";
        return colorScales[+props.isPopulationView][props.view](val);
      }
    }
    return "lightgrey";
  }
  function getColorTop5(immi, country) {
    var index =
      migrationCountries.findIndex((item) => item.id == country) * -1 + 4;
    var colorScale;
    if (immi)
      colorScale = d3
        .scaleLinear()
        .domain([0, 4])
        .range(["#ffedae", "#ffcc13"]);
    else
      colorScale = d3
        .scaleLinear()
        .domain([0, 4])
        .range(["#E0FFFF", "#008B8B"]);
    return colorScale(index);
  }
  function getArrowColor() {
    if (props.view == 0) return "#a88905";
    if (props.view == 1) return "darkcyan";
  }
  function getArrowWidth(id) {
    //get index of migrationCountries with id
    return migrationCountries.findIndex((item) => item.id == id) * -1 + 5;
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
  function displayMigrationValue(target) {
    var countryId = target.id;
    var val = getMigrationDataByCountry(countryId);
    if (val) {
      var number = Math.abs(val);
      props.isPopulationView
        ? (number = number.toFixed(2))
        : (number = number.toFixed(0));
      number.toLocaleString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var header = props.model.codeToName(countryId) + "<br/>";
      if (!target.id) header = target.name + "<br/>";
      var displayValue = "";
      var color;

      if (props.view == 2) {
        if (val < 0) {
          color = emiColor;
          displayValue += "Lost " + number;
          //
        } else {
          color = immiColor;
          displayValue += "Gained " + number;
        }
        if (props.isPopulationView) displayValue += "%";
        else displayValue += " people";
        return (
          header + "<span style=color:" + color + ">" + displayValue + "</span>"
        );
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
              (data.value / props.model.getPopulationValue(data.id))
                .toFixed(2)
                .toLocaleString() + " %";
          } else {
            let value = data.value
              .toFixed(0)
              .toLocaleString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            displayValue += value + " people";
          }
          if (props.view == 0) {
            color = emiColor;
            displayValue += " emigrated to ";
          }
          if (props.view == 1) {
            color = immiColor;
            displayValue += " immigrated from ";
          }
          displayValue += props.model.codeToName(props.countryId);
          header +
            "<span style=color:" +
            color +
            ">" +
            displayValue +
            "</span>";
        }
      } else if (
        //main view or selected country
        (props.countryId &&
          props.countryId != 900 &&
          countryId == props.countryId) ||
        props.countryId == 900
      ) {
        if (props.isPopulationView) number += "%";
        else {
          number += " people";
        }

        if (props.view == 0) {
          color = immiColor;
          let value = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          displayValue += value + " are Immigrants ";
        }
        if (props.view == 1) {
          let value = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          displayValue += value + " are Emigrants ";
          color = emiColor;
        }
      }
      // displayValue += " in " + props.year;
      return (
        header + "<span style=color:" + color + ">" + displayValue + "</span>"
      );
    } else {
      var header = props.model.codeToName(countryId);
      if (!target.id) {
        header = target.getAttribute("name");
      }

      return header + "<br/>" + " no data available";
    }
  }
}

export default WorldMap;
