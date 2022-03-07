import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./useWindowDimensions.js";
import * as d3 from "d3";
import "./App.css";
import "./TimeLine.css";

/* https://github.com/vasturiano/timelines-chart */
import TimelinesChart from "timelines-chart";
//const myChart = new TimelinesChart();
// myChart.data([12,34,45,56])

/* time runs 1990-2020, in 5 year interval + 2017 and 2019 */
const yearRange = [
  new Date(1990, 0, 1),
  new Date(1995, 0, 1),
  new Date(2000, 0, 1),
  new Date(2005, 0, 1),
  new Date(2010, 0, 1),
  new Date(2015, 0, 1),
  new Date(2017, 0, 1),
  new Date(2019, 0, 1),
  new Date(2020, 0, 1),
];

const data = ["Net Migration", "Wars", "Gender"];

function TimeLine(props) {
  const containerRef = useRef(null);
  const [year, setYear] = useState(props.model.year);
  //const width = containerRef.current.clientWidth / (data.length + 1)

  const dimensions = {
    width: useWindowDimensions().width,
    height: useWindowDimensions().height - 500, //TODO calculate param height
    margin: { top: 0, right: 350, bottom: 20, left: 250 },
  };

  // const start = (d) => d[0];
  // const end = (d) => d[d.length-1];

  // let svg = d3.select("#res")
  //   .append("svg")
  //   .attr("width", 1000)
  //
  //   const xScale = d3.scaleTime()
  //        .domain([chartStartsAt, chartEndsAt])
  //    const yScale = d3.scaleLinear()
  //        .domain(d3.extent(productionDataset, yAccessor))
  //        .range([dimensions.height - dimensions.margin.bottom, 0])

  //  useLayoutEffect(() => {
  useEffect(() => {
    const x = d3
      .scaleTime()
      .domain(d3.extent(yearRange))
      .range([
        dimensions.margin.left,
        dimensions.width - dimensions.margin.right,
      ]);

    const y = d3.scaleBand()
      .domain(data)
      .range([dimensions.height, 0])

    if (Array.isArray(data)) {
      d3.select("#bottom")
        .attr("transform", "translate(0,100)")
        .call(d3.axisBottom(x).tickValues(yearRange));
        //.call(d3.axisBottom(x).ticks(d3.timeYear.every(5)))
      d3.select("#left")
        .attr("transform", "translate(230,-130)")
        .call(d3.axisLeft(y))

      // const update = d3.select("g").selectAll("circle").data(data);
      //
      // update
      //   .enter()
      //   .append("circle")
      //   .merge(update)
      //   .attr("r", (d) => d)
      //   .attr("cx", (_, i) => dimensions.width * (i + 1))
      //   .attr("cy", () => Math.random() * 100)
      //   .attr("stroke", (_, i) => (i % 2 === 0 ? "#f80" : "#aaf"))
      //   .attr("fill", (_, i) => (i % 2 === 0 ? "orange" : "#44f"));
      //
      // update.exit().remove();
    }
  });

  /* update this local or update model? */
  const updateYear = (x) => {
    props.model.year = x;
  };

  //TODO: set transform to responsive measurements
  return (
    <div className="wrapper" id="timeline" style={{backgroundColor: "#F6F6F2" }} >
      <svg id="content"
        width={dimensions.width}
        height={dimensions.height}
        ref={containerRef}
      >
        <g id = "left"/>
        <g id = "bottom"/>
      </svg>
    </div>
  );
}

export default TimeLine;
