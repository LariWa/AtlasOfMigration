import React from "react";
import * as d3 from "d3";
import NavBar from "./NavBar";
import TimeLine from "./TimeLine";
import "./App.css";
import WorldMap from "./WorldMap";
import DataModel from './DataModel';


const dataModel = new DataModel()
//dataModel.getData().then(res => console.log(res));


function App() {
  return (
    <div className = 'container'>
      <NavBar />
      <WorldMap model = {dataModel}/>
      <TimeLine model = {dataModel} />
    </div>
  );
}

export default App;
