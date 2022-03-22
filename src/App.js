import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import SideBar from "./SideBar";
import TimeLine from "./TimeLine";
import "./App.css";
import "./styles/base.min.css";
import WorldMap from "./WorldMap";
import DataModel from "./DataModel";
import Start from "./Start";
import About from "./About";

const dataModel = new DataModel();

function App() {
  const [isTotalNumberView, setTotalNumberViewState] = useState("true");
  const [isPopulationView, setPopulationView] = useState(false);

  const [view, setViewState] = useState(3); //immigration = 0, emmigration 1, net migration=2, start=3
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState(false);
  const [pressed, setPressed] =
    useState(true); /* change this to false to make startpage stay open */
  const [year, setYear] = useState(dataModel.year); //just a hack to make components rerender on year change
  const [countryID, setCountryID] = useState(dataModel.countryID);
  const [scale, setScale] = useState([0, 100]);
  const [calculation, setCalculation] = useState(true); // total number = true, % = false
  const scaleValues = [
    //0 total number //1 population
    [
      [0, 10000000], //immigration
      [0, 10000000], //emigration
      [-10000000, 10000000], //net migration
    ],

    [
      [0, 30], //immigration
      [0, 30], //emigration
      [-30, 30], //net migration
      ,
    ],
  ];
  const [sliderValue, setSliderValue] = useState([0, 100]);

  dataModel.loadData().then(() => {
    ////console.log(dataModel.getTotalEmigration(300, 0))
    ////console.log(dataModel.getMigrationValueAll(900, 300));
    setLoading(false);
  });
  function setTotalNumberView(val) {
    if (val) {
      //console.log(val);
      setTotalNumberViewState(val);
      val = val === "true";
      setPopulationView(!val);
      if (view >= 0 && view <= 2) {
        if (val) {
          setScale(scaleValues[0][view]);
          setSliderValue(scaleValues[0][view]);
        } else {
          setScale(scaleValues[1][view]);
          setSliderValue(scaleValues[1][view]);
        }
      }
    }
  }
  function setView(val) {
    if (view && val) {
      //console.log("change" + val);
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
  //dataModel.getUNData().then( () => //console.log("Un data") )

  return (
    <div className="container">
      <About
        about={about}
        setAbout={setAbout}
        view={view}
      />
      <SideBar
        model={dataModel}
        year={year}
        setCountryID={setCountryID}
        setView={setView}
        view={view}
        setScale={setScale}
        scale={scale}
        countryID={countryID}
        setCalculation={setTotalNumberView}
        calculation={isTotalNumberView}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
      {loading || !pressed ? (
        <Start enter={setPressed} loading={loading} />
      ) : (
        <>
          <TimeLine
            model={dataModel}
            year={year}
            setYear={setYear}
            view={view}
          />
          <WorldMap
            filterValues={sliderValue}
            sliderValues={scale}
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
