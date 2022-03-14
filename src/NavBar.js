import React, {useEffect, useLayoutEffect} from "react";
import * as d3 from "d3";


/* just some test to see that d3 works*/
function NavBar(props) {

 let stat = 1;

 /*  use LayoutEffect() for updating d3 components? */
  useLayoutEffect(() => {
  //  d3.select(".nav").style("background-color", "#ff000030");
  }, []);

  const onMouseClick = () => {
    d3.selectAll(".nav").style("color", "yellow");
  };


  return (
    /* use svg element */
      <div className = "nav" style = {{backgroundColor:'#aa220020'}}>
        <h1>Atlas of Migration</h1>
        <p>Year: {props.model.year} </p>
        <p>Search </p>
        <input type="text"/>
        <p>About </p>
      </div>
  );
}

export default NavBar;
