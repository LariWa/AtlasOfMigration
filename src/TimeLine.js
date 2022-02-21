import React, {useEffect} from "react";
import * as d3 from "d3";
/* https://github.com/vasturiano/timelines-chart */
import TimelinesChart from 'timelines-chart';
import "./App.css";

/* just some test to see that d3 works*/
function TimeLine() {

/* could use one of these ready made component

 const myChart = TimelinesChart();
 myChart.data([])
   (document.getElementById('timeLine'));
  */

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
      </div>
  );
}

export default TimeLine;
