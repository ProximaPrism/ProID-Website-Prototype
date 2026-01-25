import data from "../data/exhibitionsData.json" with { type: "json" };
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import BoothGrid from "./grid.jsx";

export default function BoothGridContainer() {
  const { uniqueId } = useParams();

  const [locationId] = uniqueId.split("-");

  const location = useMemo(() => {
    return data.locations.find(loc => loc.id === locationId);
  }, [locationId]);

  const boothTypes = data.booth_types;

  if (!location) {
    return <div>Location not found</div>;
  }

  if (!boothTypes || boothTypes.length === 0) {
    return <div>No booth types available</div>;
  }

  return (
    <div className="flex justify-center">
      <BoothGrid
        boothTypes={boothTypes}
        rows={location.size[0]}
        cols={location.size[1]}
        cellSize={64}
      />
    </div>
  );
}

