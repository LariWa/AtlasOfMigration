import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./useWindowDimensions.js";
import "./styles/timeline.min.css";
import styled from "styled-components";
import * as d3module from "d3";
import d3tip from "d3-tip";
import { timeParse } from "d3";
const d3 = {
  ...d3module,
  tip: d3tip,
};

/* time runs 1990-2020, in 5 year interval + 2017 and 2019 */
const yearRange = [
  new Date(1985, 6, 1), //added just to not put a bar into the y axis
  new Date(1990, 6, 1), //6 equals 1 July
  new Date(1995, 6, 1),
  new Date(2000, 6, 1),
  new Date(2005, 6, 1),
  new Date(2010, 6, 1),
  new Date(2015, 6, 1),
  // new Date(2017, 6, 1),
  // new Date(2019, 6, 1),
  new Date(2020, 6, 1),
];

const WORLD = 900;
const immiColor = "cyan";
const emiColor = "#F29F05";
const netColor = "purple";
const unDef = "darkgrey";
//immigration = 0, emmigration 1, net migration=2, start=3
const colors = [immiColor, emiColor, netColor, unDef];

function TimeLine({ model, setYear, view, year }) {
  const svgContainerRef = useRef(null);
  const [countryID, setCountryID] = useState(model.countryID);
  const [sex, setSex] = useState(0);
  const [color, setColor] = useState("purple");
  const timeFormat = d3.timeFormat("%Y");
  const timeDomain = yearRange.map((x) => timeFormat(x));
  const ticks = yearRange.filter(
    (x) => x != new Date(1985, 6, 1) && x != new Date(2025, 6, 1)
  );

  let data = model.migrationData;

  /* get data for one year */
  // let groupYear = d3.group(worldData,
  //     d => d.DestinationID,
  //     d => d.OriginID)
  //     .get(900)
  //     .get(900)
  //   ////////console.log(groupYear);

  /*
view: immigration: 0  --> origin = WORLD
emigration 1 --> destination = WORLD
net migration: 2 --> ? destination = origin immi - emi ??
*/

  const getMigration = () => {
    let obj = {};
    let origin, destination;
    origin = destination = WORLD;
    if (true) {
      if (view == 0 || view == 1) {
        if (view == 0) destination = model.countryID;
        if (view == 1) origin = model.countryID;
        obj = model.getMigrationValueAll(origin, destination);
      }
      if (view == 2)
        for (let i = 1990; i <= 2020; i += 5) {
          let key = i.toString();
          obj[key] = model.getNetMigrationValue(model.getCountryId(), i);
        }
      if (view === 3) obj = model.getMigrationValueAll(origin, destination);
      if (obj && obj != "undefined" && Object.keys(obj).length > 0) {
        delete obj.DestinationID;
        delete obj.DestinationName;
        delete obj.OriginName;
        delete obj.OriginID;
        getValue(obj[1990]);
        let res = Object.entries(obj).map(([key, value]) => ({
          date: new Date(key, 6), // 6 equals 1 July
          total: getValue(value),
        }));
        return res;
      }
    }
  };

  /* helper to check and parse value to number */
  const getValue = (x) => {
    if (typeof x == "number") return x;
    if (x === 0) return 0;
    if (x === "..") return -1;
    else return Number(x.split(" ").join(""));
  };

  /* update this local or update model? */
  const updateYear = (x) => {
    setYear(x);
    model.setYear(x);
  };

  /* adapt to window size */
  const dimensions = {
    width: useWindowDimensions().width * 0.4,
    height: useWindowDimensions().height * 0.17,
  };
  const margin = { top: 35, left: 45, bottom: 25, right: 25 };
  const width = dimensions.width;
  const height = dimensions.height;

  /* diminish op bars of not selected year */
  const showSelect = () => {
    document.querySelectorAll(".time").forEach((element) => {
      if (element.id != year) {
        element.style.opacity = 0.4;
      }
    });
  };

  showSelect();

  //  useLayoutEffect(() => {
  useEffect(() => {
    data = getMigration();
    if (data) {
      if (view) setColor(colors[view]);

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(yearRange))
        .range([margin.left, width - margin.right])
        .nice();

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, (d) => {
            return d.total != 0 ? d.total : 2000; //to prevent zero scale
          }),
        ])
        .range([height - margin.bottom, margin.top])
        .nice();

      /* clear svg content before adding new elements */
      const svgEl = d3.select(svgContainerRef.current);
      svgEl.selectAll("*").remove();

      svgEl.attr("viewBox", [0, 0, width, height]);

      /* x-axis */
      const xAxis = d3
        .axisBottom(xScale)
        //.ticks(d3.timeYear.every(5));
        .ticks(7);
      //  .tickValues([1990, 1995, 2000, 2010]);
      //.tickFormat(x => timeFormat(x))
      //.tickFormat(function (d) {
      //if (d != 1985 && d != 2025) return d;
      //  });

      svgEl
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .attr("id", "bottom");
      svgEl.select("#bottom").call(xAxis);

      /*  y-axis */
      const yAxis = d3.axisLeft(yScale).ticks(3).tickFormat(d3.format(".2s"));
      svgEl
        .append("g")
        .attr("transform", `translate(${margin.left} , 0)`)
        .attr("id", "left");
      svgEl.select("#left").call(yAxis);

      //TODO check for NAN show some warning when value does not exist!
      /* bars */
      d3.select("#bottom")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("id", (d) => timeFormat(d.date))
        .attr("value", (d) => d.total)
        .attr("class", "time")
        .attr("x", (d) => xScale(d.date))
        .attr("y", (d) => yScale(d.total) - margin.top) //-35
        .attr("height", (d) => {
          console.log(yScale(d.total));
          console.log(height - margin.top - margin.bottom - yScale(d.total));
          console.log(200.67);
          return height - margin.top - margin.bottom - yScale(d.total);
        })
        //.attr("height", 200.67)

        //console.log("x:" + xScale(d.date));
        //  console.log(xScale.invert(d.date));
        //  console.log("test 80 " + xScale.invert(102.2));

        .attr("width", 30) //overridden by css?
        .attr("opacity", (d) => (year != timeFormat(d.date) ? "0.3" : "1")) //overridden?
        .style("fill", colors[view]);
      /* set bars to zero at start to later animate */

      // /* animate bars */
      // svgEl
      //   .selectAll("rect")
      //   .transition()
      //   //.duration(2000)
      //   .attr("y", (d) => yScale(d.total))
      //   .attr("height", (d) => height - yScale(d.total))
      //   .delay((d, i) => {
      //     //console.log(i);
      //     return i * 100;
      //   });

      /* tooltip */
      var arrowTip = d3
        .tip()
        .attr("class", "d3-tip")
        .html(function (event) {
          let number = event.target
            .getAttribute("value")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return "Total: " + number;
        });
      d3.select("#timeline").call(arrowTip);

      /*  tooltip on mouseover  */
      d3.selectAll("rect")
        .on("click", (d, i) => {
          updateYear(timeFormat(i.date));
          arrowTip.hide(d);
        })
        .on("mouseover", function (d) {
          arrowTip.show(d, this);
        })
        .on("mouseleave", function (d) {
          arrowTip.hide(d);
        });
    }
  }, [data, view, color]);

  /*
  width={dimensions.width}
  height={dimensions.height}
  */

  // position is set with css
  return (
    <div id="timelineContainer">
      <svg id="timeline" ref={svgContainerRef}></svg>
    </div>
  );
}

export default TimeLine;
