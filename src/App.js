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
  const [view, setViewState] = useState(3); //immigration = 0, emmigration 1, net migration=2, start=3
  const [loading, setLoading] = useState(true);
  const [pressed, setPressed] =
    useState(true); /* change this to false to make startpage stay open */
  const [year, setYear] = useState(dataModel.year); //just a hack to make components rerender on year change
  const [countryID, setCountryID] = useState(dataModel.countryID);
  const [scale, setScale] = useState([0, 100]);
  const [calculation, setCalculation] = useState(true); // total number = true, % = false
  const scaleValues = [
    //0 total number //1 population
    [
      [0, 50000000], //immigration
      [0, 50000000], //emigration
      [-11000000, 110000000], //net migration
    ],

    [
      [0, 90], //immigration
      [0, 100], //emigration
      [-50, 50], //net migration
      ,
    ],
  ];
  const [sliderValue, setSliderValue] = useState([0, 100]);

  dataModel.loadData().then(() => {
    //console.log(dataModel.getTotalEmigration(300, 0))
    //console.log(dataModel.getMigrationValueAll(900, 300));
    setLoading(false);
  });
  function setView(val) {
    if (view && val) {
      console.log("change" + val);
      setViewState(val);
      if (val >= 0 && val <= 2) {
        if (!isPopulationView) {
          setScale(scaleValues[0][val]);
          setSliderValue(scaleValues[0][val]);
        } else {
          setScale(scaleValues[1][val]);
          setSliderValue(scaleValues[1][val]);
        }
      }
    }
  }
  //dataModel.getUNData().then( () => console.log("Un data") )

  return (
    <div className="container">
      <SideBar
        model={dataModel}
        year={year}
        setCountryID={setCountryID}
        setView={setView}
        view={view}
        setScale={setScale}
        scale={scale}
        countryID={countryID}
        setCalculation={setCalculation}
        calculation={calculation}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
      {loading || !pressed ? (
        <Start enter={setPressed} loading={loading} />
      ) : (
        <>
          <TimeLine model={dataModel} setYear={setYear} view={view} />
          <WorldMap
            scale={sliderValue}
            countryId={countryID}
            setView={setView}
            model={dataModel}
            year={year}
            view={view}
            isPopulationView={isPopulationView}
            setCountryID={setCountryID}
          />
        </>
      )}
    </div>
  );
}

export default App;
