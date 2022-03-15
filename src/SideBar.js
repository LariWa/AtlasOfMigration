import React, { useEffect, useState, useLayoutEffect } from "react";
import Slider from "@mui/material/Slider";
import "./styles/sideBar.min.css";
import {
  ImmigrationButton,
  EmigrationButton,
  MigrationButton,
} from "./styles/components/Button.js";
import { CountryNameID } from "./const/CountryNameID";
import immigrationIcon from "./styles/icons/ImmigrationIcon.svg";
import emigrationIcon from "./styles/icons/EmigrationIcon.svg";
import migrationIcon from "./styles/icons/NetMigrationIcon.svg";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

/* immigration = 0, emigration = 1, net migration = 2 */
const information = [
  "Immigration is the international movement of people to a destination country of which they are not natives or where they do not possess citizenship in order to settle as permanent residents or naturalized citizens.",
  "Emigration is the act of leaving a resident country or place of residence with the intent to settle elsewhere (to permanently leave a country).",
  "Net migration is the difference between immigration into and emigration from the area during the year. Net migration is therefore negative when the number of emigrants exceeds the number of immigrants.",
  "Have you ever thought about why people migrate? Has time influenced our perception of migration? The Atlas of Migration is a visual tool that allows you to navigate through the increasingly complex landscape of international migration patterns.",
];

const headLine = ["Immigration", "Emigration", "Net Migration", "Welcome"];

function SideBar({
  model,
  year,
  setCountryID,
  countryID,
  setView,
  view,
  setScale,
  scale,
}) {
  const [input, setInput] = useState("");
  const [nbrChoices, setNbrChoices] = useState(0);
  const [selCountries, setSelCountries] = useState([]);
  const [detailView, setDetailView] =
    useState(false); /* false world , true detail*/
  const [value, setValue] = React.useState([0, 100]);
  const [name, setName] = useState(model.countryName);

  useEffect(() => {
    setName(model.countryName);
    setDetailView(model.countryID != 900);
  }, [view, year, countryID]);

  const searchCountry = (e) => {
    if (e.key === "Enter") {
      if (nbrChoices === 1) {
        setInput(selCountries[0].name);
        setDetailView(true);
        setCountryID(selCountries[0].id);
        console.log("detail", detailView);
        model.setCountryID(selCountries[0].id);
      }
    }
  };

  const onInput = (e) => {
    setInput(e.target.value);

    const filteredInput = CountryNameID.filter(
      (x) => x.name.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setNbrChoices(filteredInput.length);
    setSelCountries(filteredInput);
  };

  /*  I need to check so this is not clicking outside   */
  const changeView = (e) => {
    if (e.target.value) {
      //console.log(e.target.value);
      setView(e.target.value);
    }
  };

  function valuetext(value) {
    return `${value}`;
  }

  const handleChange = (event, newValue) => {
    setScale(newValue);
  };

  const formatResult = (item) => {
    return (
      <div>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </div>
    );
  };

  return (
    <div className="sideBar">
      {detailView && (
        <div>
          <button
            id="world"
            onClick={() => {
              setDetailView(false);
              model.setCountryID(900);
              setCountryID(900);
            }}
          >
            Back
          </button>
        </div>
      )}
      {detailView ? <h1> Country: {name} </h1> : <h1> {headLine[view]} </h1>}

      <h3> Year: {year} </h3>

      <div id="searchBox">
        <h2>What country are you looking for?</h2>
        {/*
        <input
          type="text"
          id="inputField"
          onChange={onInput}
          onKeyDown={searchCountry}
          value={input}
          placeholder="Search..."
        />
        <select name="countries" style={{ minWidth: 180 }}>
          {selCountries.map((x) => (
            <option key={x.id} value={x.name}>
              {" "}
              {x.name}{" "}
            </option>
          ))}
        </select>
*/}

        <div className="App">
          <header className="App-header">
            <div style={{ width: 300 }}>
              <ReactSearchAutocomplete
                items={CountryNameID}
                onSelect={(item) => {
                  setDetailView(true);
                  setCountryID(item.id);
                  model.setCountryID(item.id);
                }}
                formatResult={formatResult}
                maxResults={10}
                styling={{
                  backgroundColor: "#063140",
                  iconColor: "white",
                  color: "white",
                  borderRadius: "0px",
                  border: "0px solid #dfe1e5",
                }}
              />
            </div>
          </header>
        </div>
      </div>

      <div className="filter">
        {/*<h2>What do you want to know more about?</h2> */}
        <ImmigrationButton name={view} value="0" onClick={changeView}>
          <img src={immigrationIcon} />
          <br />
          Show Immigration
        </ImmigrationButton>
        <MigrationButton name={view} value="2" onClick={changeView}>
          <img src={migrationIcon} />
          <br />
          Show Net Migration
        </MigrationButton>
        <EmigrationButton name={view} value="1" onClick={changeView}>
          <img src={emigrationIcon} />
          <br />
          Show Emigration
        </EmigrationButton>
      </div>
      <p>{information[view]}</p>
      {!detailView && (
        <>
          <Slider
            id={`slider-${view != 3 ? view : "3"}`}
            className="slider"
            getAriaLabel={() => ""}
            value={scale}
            onChange={handleChange}
            getAriaValueText={valuetext}
          />
          <br />
          <label id="lower" className={`${view != 3 ? "" : "hide"}`}>
            {scale[0]}
          </label>
          <label id="upper" className={`${view != 3 ? "" : "hide"}`}>
            {scale[1]}
          </label>
        </>
      )}
    </div>
  );
}

export default SideBar;
