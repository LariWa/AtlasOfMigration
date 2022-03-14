import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import SideBar from "./SideBar";
import TimeLine from "./TimeLine";
import "./App.css";
import "./styles/base.min.css";
import WorldMap from "./WorldMap";
import DataModel from "./DataModel";
import Start from "./Start";

const dataModel = new DataModel();

function App() {
  const [isPopulationView, setPopulationView] = useState(true);
  const [view, setView] = useState(3); //immigration = 0, emmigration 1, net migration=2, start=3
  const [loading, setLoading] = useState(true);
  const [pressed, setPressed] =
    useState(true); /* change this to false to make startpage stay open */
  const [year, setYear] = useState(dataModel.year); //just a hack to make components rerender on year change
  const [countryID, setCountryID] = useState(dataModel.countryID);
  const [scale, setScale] = useState([0, 100]);

  dataModel.loadData().then(() => {
    //console.log(dataModel.getTotalEmigration(300, 0))
    //console.log(dataModel.getMigrationValueAll(900, 300));
    setLoading(false);
  });

  //dataModel.getUNData().then( () => console.log("Un data") )

  return (
    <>
      {loading || !pressed ? (
        <Start enter={setPressed} loading={loading} />
      ) : (
        <div className="container">
          <SideBar
            model={dataModel}
            year={year}
            setCountryID={setCountryID}
            setView={setView}
            view={view}
            setScale={setScale}
            scale={scale}
          />
          <TimeLine model={dataModel} setYear={setYear} />
          <WorldMap
            scale={scale}
            model={dataModel}
            year={year}
            view={view}
            isPopulationView={isPopulationView}
            setCountryID={setCountryID}
          />
        </div>
      )}
    </>
  );
}

export default App;
