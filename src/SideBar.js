import React, { useEffect, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import "./styles/sideBar.min.css";
import AutoCompleteText from "./AutoCompleteText";

/* just some test to see that d3 works*/
function SideBar({ country, year }) {
  /*  use LayoutEffect() for updating d3 components? */
  useEffect(() => {
    // console.log("effect", year)
    // console.log("effect", country)
  }, [year, country]);

  const SearchCountry = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
    }
  };

  return (
    <div className="sideBar">
      <h1>World Overview</h1>
      <h3> Country: {country} </h3>
      <h3> Year: {year} </h3>
      {/* <div id="searchBox" onKeyDown = {SearchCountry}>
          <label>Search for Country</label><br/>
          <input type="text"
          id="inputField"
          onChange = {SearchCountry}
          placeholder="Search.."/>
        </div> */}
      <AutoCompleteText />
      <h2>Explanation</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et
        enim blandit, ultricies sem at, auctor nisl. Nunc eget lorem quis nunc
        auctor posuere. Sed enim nisi, luctus eu laoreet eu, condimentum non
        erat. Etiam venenatis erat vel tempor tincidunt. Aliquam mattis, purus
        eget venenatis ornare, felis nisi placerat lorem, a viverra justo nisl
        eu urna.
      </p>

      <div className="filter">
        <button>Show Immigration</button>
        <button>Show Net Migration</button>
        <button>Show Emigration</button>
      </div>
    </div>
  );
}

export default SideBar;
