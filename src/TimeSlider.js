import React, { useEffect, useLayoutEffect } from "react";
import Slider from "@mui/material/Slider";

const years = [
  { value: 1990, label: "1990" },
  { value: 1995, label: "1995" },
  { value: 2000, label: "2000" },
  { value: 2005, label: "2005" },
  { value: 2010, label: "2010" },
  { value: 2015, label: "2015" },
  { value: 2020, label: "2020" },
];

function TimeSlider({ updateYear, year }) {
  useEffect(() => {
    //  console.log(loading);
    //d3.select(".nav").style("background-color", "red");
  }, []);

  const handleChange = (e) => {
    //console.log(e.target.value);
    updateYear(e.target.value);
    //console.log("set year");
  };

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <div marginleft="70" width="20vw">
      <Slider
        aria-label="Years"
        aria-labelledby="timeSlider"
        min={years[0].value}
        max={years[6].value}
        //defaultValue={year}
        valueLabelDisplay="auto"
        onChange={handleChange}
        getAriaValueText={valuetext}
        //steps={7}
        color="secondary"
        marks={years}
      />
    </div>
  );
}

export default TimeSlider;
