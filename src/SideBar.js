import React, { useEffect, useLayoutEffect } from "react";
import Slider from '@mui/material/Slider';
import "./styles/sideBar.min.css";
import { ImmigrationButton, EmigrationButton, MigrationButton } from './styles/components/Button.js'


/* just some test to see that d3 works*/
function SideBar({country, year, model}) {

 /*  use LayoutEffect() for updating d3 components? */
 useEffect(() => {
   // console.log("effect", year)
   // console.log("effect", country)

 }, [year, country]);

 const [view, setView] = React.useState(model.view);
 const [value, setValue] = React.useState([0, 100]);

  const  SearchCountry = (e) => {
    if (e.key === 'Enter'){
      console.log(e.target.value);
    }
  };

  function valuetext(value) {
    return `${value}`;
  }

  function selectFilter(e) {
    model.setView(e.target.value);
    setView(e.target.value)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="sideBar">
      <h1>Welcome</h1>
      <p>
      Have you ever thought about why people migrate? Has time influenced our perception of migration? <br/> <br/>
      With the Atlas of Migration we created a visual tool that allows you to navigate through the increasingly complex landscape of international migration patterns.
      </p>

    <div className="filter">
    <h2>What do you want to know more about?</h2>
      <ImmigrationButton name={view} value="0" onClick={selectFilter}>Show Immigration</ImmigrationButton>
      <MigrationButton name={view} value="2" onClick={selectFilter}>Show Net Migration</MigrationButton>
      <EmigrationButton name={view} value="1" onClick={selectFilter}>Show Emigration</EmigrationButton>
    </div>

      <Slider
        getAriaLabel = {() => ''}
        value = {value}
        onChange = {handleChange}
        valueLabelDisplay = "auto"
        getAriaValueText = {valuetext}
      />

    <div id="searchBox" onKeyDown={SearchCountry}>
      <h2>What country are you looking for?</h2>
      <input type="text" id="inputField" onChange={SearchCountry} placeholder="Search..." / >
    </div>
    </div>
  );
}

export default SideBar;
