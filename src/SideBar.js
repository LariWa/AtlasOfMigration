import React, { useEffect, useLayoutEffect } from "react";
import Slider from '@mui/material/Slider';
import "./styles/sideBar.min.css";


/* just some test to see that d3 works*/
function SideBar() {

  let stat = 1;

  function valuetext(value) {
    return `${value}`;
  }

  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="sideBar">
      <h1>Welcome</h1>
      <p>
      Have you ever thought about why people migrate ? Has time influenced our perception of migration ? <br/> <br/>
      With the Atlas of Migration we created a viusial tool that allows you to navigate through the increasingly complex landscape of international migration patterns.
      </p>

    <div className="filter">
    <h2> What do you want to know more about ? </h2>
      <button> Show Immigration </button>
      <button> Show Net Migration </button>
      <button> Show Emigration </button>
    </div>

      <Slider
        getAriaLabel = {() => 'Temperature range'}
        value = {value}
        onChange = {handleChange}
        valueLabelDisplay = "auto"
        getAriaValueText = {valuetext}
      />

    <div id = "searchBox" >
      <h2> What country are you looking for ? </h2>
      <input type="text" placeholder="Search..." / >
    </div>
    </div>
  );
}

export default SideBar;
