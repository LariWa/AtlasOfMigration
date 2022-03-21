import React, { useEffect, useLayoutEffect } from "react";
import "./styles/about.min.css";
import icon from "./styles/icons/AtlasOfMigration.svg";

function About({ about, setAbout, view }) {
  useEffect(() => {}, [about]);

  const showAbout = (e) => {
    setAbout(true);
  };

  const hideAbout = (e) => {
    setAbout(false);
  };

  return (
    <div>
      {!about ? (
        <button
          className="about"
          id={`aboutButton-${view != 3 ? view : "3"}`}
          onClick={showAbout}
        >
          <div>
            <span>About</span>
            <br />
            Atlas of Migration
          </div>
          <img src={icon} />
        </button>
      ) : (
        <>
          <div className="blur"></div>
          <div className="about-container">
            <button onClick={hideAbout}>Back to application</button>
            <head>
              <title>About Atlas of Migration</title>
            </head>
            <body>
              <div>
                <h4> Who we are?</h4>
                <ul>
                  <li>
                    <p>
                      Fatemeh Bakhshoudeh. Role: Front-end development, UX
                      design and User test. Email:
                      <a href="fatemehb@kth.se">fatemehb@kth.se</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Navya Sanjna Joshi. Role: Front-end, UI/UX design, User
                      test. Email:
                      <a href="nawa@kth.se">nawa@kth.se</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Larissa wagnerberge. Role: Data handling and calculation,
                      back-end and front-end development. Email:
                      <a href="larissaw@kth.se">larissaw@kth.se</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Anna Neander. Role: Data handling and calculation,
                      back-end and front-end development. Email:
                      <a href="neander@kth.se">neander@kth.se</a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Andrea Made haner. Role: Front-end development and UI/UX
                      design. Email:
                      <a href="neander@kth.se">neander@kth.se</a>
                    </p>
                  </li>
                </ul>
                <p>
                  We are an international group of KTH students who are
                  motivated to fight misconceptions about the migration pattern
                  and trends. We implemented the “Atlas of Migration '' to
                  visually represent historical migration information of the
                  world and each country in detail (from 1990- 2020). The
                  platform can be used for explorative analysis. We defined this
                  project to learn more about implementation tools related to
                  information visualization via course{" "}
                  <a href=" https://www.kth.se/student/kurser/kurs/DH2321?l=en ">
                    {" "}
                    DH2321
                  </a>
                  .
                </p>
                <h4> What was Our goal?</h4>
                <p>
                  Based on Shnietherman’s “Mantra” we set our goal to build a
                  platform that provides a historical Overview of migration data
                  and enables users to perform Zooming and Filtering tasks and
                  view “More Details” if they will.
                </p>
                <h4>Data and API</h4>
                <p>
                  Data and API: We used the world migration data from
                  <a href=" https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/undesa_pd_2020_ims_stock_by_sex_destination_and_origin.xlsx ">
                    {" "}
                    The International Migration Stock{" "}
                  </a>
                  and the world population from UN data{" "}
                  <a href=" https://data.un.org/Data.aspx?q=population&d=PopDiv&f=variableID%3a12#PopDiv ">
                    {" "}
                    The UN Data{" "}
                  </a>
                </p>
                <h4>Calculations</h4>
                <p>
                  Net migration value is the difference between immigration into
                  and emigration from the area. Net migration is therefore
                  negative when the number of emigrants exceeds the number of
                  immigrants. To have a reasonable representation of the data we
                  calculated the net migration value based on the population of
                  each country.{" "}
                  <p>Net migration (total number) = Immigration - Emigration</p>{" "}
                  <p>
                    Net migration (% of population) = ( Net migration /
                    population ) * 100
                  </p>
                  <p>
                    We got inspiration from a previous project done within the
                    course in the 2021{" "}
                    <a href="https://agyllang.github.io/DH2321-POP.FLO/about">
                      {" "}
                      (POP.FLO){" "}
                    </a>
                    , to calculate net migration value as well as emigration,
                    immigration and net migration percentage.
                  </p>
                  <h4>What did we learn?</h4>
                  <p>
                    <ol>
                      <li>We gained a better knowledge of d3.js</li>
                      <li>
                        We managed to connect d3 with React in our project
                      </li>
                      <li>
                        We understood that we should have a Git manager in our
                        group
                      </li>
                      <li>
                        We understood that it is necessary to spend a reasonable
                        amount of time on finding a good dataset and
                        understanding it
                      </li>
                    </ol>
                  </p>
                  <h4>Refrences</h4>
                  <p>
                    [1] Shneiderman, Ben. "The eyes have it: A task by data type
                    taxonomy for information visualizations." In Visual
                    Languages, 1996. Proceedings., IEEE Symposium on, pp.
                    336-343. IEEE, 1996.
                  </p>
                  <p>
                    [2] Mazza, R. (2009). Introduction to Information
                    Visualization. London: Springer London, Limited.
                  </p>
                  <p>
                    [3] North, Chris (2012). Information Visualization. (2012).
                    Handbook of Human Factors and Ergonomics (4. Aufl.) ed.
                    Savendy, G. New York: Wiley.
                  </p>
                </p>
              </div>
            </body>
          </div>
        </>
      )}
    </div>
  );
}

export default About;
