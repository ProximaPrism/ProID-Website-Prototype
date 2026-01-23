import { useMemo } from "react";
import { useParams } from "react-router-dom";
import data from "../data/exhibitionsData.json" with { type: "json" };

export default function ExhibitionVotePanel() {
  const { uniqueId } = useParams();
  const [locationId, unixTime, duration] = uniqueId.split("-");

  const location = useMemo(() => {
    return data.locations.find((loc) => loc.id === locationId);
  }, [locationId]);

  const startTime = useMemo(() => {
    if (!unixTime) return null;

    const formatter = Intl.DateTimeFormat("en-SG", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    const date = new Date(parseInt(unixTime) * 1000);
    return isNaN(date.getTime()) ? null : formatter.format(date);
  }, [unixTime]);

  return (
    <>
      {!location && (
        <div role="alert" className="alert alert-error m-2">
          <span className="text-error-content font-bold">
            Error: Unable to find locationId for this exhibition. Does this
            exhibition exist in the first place?
          </span>
        </div>
      )}
      <div className="bg-base-100 p-10">
        <div className="grid place-content-around">
          <h1 className="text-left text-5xl font-bold">
            Voting: <span className="text-4xl">{location.name}</span>
          </h1>
          <p className="text-lg py-6 pb-0">
            Time: {startTime} ({duration} hours)
          </p>
          <p className="text-sm pb-6">
            this data is really important
          </p>
        </div>
      </div>
    </>
  );
}
