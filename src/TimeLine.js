import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./useWindowDimensions.js";
import * as d3 from "d3";
import "./App.css";
import "./TimeLine.css";

/* time runs 1990-2020, in 5 year interval + 2017 and 2019 */
const yearRange = [
  new Date(1990, 5, 1),
  new Date(1995, 5, 1),
  new Date(2000, 5, 1),
  new Date(2005, 5, 1),
  new Date(2010, 5, 1),
  new Date(2015, 5, 1),
  // new Date(2017, 5, 1),
  // new Date(2019, 5, 1),
  new Date(2020, 5, 1),
];

const data = ["Pandemics", "Nature disaster"];
const timeFormat = d3.timeFormat("%Y");


function TimeLine(props) {
  const svgContainerRef = useRef(null);
  const [year, setYear] = useState(props.model.year);
  const [countryID, setCountryID] = useState(props.model.country)
  const worldData = props.model.migrationData
  const migrationData = props.model.getMigrationValueAll(900, 900)

  /* get data for one year */
  let groupYear = d3.group(worldData,
      d => d.DestinationID,
      d => d.OriginID)
      .get(900)
      .get(900)
    console.log(groupYear);

  //console.log(migrationData);

  let totalData = worldData && worldData.filter( (data) => data.DestinationID == "900" && data.OriginID == "900")[0]
  //console.log(totalData )

  /* update this local or update model? */
  const updateYear = (x) => {
    props.model.year = x;
  };


  const dimensions = {
    //width = document.getElementById('timeline').offsetWidth;//includes margin,border,padding
    //height = document.getElementById('timeline').offsetHeight;//includes margin,border,padding
    // width: svgContainerRef.current.clientWidth,
    // height: svgContainerRef.current.clientHeight,
    width: useWindowDimensions().width,
    height: useWindowDimensions().height,
    margin: { top: 600, right: 400, bottom: 0, left: 100 }, //set to responsive
  };


  //  useLayoutEffect(() => {
  useEffect(() => {

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(yearRange))
      .range([
        dimensions.margin.left,
        dimensions.width - dimensions.margin.right,
      ]);

    const yScale = d3.scaleBand()
      .domain(data)
      .range([dimensions.height-dimensions.margin.top, 60])

      // Clear svg content before adding new elements
      // const svgEl = d3.select(svgRef.current);
      // svgEl.selectAll("*").remove();

    if (Array.isArray(data)) {
        d3.select("#bottom")
        .attr("transform", "translate(0,80)")
        .call(d3.axisBottom(xScale)
          .tickFormat(timeFormat)
          .tickValues(yearRange))
        //.call(d3.axisBottom(x).ticks(d3.timeYear.every(5)))

      //  Object.keys(migrationData).forEach(p =>console.log(p))
         /*  add barchart with values corresponding to ... */
        d3.select("#bottom")
          .selectAll("rect")
          .data(yearRange)
          .join('rect')
          .attr("x", xScale((d) => d.timeFormat)) //(d) => d.timeFormat )
          .attr("y", -50)
          .attr("height", 50) //range of data
          .attr("width", 30 )
        // //.attr("width", x.bandwidth() )
          .style("fill", "black")
        // //.style("opacity", 0.5)

      d3.select("#left")
        .attr("transform", "translate(90,-50)")
        .call(d3.axisLeft(yScale))
    }

  }, [migrationData]);

 //<div className="wrapper" id="timeline" ref = {timeContainerRef} style={{backgroundColor: "#F6F6F2" }} >
  //TODO: set transform to responsive measurements
  return (
      <svg id="timeLine" width = '80%' height = '15%' style={{backgroundColor: "#FF0000" }}
        ref={svgContainerRef}
      >
        <g id = "left"/>
        <g id = "bottom"/>
      </svg>
  );
}

export default TimeLine;
