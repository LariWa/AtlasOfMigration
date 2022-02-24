import React from "react";
import * as d3 from "d3";
import SideBar from "./SideBar";
import TimeLine from "./TimeLine";
import "./App.css";
import WorldMap from "./WorldMap";
import DataModel from './DataModel';


const dataModel = new DataModel()
//dataModel.getData().then(res => console.log(res));


function App() {
  return (
    <div className = 'container'>
      <SideBar />
      <WorldMap model = {dataModel}/>
      <TimeLine model = {dataModel} />
    </div>
  );
}

export default App;
