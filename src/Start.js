import React, {useEffect, useLayoutEffect} from "react";
//import * as d3 from "d3";


/* just some test to see that d3 works*/
function Start() {

 let stat = 1;

 /*  use LayoutEffect() for updating d3 components? */
  useLayoutEffect(() => {
    //d3.select(".nav").style("background-color", "red");
  }, []);

  const onMouseClick = () => {
    console.log('enter app');
    //enter app
  };


  return (

      <div className = ".start"   width = '100%' height = '100%' >
        <h1>Welcome to the app year 1990 info...</h1>
        <button onClick = {onMouseClick()}>
          Start Exploring</button>

      </div>
  );
}

export default Start;
