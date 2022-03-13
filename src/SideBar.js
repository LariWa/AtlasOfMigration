import React, {useEffect, useState, useLayoutEffect} from "react";
import * as d3 from "d3";
import "./styles/sideBar.min.css";
import { CountryNameID } from "./const/CountryNameID";

function SideBar({country, year, setCountryID}) {
  const [input, setInput] = useState('')
  const [nbrChoices, setNbrChoices] = useState(0)
  const [selCountry, setSelCountry] = useState([])

 useEffect(() => {
   // console.log("effect", year)
   // console.log("effect", country)

 }, [year, country]);

  const  searchCountry = (e) => {
    if (e.key === 'Enter'){
      console.log(input);
      if (nbrChoices === 1){
          console.log("country matched");
          //console.log(selCountry);
          console.log(selCountry[0].id);
          setCountryID(selCountry[0].id)

      }
    }
  };


 const onInput = (e)=> {
   setInput(e.target.value) //currentTarget

   const filteredInput = CountryNameID.filter(
     x =>
       x.name.toLowerCase().indexOf(input.toLowerCase()) > -1
   );
    console.log(filteredInput.length);
    filteredInput.map(x => console.log(x.name));
    setNbrChoices(filteredInput.length)
    setSelCountry(filteredInput)
 }


  return (
      <div className="sideBar">
        <h1>World Overview</h1>
        <h3> Country: {country} </h3>
        <h3> Year: {year} </h3>
        <div id="searchBox" >
          <label>Search for Country</label><br/>
          <input type="text"
          id="inputField"
          onChange = {onInput}
          onKeyDown = {searchCountry}
          placeholder="Search.."/>
        </div>

        <h2>Explanation</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et enim blandit, ultricies sem at, auctor nisl. Nunc eget lorem quis nunc auctor posuere. Sed enim nisi, luctus eu laoreet eu, condimentum non erat. Etiam venenatis erat vel tempor tincidunt. Aliquam mattis, purus eget venenatis ornare, felis nisi placerat lorem, a viverra justo nisl eu urna.</p>

        <div className="filter">
          <button>Show Immigration</button>
          <button>Show Net Migration</button>
          <button>Show Emigration</button>
        </div>
      </div>
  );
}

export default SideBar;
