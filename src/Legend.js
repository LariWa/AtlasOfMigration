import React, { useEffect, useLayoutEffect } from "react";
import List from "@mui/material/List";
//import * as d3 from "d3";

const immiColor = "cyan";
const emiColor = "#F29F05";
const netColor = "purple";
const unDef = "darkgrey";
//immigration = 0, emmigration 1, net migration=2, start=3
const colors = [immiColor, emiColor, netColor, unDef];

function Legend({ enter, loading }) {
  useEffect(() => {
    //  console.log(loading);
    //d3.select(".nav").style("background-color", "red");
  }, []);

  return (
    <div className=".legend" width="80vw" height="100%" background="red">
      <h1>Legend</h1>
      <List />
    </div>
  );
}

export default Legend;
