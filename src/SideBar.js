import React, { useEffect, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import "./styles/sideBar.min.css";
import { CountryNameID } from "./const/CountryNameID";

/* immigration = 0, emigration = 1, net migration = 2 */
const information = [
  "Immigration is the international movement of people to a destination country of which they are not natives or where they do not possess citizenship in order to settle as permanent residents or naturalized citizens.",
  "Emigration is the act of leaving a resident country or place of residence with the intent to settle elsewhere (to permanently leave a country).",
  "Net migration is the difference between immigration into and emigration from the area during the year. Net migration is therefore negative when the number of emigrants exceeds the number of immigrants.",
];
const headLine = ["Immigration", "Emigration", "Net Migration"];

function SideBar({ country, model, year, setCountryID, setView, view }) {
  const [input, setInput] = useState("");
  const [nbrChoices, setNbrChoices] = useState(0);
  const [selCountries, setSelCountries] = useState([]);

  useEffect(() => {
    // console.log("effect", year)
    // console.log("effect", country)
  }, [view, year, country]);

  const searchCountry = (e) => {
    if (e.key === "Enter") {
      //console.log(input);
      if (nbrChoices === 1) {
        setInput(selCountries[0].name);
        console.log("country matched");
        //console.log(selCountry);
        console.log(selCountries[0].id);
        setCountryID(selCountries[0].id);
        model.setCountryID(selCountries[0].id);
      }
    }
  };

  const onInput = (e) => {
    setInput(e.target.value); //currentTarget

    const filteredInput = CountryNameID.filter(
      (x) => x.name.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    //console.log(filteredInput.length);
    //filteredInput.map(x => console.log(x.name));
    setNbrChoices(filteredInput.length);
    setSelCountries(filteredInput);
  };

  const changeView = (e) => {
    console.log(e.target.id);
    if (e.target.id === "im") setView(0);
    if (e.target.id === "em") setView(1);
    if (e.target.id === "net") setView(2);
  };

  return (
    <div className="sideBar">
      <h2>{headLine[view]}</h2>
      <p>{information[view]}</p>
      <div className="filter">
        <button id="im" onClick={changeView}>
          {" "}
          Show Immigration{" "}
        </button>
        <button id="net" onClick={changeView}>
          {" "}
          Show Net Migrationon{" "}
        </button>
        <button id="em" onClick={changeView}>
          {" "}
          Show Emigrationon{" "}
        </button>
      </div>
      <h3> Year: {year} </h3>
      <h3> Country: {country} </h3>
      <div id="searchBox">
        <label>Search for Country</label>
        <br />
        <input
          type="text"
          id="inputField"
          onChange={onInput}
          onKeyDown={searchCountry}
          value={input}
          placeholder="Search.."
        />
        <select name="countries" style={{ minWidth: 180 }}>
          {selCountries.map((x) => (
            <option key={x.id} value={x.name}>
              {" "}
              {x.name}{" "}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SideBar;
