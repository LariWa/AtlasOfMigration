import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./useWindowDimensions.js";
import * as d3module from "d3";
import "./styles/timeline.min.css";
import styled from "styled-components";
import d3tip from "d3-tip";
const d3 = {
  ...d3module,
  tip: d3tip,
};

/* time runs 1990-2020, in 5 year interval + 2017 and 2019 */
const yearRange = [
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

const yData = ["Pandemics", "Nature disaster"];
const WORLD = 900;
const immiColor = "cyan";
const emiColor = "#F29F05";
const netColor = "purple";
const unDef = "darkgrey";
//immigration = 0, emmigration 1, net migration=2, start=3
const colors = [immiColor, emiColor, netColor, unDef];

function TimeLine({ model, setYear, view }) {
  const svgContainerRef = useRef(null);
  //const [year, setYear] = useState(model.year);
  const [countryID, setCountryID] = useState(model.countryID);
  const [sex, setSex] = useState(0);
  const [color, setColor] = useState("purple");
  const dx = 20; //for now, set to responsive
  const timeFormat = d3.timeFormat("%Y");
  const timeDomain = yearRange.map((x) => timeFormat(x));
  const axisMargin = 50; //for now
  let data = model.migrationData;

  /* get data for one year */
  // let groupYear = d3.group(worldData,
  //     d => d.DestinationID,
  //     d => d.OriginID)
  //     .get(900)
  //     .get(900)
  //   ////console.log(groupYear);

  /*
view: immigration: 0  --> origin = WORLD
emigration 1 --> destination = WORLD
net migration: 2 --> ? destination = origin immi - emi ??
*/

  const getMigration = () => {
    console.log(view);
    let obj = {};
    let origin = WORLD,
      destination = WORLD;
    // //console.log(model.countryID);
    // //console.log(view); //quick fix to take care of rerender and undefined view
    if (view) {
      if (view && view == 0) destination = model.countryID;
      if (view && view == 1) origin = model.countryID;
      if (view && view == 2)
        origin = destination = model.countryID; /* NO!!! TODO is this right? */
      console.log(origin);
      console.log(destination);
      ////console.log(model.countryID);

      obj = model.getMigrationValueAll(origin, destination);
      // //console.log(obj);
      if (obj) {
        delete obj.DestinationID;
        delete obj.DestinationName;
        delete obj.OriginName;
        delete obj.OriginID;
        getValue(obj[1990]);
        let res = Object.entries(obj).map(([key, value]) => ({
          date: new Date(key, 6), // 6 equals 1 July
          total: getValue(value),
        }));
        console.log(res);
        return res;
      }
    }
  };

  const getValue = (x) => {
    if (x === 0) return 0;
    if (x === "..") return -1;
    else return Number(x.split(" ").join(""));
  };

  /* update this local or update model? */
  const updateYear = (x) => {
    //format input to right year?
    setYear(x);
    model.setYear(x);
    ////console.log("new year", model.year);
  };

  /* set to size of container ? */
  const dimensions = {
    width: useWindowDimensions().width * 0.7,
    height: useWindowDimensions().height * 0.2,
  };

  const margin = { top: 30, left: 40, bottom: 20, right: 50 };

  /* color of bars */

  //  useLayoutEffect(() => {
  useEffect(() => {
    // //console.log(view, ": 0: imi, 1:emi");
    data = getMigration();
    if (data) {
      ////console.log(data);
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(yearRange))
        .range([margin.left, dimensions.width - margin.right])
        .nice();

      const shiftXAxis = 100;
      const shiftYAxis = 55;

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.total)])
        .range([dimensions.height - margin.top, margin.bottom])
        .nice();

      // Clear svg content before adding new elements
      const svgEl = d3.select(svgContainerRef.current);
      svgEl.selectAll("*").remove();

      ////console.log(data)

      svgEl
        .append("g")
        .attr("transform", `translate(30,${shiftXAxis})`)
        .attr("id", "bottom");

      const xAxis = d3
        .axisBottom(xScale)
        //.ticks(d3.timeYear.every(5))
        .ticks(7);
      //.tickValues(timeFormat)
      //.tickFormat(x => timeFormat(x))
      svgEl.select("#bottom").call(xAxis);

      /*  add barchart with values corresponding to ... */
      const yAxis = d3.axisLeft(yScale).ticks(3).tickFormat(d3.format(".2s"));

      svgEl
        .append("g")
        .attr("transform", `translate(${shiftYAxis} , -15)`)
        .attr("id", "left");
      svgEl.select("#left").call(yAxis);

      //  data.forEach(x => //console.log("total: " ,x.total," --> y: " ,yScale(x.total)))
      //data.forEach(x => //console.log("date: " ,x.date," --> x: " ,xScale(x.date)))

      //TODO check for NAN show some warning when value does not exist!

      d3.select("#bottom")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => xScale(d.date) - dx)
        .attr("y", (d) => yScale(d.total) - shiftXAxis - 15) //This value is strange!!
        .attr(
          "height",
          (d) =>
            dimensions.height - margin.top - margin.bottom - yScale(d.total)
        )
        //.attr("height", d => yScale(d.total)/2) //base on data
        .style("fill", color);

      var arrowTip = d3
        .tip()
        .attr("class", "d3-tip")
        .html(function (event) {
          let nbr = event.explicitOriginalTarget;
          console.log(nbr);
          console.log(nbr.y);

          console.log(xScale(parseFloat(event.explicitOriginalTarget.x)));
          //TODO nice text
          return " ";
        });

      d3.select("#timeLine").call(arrowTip);

      d3.selectAll("rect")
        .on("click", (d, i) => {
          updateYear(timeFormat(i.date));
        })
        .on("mouseover", function (d) {
          console.log(d);
          arrowTip.show(d, this);
        });
    }
  }, [data, view]);

  // position is set with css
  return (
    <svg
      id="timeLine"
      width={dimensions.width}
      height={dimensions.height}
      transform="translate(250, 600)"
      ref={svgContainerRef}
    ></svg>
  );
}

export default TimeLine;
