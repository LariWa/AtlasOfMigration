import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import SideBar from "./SideBar";
import TimeLine from "./TimeLine";
import "./App.css";
import WorldMap from "./WorldMap";
import DataModel from "./DataModel";
import Start from "./Start";

const dataModel = new DataModel();

function App() {
  const [isPopulationView, setPopulationView] = useState(true);
  const [view, setView] = useState(0); //immigration = 0, emmigration 1, net migration=2
  const [loading, setLoading] = useState(true);
  const [pressed, setPressed] =
    useState(true); /* change this to false to make startpage stay open */
  const [year, setYear] = useState(dataModel.year); //just a hack to make components rerender on year change
  const [countryID, setCountryID] = useState(dataModel.countryID);
  const [countryName, setCountryName] = useState(dataModel.countryName);

  dataModel.loadData().then(() => {
    //console.log(dataModel.getTotalEmigration(300, 0))
    //console.log(dataModel.getMigrationValueAll(900, 300));
    setLoading(false);
  });

  return (
    <>
      {loading || !pressed ? (
        <Start enter={setPressed} loading={loading} />
      ) : (
        <div className="container">
          <SideBar
            country={countryName}
            setCountryName={setCountryName}
            model={dataModel}
            year={year}
            setCountryID={setCountryID}
            setView={setView}
            view={view}
          />
          <TimeLine model={dataModel} setYear={setYear} />
          <WorldMap
            countryId={countryID}
            setCountryName={setCountryName}
            setCountryID={setCountryID}
            model={dataModel}
            year={year}
            view={view}
            isPopulationView={isPopulationView}
          />
        </div>
      )}
    </>
  );
}

export default App;
