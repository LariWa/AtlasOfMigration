import React, {useEffect} from "react";
import * as d3 from "d3";
import "./App.css";

/* https://github.com/vasturiano/timelines-chart */
import TimelinesChart from 'timelines-chart';



/* just some test to see that d3 works*/
function TimeLine() {


 const myChart = new TimelinesChart();


 // myChart.data([12,34,45,56])
 //   (document.getElementById('timeLine'));


 /*  use LayoutEffect() for updating d3 components? */
  useEffect(() => {
    d3.select(".test").style("background-color", "green");

  }, []);

  const onMouseClick = () => {
    d3.selectAll(".test").style("color", "blue");
  };



  return (
    /* use svg element */
      <div className = "test" id = "timeLine" >
      Timeline
      </div>
  );
}

export default TimeLine;
