import { CountriesOutline } from "./CountiresOutline";
import { useMapData } from "./useMapData";
const width = 960;
const height = 500;
function WorldMap() {
  const data = useMapData();
  console.log(data);
  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <svg width={width} height={height}>
      <CountriesOutline data={data} />
    </svg>
  );
}
export default WorldMap;
