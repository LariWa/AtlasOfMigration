import React, {useEffect, useLayoutEffect} from "react";
import * as d3 from "d3";
import "./styles/sideBar.min.css";


/* just some test to see that d3 works*/
function SideBar() {

 let stat = 1;

 /*  use LayoutEffect() for updating d3 components? */
/*  useLayoutEffect(() => {
    d3.select(".nav").style("background-color", "magenta");
  }, []);

  const onMouseClick = () => {
    d3.selectAll(".nav").style("color", "yellow");
  };
*/

  return (
      <div className="sideBar">
        <h1>World Overview</h1>

        <div id="searchBox">
          <label>Search for Country</label><br/>
          <input type="text" placeholder="Search.."/>
        </div>

        <h2>Explanation</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et enim blandit, ultricies sem at, auctor nisl. Nunc eget lorem quis nunc auctor posuere. Sed enim nisi, luctus eu laoreet eu, condimentum non erat. Etiam venenatis erat vel tempor tincidunt. Aliquam mattis, purus eget venenatis ornare, felis nisi placerat lorem, a viverra justo nisl eu urna.</p>

        <div class="filter">
          <button>Show Immigration</button>
          <button>Show Net Migration</button>
          <button>Show Emigration</button>
        </div>
      </div>
  );
}

export default SideBar;
