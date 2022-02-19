import React, {useEffect} from "react";
import * as d3 from "d3";
import "./App.css";



/* just some test to see that d3 works*/
function Map() {

 let stat = 2;

 /*  use LayoutEffect() for updating d3 components?  this is a test*/
  useEffect(() => {
    //d3.select("body").style("background-color", "green");
    d3.selectAll(".map").style("color", "red");
  }, []);


  const onMouseClick = () => {
    d3.selectAll(".map").style("color", "blue");
  };

  return (
      <div className = "map">
        <button> click!  </button>
        <h1>And this could be some map {stat}</h1>{" "}
        <p>Test some other diagram </p>{" "}
      </div>
  );
}

export default Map;
