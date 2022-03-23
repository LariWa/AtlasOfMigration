import React, { useEffect, useLayoutEffect } from "react";
import * as d3 from "d3";

/* just some test to see that d3 works*/
function Main() {
  let stat = 1;

  /*  use LayoutEffect() for updating d3 components? */
  useLayoutEffect(() => {
    d3.select(".nav").style("background-color", "red");
  }, []);

  const onMouseClick = () => {
    d3.selectAll(".nav").style("color", "yellow");
  };

  return (
    /* use svg element */
    <div className="nav">
      <h1>About</h1>
    </div>
  );
}

export default Main;
