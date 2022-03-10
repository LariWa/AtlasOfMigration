import React, {useState} from "react";
import * as d3 from "d3";
import SideBar from "./SideBar";
import TimeLine from "./TimeLine";
import "./App.css";
import WorldMap from "./WorldMap";
import DataModel from './DataModel';
import Start from './Start';



const dataModel = new DataModel()

function App() {
  const [view, setView] = useState(0); //immigration = 0, emmigration 1, net migration=2
  const [loading, setLoading] = useState(true);
  dataModel.getMigrationData()
  .then(() => {
    setLoading(false);
    console.log(dataModel.migrationData);
  })
  //console.log(dataModel.getMigrationValue(900, 900, 2020));


  return (
  <>
    {loading ? <Start/> :
    <div className = 'container'>
      <SideBar />
      <TimeLine model = {dataModel} />
      <WorldMap model = {dataModel} view = {view}/>
    </div>
    }
</>
  );
}

export default App;
