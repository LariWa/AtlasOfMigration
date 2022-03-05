import React, {useEffect, useLayoutEffect} from "react";
import * as d3 from "d3";
import "./App.css";
import "./TimeLine.css";

/* https://github.com/vasturiano/timelines-chart */
import TimelinesChart from 'timelines-chart';
//const myChart = new TimelinesChart();
// myChart.data([12,34,45,56])
//   (document.getElementById('timeLine'));

//test time runs 1990-2020, in 5 year interval + 2017 and 2019
const productionDataset = [1990, 1995, 2000, 2005, 2010, 2015, 2020]
const downtimeDataset = [0,1,2,3,4,5,6,7,8]
const powerOffDataset = [0,1,2,3,4,5,6,7,8]
const data = [0,1,2,3,4,5,6,7,8]


/* https://github.com/petrjahoda/medium_d3_timeline/blob/master/js/homepage.js */

function TimeLine(productionDataset, downtimeDataset, powerOffDataset, data) {

  // access data
     const xAccessor = d => d["Date"]
     const yAccessor = d => d["Value"]

     //set dimensions
     let dimensions = {
         //width: screen.width - 500,
         width: window.screen.width - 500,
         height: 100,
         margin: {top: 0, right: 40, bottom: 20, left: 40,},
     }
     //draw canvas
     const wrapper = d3.select("#timeline")
         .append("svg")
         .attr("viewBox", "0 0 " + dimensions.width + " " + dimensions.height)
     const bounds = wrapper.append("g")




 /*  use LayoutEffect() for updating d3 components? */
  useLayoutEffect(() => {
  //  d3.select(".test").style("background-color", "green");

  }, []);

  const onMouseClick = () => {
    d3.selectAll(".test").style("color", "blue");
  };



  return (
    /* use svg element */
      <div className = "test" id = "timeline" >
      Timeline
      </div>
  );
}

export default TimeLine;
