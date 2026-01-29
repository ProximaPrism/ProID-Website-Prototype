import { useMemo } from "react";
import { Link } from "react-router-dom";
import data from "../data/exhibitionsData.json" with { type: "json" };
import Rand from "rand-seed";

const getNextTime = (day, start, end, weekOffset) => {
  const now = new Date();

  let daysTo = (day - now.getDay() + 7) % 7;

  if (daysTo === 0 && now.getHours() >= end) daysTo = 7;

  const target = new Date(now);
  target.setDate(now.getDate() + daysTo + (weekOffset * 7 * 2)); // every 2 weeks

  const startTime = new Date(target).setHours(start, 0, 0, 0);
  const endTime = new Date(target).setHours(end, 0, 0, 0);

  if (startTime >= endTime) return;

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
    const count = 3;
    const selectedIndex = new Set();
    const result = [];

    // allows sequential exhibitions after date, i.e. exhibition B at 2nd top becomes the top as A passes
    const now = new Date();
    const timeRef = new Date("2026-01-03T09:00:00");
    const weeksSinceTimeRef = Math.floor((now - timeRef) / 604800000);

    // advance the seed for sequential exhibition listing
    for (let i = 0; i < weeksSinceTimeRef; i++) seed.next();

    // this array length determines the amount of exhibitions to show
    while (result.length < count) {
      const index = Math.floor(seed.next() * data.locations.length);

      if (selectedIndex.has(index)) continue;

      selectedIndex.add(index);
      const location = data.locations[index];

      const time = getNextTime(
        day,
        9,
        12,
        result.length,
      );

      if (time.unixTimestamp * 1000 <= now.getTime()) continue;

      result.push({
        ...location,
        scheduledTime: `${time.startTime} (${time.duration} hours)`,
        uniqueId: `${location.id}-${time.unixTimestamp}-${time.duration}`,
      });
    }
    return result;
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
              src={`${import.meta.env.BASE_URL}/locations/${item.id}.png`}
              alt={item.name}
              className="max-w-xl"
            />
          </figure>
          <div className="items-start card-body min-w-[30vw] flex-1 pr-5 gap-0.5">
            <span className="card-title 2xl:text-4xl xl:text-3xl lg:text-2xl sm:text-3xl">
              {item.name}
            </span>
            <span className="2xl:text-xl text-lg">
              Grid Size: {item.size[0]} x {item.size[1]}
            </span>
            <span className="2xl:text-base xl:text-md lg:text-sm sm:text-md">
              {item.scheduledTime}
            </span>
            <div className="card-actions justify-end ml-auto mt-auto">
              <Link
                to={`/exhibitions/${item.uniqueId}`}
                key={item.uniqueId}
                className="btn btn-primary text-lg w-30"
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
