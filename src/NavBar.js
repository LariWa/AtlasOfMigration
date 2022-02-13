import React, {useEffect, useLayoutEffect} from "react";
import * as d3 from "d3";


/* just some test to see that d3 works*/
function NavBar() {

 let stat = 1;

 /*  use LayoutEffect() for updating d3 components? */
  useLayoutEffect(() => {
    d3.select(".nav").style("background-color", "magenta");
  }, []);

  const onMouseClick = () => {
    d3.selectAll(".nav").style("color", "yellow");
  };


  return (
    /* use svg element */
      <div className = "nav">
        <button> click!  </button>
        <h1>This could be a Navbar {stat}</h1>{" "}
        <p>And some text but not in a paragraph </p>{" "}
      </div>
  );
}

export default NavBar;