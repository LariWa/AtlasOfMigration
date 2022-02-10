import React, {useEffect} from "react";
import * as d3 from "d3";
import "./App.css";



/* just some test to see that d3 works*/
function Test() {

 let stat = 3;

 /*  use LayoutEffect() for updating d3 components? */
  useEffect(() => {
    d3.select(".test").style("background-color", "green");
  }, []);

  const onMouseClick = () => {
    d3.selectAll(".test").style("color", "blue");
  };

  return (
    /* use svg element */
      <div className = "test">
        <button> click!  </button>
        <h1>Test some diagram {stat}</h1>{" "}
        <p>Test some other diagram </p>{" "}
      </div>
  );
}

export default Test;
