import React, { useEffect, useState, useLayoutEffect } from "react";
import Slider from "@mui/material/Slider";
import Legend from "./Legend";
import "./styles/sideBar.min.css";
import {
  ImmigrationButton,
  EmigrationButton,
  MigrationButton,
  CalculationButton,
} from "./styles/components/Button.js";
import { CountryNameID } from "./const/CountryNameID";
import immigrationIcon from "./styles/icons/ImmigrationIcon.svg";
import emigrationIcon from "./styles/icons/EmigrationIcon.svg";
import migrationIcon from "./styles/icons/NetMigrationIcon.svg";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

/* immigration = 0, emigration = 1, net migration = 2 */
const information = [
  "Immigration is the international movement of people to a destination country of which they are not natives or where they do not possess citizenship in order to settle as permanent residents.",
  "Emigration is the act of leaving a resident country or place of residence with the intent to settle elsewhere (to permanently leave a country).",
  "Net migration is the difference between immigration into and emigration from the area. Net migration is therefore negative when the number of emigrants exceeds the number of immigrants.",
  "The Atlas of Migration is a visual tool that allows you to navigate through the increasingly complex landscape of international migration patterns.",
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
  calculation,
  setCalculation,
  sliderValue,
  setSliderValue,
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
  }, [view, year, countryID, calculation]);

  const searchCountry = (e) => {
    if (e.key === "Enter") {
      if (nbrChoices === 1) {
        setInput(selCountries[0].name);
        setDetailView(true);
        setCountryID(selCountries[0].id);
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
      setView(e.target.value);
    } else if (e.target.closest("button").value) {
      setView(e.target.closest("button").value);
    }
  };

  function valuetext(value) {
    return `${value}`;
  }

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const changeCalculation = (e) => {
    setCalculation(e.target.value);
  };

  const formatResult = (item) => {
    return (
      <div className="result">
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </div>
    );
  };

  const showImmigrationCountries = () => {
    let country = countryID;
    let countries = model.getImmigrantionCountries(country);
    const html = [];
    countries.forEach((value) =>
      html.push(<li key={value.id}>{value.name}</li>)
    );
    return html;
  };

  const showEmigrationCountries = () => {
    let country = countryID;
    let countries = model.getEmigrantionCountries(country);
    const html = [];
    countries.forEach((value) =>
      html.push(<li key={value.id}>{value.name}</li>)
    );
    return html;
  };

  const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }
  var minLabel = view == 2 ? "<" : "";
  var marks = [
    {
      value: scale[0],
      label: (view == 2 ? "<" : "") + kFormatter(scale[0]),
    },
    {
      value: scale[1],
      label: ">" + kFormatter(scale[1]),
    },
    {
      value: ((scale[1] - scale[0]) / 4 + scale[0]) * 1,
      label: kFormatter(((scale[1] - scale[0]) / 4 + scale[0]) * 1),
    },
    {
      value: ((scale[1] - scale[0]) / 4) * 2 + scale[0],
      label: kFormatter(((scale[1] - scale[0]) / 4) * 2 + scale[0]),
    },
    {
      value: ((scale[1] - scale[0]) / 4) * 3 + scale[0],
      label: kFormatter(((scale[1] - scale[0]) / 4) * 3 + scale[0]),
    },
  ];
  return (
    <div className="sideBar">
      {detailView && (
        <div>
          <button
            id="world"
            className={`backButton-${view != 3 ? view : "3"}`}
            onClick={() => {
              setDetailView(false);
              model.setCountryID(900);
              setCountryID(900);
            }}
          >
            {/*Back to*/} World View
          </button>
        </div>
      )}
      {detailView ? (
        <h1 className="country"> {name} </h1>
      ) : (
        <h1> {headLine[view]} </h1>
      )}

      {detailView && view == 0 && (
        <div>
          <h2>Top 5 Immigration Destinations</h2>
          <ul>{showImmigrationCountries()}</ul>
        </div>
      )}

      {detailView && view == 1 && (
        <div>
          <h2>Top 5 Emigration Destinations</h2>
          <ul>{showEmigrationCountries()}</ul>
        </div>
      )}

      {detailView ? "" : <p>{information[view]}</p>}

      {!detailView && (
        <div id="searchBox">
          <h2>What country are you looking for?</h2>
          <ReactSearchAutocomplete
            items={CountryNameID}
            onSelect={(item) => {
              setDetailView(true);
              setCountryID(item.id);
              model.setCountryID(item.id);
            }}
            formatResult={formatResult}
            maxResults={3}
            styling={{
              backgroundColor: "transparent",
              color: "white",
              iconColor: "#EEEEEE",
              borderRadius: "0px",
              border: "0px solid transparent",
            }}
          />
        </div>
      )}

      <div className="filter">
        {view == 3 || detailView ? (
          <h2>What do you want to know more about?</h2>
        ) : (
          ""
        )}
        <ImmigrationButton name={view} value="0" onClick={changeView}>
          <img src={immigrationIcon} />
          <br />
          {/*Show */}
          Immigration
          <br />
          <br />
        </ImmigrationButton>
        <MigrationButton name={view} value="2" onClick={changeView}>
          <img src={migrationIcon} />
          <br />
          {/*Show*/}Net Migration
        </MigrationButton>
        <EmigrationButton name={view} value="1" onClick={changeView}>
          <img src={emigrationIcon} />
          <br />
          {/*Show*/}Emigration
          <br />
          <br />
        </EmigrationButton>
      </div>

      {view != 3 && (
        <div className="calculationMode">
          <h2>{/*Choose calculation mode:*/}</h2>
          <CalculationButton
            name={calculation.toString()}
            onClick={changeCalculation}
            value="true"
            className={view}
          >
            Total Numbers
          </CalculationButton>
          <CalculationButton
            name={calculation.toString()}
            onClick={changeCalculation}
            value="false"
            className={view}
          >
            % of Population
          </CalculationButton>
        </div>
      )}

      {!detailView && view != 3 && (
        <>
          <Slider
            id={`slider-${view != 3 ? view : "3"}`}
            className={calculation}
            getAriaLabel={() => ""}
            value={sliderValue}
            min={scale[0]}
            max={scale[1]}
            sx={{
              "& .MuiSlider-markLabel": {
                "font-size": "12px",
                color: "#eee",
                "margin-top": "-10px",
                "font-family":
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
              },
            }}
            marks={marks}
            onChange={handleChange}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => numberWithComma(value)}
          />
          <br />
          {/* <label id="lower" className={`${view != 3 ? "" : "hide"}`}>
            {view == 2 ? "<" : ""}
            {kFormatter(scale[0])}
          </label>
          <label id="upper" className={`${view != 3 ? "" : "hide"}`}>
            {">"}
            {kFormatter(scale[1])}
          </label> */}
          <Legend />
        </>
      )}
    </div>
  );
}

export default SideBar;
