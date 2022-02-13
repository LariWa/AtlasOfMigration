import { geoEqualEarth, geoPath } from "d3";

const projection = geoEqualEarth(); //TODO descide on projection
const path = geoPath(projection);
export const CountriesOutline = ({ data }) => (
  <g className="countries">
    {data.features.map((feature) => (
      <svg title={feature.properties.name} key={feature.properties.name}>
        <path
          onClick={() => console.log(feature.properties.name)}
          d={path(feature)}
        />
      </svg>
    ))}
  </g>
);
