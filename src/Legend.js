import React, { useEffect, useLayoutEffect } from "react";
import List from "@mui/material/List";
//import * as d3 from "d3";

/*


*/
function Legend({ enter, loading }) {
  /*  use LayoutEffect() for updating d3 components? */
  useEffect(() => {
    //  console.log(loading);
    //d3.select(".nav").style("background-color", "red");
  }, []);

  const onMouseClick = () => {
    console.log("enter app");
    //enter app
  };

  return (
    <div className=".legend" width="80vw" height="100%">
      <h1>Welcome to the app year 1990 info...</h1>
      {/*
      <button
        onClick={() => enter(true)}
        disabled={loading}
        style={{ zIndex: 99 }}
      >
      Start Exploring
      </button>
    */}
    </div>
  );
}

export default Legend;
