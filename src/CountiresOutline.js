import { geoEqualEarth, geoPath } from "d3";
import * as d3 from "d3";

const projection = geoEqualEarth(); //TODO descide on projection
const path = geoPath(projection);
export const CountriesOutline = ({ data }) => (
  <g className="countries">
    {data.features.map((feature) => (
      <svg title={feature.properties.name} key={feature.properties.name}>
        <path
          className="countryOutline"
          onClick={() => console.log(feature.properties.name)}
          onMouseOver={mouseOver}
          onMouseLeave={mouseLeave}
          d={path(feature)}
        />
      </svg>
    ))}
  </g>
);
let mouseOver = function (event) {
  console.log(this);
  d3.selectAll(".countryOutline")
    .transition()
    .duration(200)
    .style("opacity", 0.5);
  d3.select(event.target)
    .transition()
    .duration(200)
    .style("opacity", 1)
    .style("stroke", "black");
};

let mouseLeave = function (d) {
  d3.selectAll(".countryOutline")
    .transition()
    .duration(200)
    .style("opacity", 0.8);
  d3.select(this).transition().duration(200).style("stroke", "transparent");
};
