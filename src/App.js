import React from "react";
import * as d3 from "d3";
import SideBar from "./SideBar";
import TimeLine from "./TimeLine";
import "./App.css";
import WorldMap from "./WorldMap";
import DataModel from './DataModel';
import Main from './Main';


const dataModel = new DataModel()
//dataModel.getCsvData()
//console.log((dataModel.jsondata))


function App() {
  return (
  <>
    <div className = 'container'>
      <SideBar />
      <TimeLine model = {dataModel} />
      <WorldMap model = {dataModel}/>
    </div>
</>
  );
}

export default App;
