import React, { useEffect, useLayoutEffect } from "react";
import "./styles/about.min.css";
import icon from "./styles/icons/AtlasOfMigration.svg";

function About({ about, setAbout, view }) {

  useEffect(() => {
  }, [about]);

  const showAbout = (e) => {
    setAbout(true);
  };

  const hideAbout = (e) => {
    setAbout(false);
  };

  return (
    <div>
    {!about ? (
      <button className="about" id={`aboutButton-${view != 3 ? view : "3"}`} onClick={showAbout}>
        <div>
        <span>About</span>
        <br/>Atlas of Migration
        </div>
        <img src={icon}/>
      </button>
    ) : (
      <>
        <div className="blur"></div>
        <div className="about-container">
        <button onClick={hideAbout}>Back to application</button>
        //@fatemeh: code inbetween here










        // -----------------------------------
        </div>
      </>
    )}

    </div>
  );
}

export default About;
