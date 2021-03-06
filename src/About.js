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
          <div className="about-container" target="_blank">
            <button className="back" onClick={hideAbout}>
              Back to application
            </button>
            <div className="about-content" target="_blank">
              <p>
                <h1> Atlas of Migration</h1>{" "}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/iZX_VmzbT3w"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; 
            encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </p>
              <h4> Who we are?</h4>
              <p>
                <ul>
                  <li>
                    Fatemeh Bakhshoudeh from Iran - Role: Front-end development,
                    UX design and User test. Email:{" "}
                    <a href="fatemehb@kth.se" target="_blank">
                      fatemehb@kth.se
                    </a>
                  </li>
                  <li>
                    Navya Sanjna Joshi from India - Role: Front-end, UI/UX
                    design, User test. Email:{" "}
                    <a href="nawa@kth.se" target="_blank">
                      nawa@kth.se
                    </a>
                  </li>
                  <li>
                    Larissa Wagnerberger from Germany - Role: Data handling and
                    calculation, back-end and front-end development. Email:{" "}
                    <a href="larissaw@kth.se" target="_blank">
                      larissaw@kth.se
                    </a>
                  </li>
                  <li>
                    Anna Neander from Austria - Role: Data handling and
                    calculation, back-end and front-end development. Email:{" "}
                    <a href="neander@kth.se" target="_blank">
                      neander@kth.se
                    </a>
                  </li>
                  <li>
                    Andrea Maderthaner from Sweden- Role: Front-end development
                    and UI/UX design. Email:{" "}
                    <a href="andmad@kth.se" target="_blank">
                      andmad@kth.se
                    </a>
                  </li>
                </ul>
              </p>
              <br />
              <p>
                We are an international group of KTH students who are motivated
                to fight misconceptions about the migration pattern and trends.
                We implemented the ???Atlas of Migration" to visually represent
                historical migration information of the world and each country
                in detail (from 1990- 2020). The platform can be used for
                explorative analysis. We defined this project to learn more
                about implementation tools related to information visualization
                via course{" "}
                <a
                  href=" https://www.kth.se/student/kurser/kurs/DH2321?l=en "
                  target="_blank"
                >
                  {" "}
                  DH2321
                </a>
                . We got inspirations from research papers about story telling
                [1] and visualizing of migration data [2-3].
              </p>
              <h4> What was our goal?</h4>
              <p>
                Based on Shnietherman's Mantra [4]: "Overview first, zoom and
                filter, details on demand", we set our goal to build a platform
                which provides a historical overview of migration information,
                enables users to perform zooming and filtering tasks, and view
                more Details if they will.
              </p>
              <h4>Data and API</h4>
              <p>
                We used the
                <a
                  href=" https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/undesa_pd_2020_ims_stock_by_sex_destination_and_origin.xlsx "
                  target="_blank"
                >
                  {" "}
                  The International Migration Stock{" "}
                </a>
                [5] and the{" "}
                <a
                  href=" https://data.un.org/Data.aspx?q=population&d=PopDiv&f=variableID%3a12#PopDiv "
                  target="_blank"
                >
                  world population
                </a>{" "}
                [6] data from the UN.
              </p>
              <h4>Calculations</h4>
              <p>
                Net migration value is the difference between immigration into
                and emigration from the area. Net migration is therefore
                negative when the number of emigrants exceeds the number of
                immigrants. To also have a reasonable representation of the data
                we calculated the net migration value based on the population of
                each country.{" "}
                <p>Net migration (total number) = Immigration - Emigration</p>{" "}
                <p>
                  Regarding the net migration we got inspiration from a previous
                  project done within the course in the 2021{" "}
                  <a
                    href="https://agyllang.github.io/DH2321-POP.FLO"
                    target="_blank"
                  >
                    {" "}
                    (POP.FLO)
                  </a>
                </p>
              </p>
              <h4>What did we learn?</h4>
              <p>
                <ol>
                  <li>We learned how to handle and visualize complex data</li>
                  <li>We gained a better knowledge of d3.js and React</li>
                  <li>
                    We understood that we should have a Git manager in our group
                  </li>
                  <li>
                    We understood that it is necessary to spend a reasonable
                    amount of time on finding a good dataset and understanding
                    it
                  </li>
                </ol>
              </p>
              <h4>What tools did we use?</h4>
              <p>
                <ol>
                  <li>React [7]</li>
                  <li>d3 [8]</li>
                  <li>d3-geo [9]</li>
                  <li>d3-tip [10]</li>
                  <li>topojson [11]</li>
                </ol>
              </p>
              <h4>References</h4>

              <p>
                [1] Liem, J., Perin, C. and Wood, J. (2020), Structure and
                Empathy in Visual Data Storytelling: Evaluating their Influence
                on Attitude. Computer Graphics Forum, 39: 277-289.
                <a href="https://doi.org/10.1111/cgf.13980" target="_blank">
                  {" "}
                  https://doi.org/10.1111/cgf.13980
                </a>{" "}
                [Accessed 22.03.14]{" "}
              </p>
              <p>
                [2] Risam, R. (2019). Beyond the migrant ???problem???: Visualizing
                global migration. Television & New Media, 20(6), 566-580.{" "}
              </p>
              <p>
                [3] Dominguez, D., Soria, P., Gonz??lez, M., Rodr??guez, F. B., &
                S??nchez, ??. (2019, April). A Classification and Data
                Visualization Tool Applied to Human Migration Analysis. In 2019
                Sixth International Conference on eDemocracy & eGovernment
                (ICEDEG) (pp. 256-261). IEEE.{" "}
              </p>
              <p>
                [4] Shneiderman, Ben. "The eyes have it: A task by data type
                taxonomy for information visualizations." In Visual Languages,
                1996. Proceedings., IEEE Symposium on, pp. 336-343. IEEE, 1996.
              </p>
              <p>
                [5] ???International Migrant Stock | Population Division.???
                <a
                  href=" https://www.un.org/development/desa/pd/content/international-migrant-stock"
                  target="_blank"
                >
                  https://www.un.org/development/desa/pd/content/international-migrant-stock
                  (accessed Feb. 11, 2022).{" "}
                </a>
                (accessed Mar. 23, 2022).
              </p>
              <p>
                [6] ???UNdata | record view | Total population, both sexes
                combined (thousands).???
                <a
                  href="https://data.un.org/Data.aspx?q=population&d=PopDiv&f=variableID%3a12#PopDiv"
                  target="_blank"
                >
                  {" "}
                  https://data.un.org/Data.aspx?q=population&d=PopDiv&f=variableID%3a12#PopDiv
                </a>
                (accessed Mar. 23, 2022).
              </p>
              <p>
                [7] ???React ??? A JavaScript library for building user interfaces.???{" "}
                <a href="https://reactjs.org/" target="_blank">
                  https://reactjs.org/{" "}
                </a>{" "}
                (accessed Mar. 22, 2022).
              </p>
              <p>
                [8] M. Bostock, ???D3.js - Data-Driven Documents.???
                <a href="https://d3js.org/" target="_blank">
                  https://d3js.org/{" "}
                </a>{" "}
                (accessed Mar. 22, 2022).{" "}
              </p>
              <p>
                [9] d3-geo. D3, 2022. Accessed: Mar. 22, 2022. [Online].
                Available:{" "}
                <a href="https://github.com/d3/d3-geo" target="_blank">
                  https://github.com/d3/d3-geo
                </a>
              </p>
              <p>
                [10] J. Palmer, d3.tip: Tooltips for d3.js visualizations. 2022.
                Accessed: Mar. 22, 2022. [Online]. Available:{" "}
                <a href="https://github.com/caged/d3-tip" target="_blank">
                  https://github.com/caged/d3-tip
                </a>
              </p>
              <p>
                [11] TopoJSON. TopoJSON, 2022. Accessed: Mar. 22, 2022.
                [Online]. Available:{" "}
                <a href="https://github.com/topojson/topojson" target="_blank">
                  https://github.com/topojson/topojson
                </a>
              </p>
              {/* would need reference in text */}
              {/* <p>
                  [2] Mazza, R. (2009). Introduction to Information
                  Visualization. London: Springer London, Limited.
                </p>
                <p>
                  [3] North, Chris (2012). Information Visualization. (2012).
                  Handbook of Human Factors and Ergonomics (4. Aufl.) ed.
                  Savendy, G. New York: Wiley.
                </p> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default About;
