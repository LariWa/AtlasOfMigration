import React from "react";
import * as d3 from "d3";
import NavBar from "./NavBar";
import TimeLine from "./TimeLine";
import "./App.css";
import WorldMap from "./WorldMap";
import DataModel from './DataModel';
import Main from './Main';


const dataModel = new DataModel()
dataModel.getCsvData()
//console.log((dataModel.jsondata))


function App() {
  return (
  <>
    <div className = 'container'>
      <NavBar model = {dataModel}/>
      <WorldMap model = {dataModel}/>
    </div>
  <TimeLine width = '500px' heigth ='100px' model = {dataModel} />
</>
  );
}

export default App;
