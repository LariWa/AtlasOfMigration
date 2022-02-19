import React from "react";
import * as d3 from "d3";
import NavBar from "./NavBar";
import Test from "./Test";
import "./App.css";
import WorldMap from "./WorldMap";

function App() {
  return (
    <div className = 'container'>
      <NavBar />
      <WorldMap />
      <Test />
    </div>
  );
}

export default App;
