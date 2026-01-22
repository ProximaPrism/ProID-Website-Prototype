import { useMemo } from "react";
import { Link } from "react-router-dom";
import data from "../data/exhibitionsData.json" with { type: "json" };
import Rand from "rand-seed";

const getNextTime = (day, start, end, weekOffset) => {
  const now = new Date();

  let daysTo = (day - now.getDay() + 7) % 7;

  if (daysTo === 0 && now.getHours() >= end) daysTo = 7;

  const target = new Date(now);
  target.setDate(now.getDate() + daysTo + (weekOffset * 7 * 2));

  const startTime = new Date(target).setHours(start, 0, 0, 0);
  const endTime = new Date(target).setHours(end, 0, 0, 0);

  const adjustedStartTime = (weekOffset === 0 && daysTo === 0)
    ? Math.max(startTime, now.getTime())
    : startTime;

  const duration = Math.max(0, endTime - adjustedStartTime);

  const formatter = Intl.DateTimeFormat("en-SG", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return {
    unixTimestamp: Math.floor(adjustedStartTime / 1000),
    startTime: formatter.format(new Date(adjustedStartTime)),
    duration: Math.floor(duration / 3600000),
  };
};

export default function ExhibitionList() {
  // deterministic rng so that result is the same for everyone
  const exhibitions = useMemo(() => {
    const seed = new Rand("42");
    const day = 6;

    // this array length determines the amount of exhibitions to show
    return Array.from({ length: 3 }, (_, i) => {
      const index = Math.floor(seed.next() * data.locations.length);
      const location = data.locations[index];

      const offsetStart = Math.floor(seed.next() * 8);
      const offsetEnd = Math.floor(seed.next() * 2) + offsetStart;

      const time = getNextTime(day, 9 + offsetStart, 11 + offsetEnd, i);

      return {
        ...location,
        scheduledTime: `${time.startTime} (${time.duration} hours)`,
        uniqueId: `${location.id}-${time.unixTimestamp}`,
      };
    });
  }, []);

  return (
    <div className="grid grid-cols-1 place-items-center px-10">
      {exhibitions.map((item) => (
        <div
          key={item.uniqueId}
          className="card lg:card-side bg-base-100 shadow-md mb-10"
        >
          <figure>
            <img
              src={`/locations/${item.id}.png`}
              alt={item.name}
              className="max-w-xl"
            />
          </figure>
          <div className="card-body min-w-[25vw] flex-1 pr-10">
            <h2 className="card-title xl:text-3xl lg:text-2xl sm:text-3xl">
              {item.name}
            </h2>
            <div className="flex flex-col gap-0.5">
              <span className="text-lg">
                Grid Size: {item.size[0]} x {item.size[1]}
              </span>
              <span>{item.scheduledTime}</span>
            </div>
            <div className="card-actions">
              <Link
                to={`/exhibitions/${item.uniqueId}`}
                key={item.uniqueId}
                className="btn btn-ghost text-lg"
              >
                Vote!
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
