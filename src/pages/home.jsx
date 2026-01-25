import { Link } from "react-router-dom";
import RepView from "../assets/representation.svg";
import InterestDMP from "../assets/youth-contribute.svg";
import InterestSG from "../assets/youth-contribute-sg.svg";

export default function Home() {
  return (
    <>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold">Exhibitions</h1>
            <p className="mb-5 text-lg">
              Bringing youths into the decision making of Singapore's future,
              together.
            </p>
            <Link to="/vote" aria-label="Vote" type="button" className="btn btn-lg btn-primary">
              Let your voice be heard!
            </Link>
          </div>
        </div>
      </div>
      <div className="hero bg-base-100 min-h-[50vh] justify-around px-8 py-4">
        <div className="hero-content flex-col lg:flex-row sm:gap-15">
          <div>
            <h1 className="text-5xl font-bold">About Exhibitons</h1>
            <p className="text-lg py-6">
              Exhibitions is a youth-for-youth initiative to get youths aged
              18-25 to be interested in the development of Singapore's urban
              future.
            </p>
            <p className="text-lg py-6 pb-0">
              We provide exhibitions catered primarily for youths through
              youth-oriented activities and technological interactions hosted
              all across Singapore.
            </p>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}about/proto1.png`}
            alt="exhibition example"
            className="max-w-lg rounded-lg shadow-xl"
          />
        </div>
      </div>
      <div className="hero bg-base-100 min-h-[50vh] justify-around px-8 py-4">
        <div className="hero-content flex-col lg:flex-row-reverse sm:gap-15">
          <div>
            <h1 className="text-4xl font-bold">
              Historical Flaws of the Draft Master Plan for Youths
            </h1>
            <p className="pb-0 text-lg py-6">
              From general interviews with youths around the public, we found
              that youths were not interested in urban planning initiatives like
              the Draft Master Plan 2025 (DMP2025) for multiple reasons:
            </p>
            <ul className="text-lg py-2">
              <li>• Not enough awareness of the events to youths</li>
              <li>• Majority of youths feel under-represented</li>
              <li>
                • Youths don't see how the plan will positively impact their
                daily lives
              </li>
            </ul>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}about/proto2.avif`}
            alt="exhibition example"
            className="max-w-lg rounded-lg shadow-xl"
          />
        </div>
      </div>
      <div className="bg-base-100 p-10">
        <div className="grid place-content-around">
          <h1 className="text-left text-5xl font-bold">
            However, youths <span className="text-primary">have</span> interest.
          </h1>
          <p className="text-lg py-6">
            Youths <span className="font-bold">want</span>{" "}
            to play a part in contributing to Singapore's urban planning
            initiatives. Through a survey from a group of 40 youths aged 18-25,
            we found that:
          </p>
        </div>
        <div className="grid place-items-center px-10">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <img
                  src={RepView}
                  className="inline-block stroke-current h-8 w-8"
                />
              </div>
              <div className="stat-title text-base-content text-lg">
                Views on Youth Representation
              </div>
              <div className="stat-value text-primary">90.0%</div>
              <div className="stat-desc text-primary font-bold text-xl">
                Somewhat Represented or Limited
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <img
                  src={InterestDMP}
                  className="inline-block stroke-current h-8 w-8"
                />
              </div>
              <div className="stat-title text-base-content text-lg">
                Interest in DMP2025
              </div>
              <div className="stat-value text-secondary">53.4%</div>
              <div className="stat-desc text-secondary font-bold text-xl">
                Interested or Very Interested
              </div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <img
                  src={InterestSG}
                  className="inline-block stroke-current h-8 w-8"
                />
              </div>
              <div className="stat-title text-base-content text-lg">
                Interest in contributing to Singapore
              </div>
              <div className="stat-value text-accent-content text-">70.0%</div>
              <div className="stat-desc text-accent-content font-bold text-xl">
                Interested or Very Interested
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero bg-base-100 min-h-[50vh] justify-around px-8 py-4">
        <div className="hero-content flex-col lg:flex-row sm:gap-15">
          <div>
            <h1 className="text-4xl font-bold">
              That's why we created Exhibitions.
            </h1>
            <p className="text-lg py-6 pb-0">
              Exhibitions allows youths to get to be motivated to play a role in
              shaping Singapore, by giving them the opportunity to{" "}
              <span className="font-bold">
                directly influence how our exhibitions will look
              </span>{" "}
              by voting on a design.
            </p>
            <p className="text-lg py-6 pb-0">
              This gives youths a real voice in decision-making, by showing that
              the{" "}
              <span className="font-bold">
                decisions that they make really matter
              </span>.
            </p>
          </div>
          <img
            src="/about/proto1.png"
            alt="exhibition example"
            className="max-w-lg rounded-lg shadow-xl"
          />
        </div>
      </div>
      <div className="h-px w-full bg-neutral shadow-lg"></div>
      <div className="hero bg-base-300 min-h-[50vh] justify-around px-8 py-4">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Why wait?
            </h1>
            <p className="text-lg py-6">
              Start your urban planning journey with us and see what you can do
              to shape Singapore's future.
            </p>
            <Link to="/vote" aria-label="Vote" type="button" className="btn btn-lg btn-primary">
              Let your voice be heard!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
