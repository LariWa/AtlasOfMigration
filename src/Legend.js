import React, { useEffect } from "react";
//import List from "@mui/material/List";
import * as d3 from "d3";

const immiColor = "cyan";
const emiColor = "#F29F05";
const netColor = "purple";
const unDef = "DimGray";
const filtered = "lightgrey";
//immigration = 0, emmigration 1, net migration=2, start=3
const colors = [immiColor, emiColor, netColor, unDef];

function Legend({ enter, loading }) {
  useEffect(() => {
    let svg = d3.select("#legend");

    svg
      .append("rect")
      .attr("x", 10)
      .attr("y", 10)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", unDef);

    svg
      .append("rect")
      .attr("x", 10)
      .attr("y", 35)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", filtered);
    svg
      .append("text")
      .attr("x", 35)
      .attr("y", 22)
      .text("Data not available")
      .style("font-size", "13px")
      .attr("fill", "white")
      .attr("alignment-baseline", "middle");
    svg
      .append("text")
      .attr("x", 35)
      .attr("y", 45)
      .attr("fill", "white")
      .text("Filtered data")
      .style("font-size", "13px")
      .attr("alignment-baseline", "middle");

    svg.attr("transform", `translate(0,30)`);
  }, []);

  return (
    <div
      className=".legend"
      width="10vw"
      height="10%"
      position="absolute"
      top="200"
    >
      <svg id="legend" height="50" width="250"></svg>
    </div>
  );
}

export default Legend;
