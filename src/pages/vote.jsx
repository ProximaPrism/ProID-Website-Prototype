import ExhibitionList from "../components/exhibitions.jsx";

export default function Vote() {
  return (
    <>
      <div className="bg-base-100 p-10">
        <div className="grid place-content-around">
          <h1 className="text-left text-5xl font-bold">
            <span className="text-primary">Play a part</span>{" "}
            in our exhibitions.
          </h1>
          <p className="text-lg py-6 pb-0">
            You can decide on how the layouts of our upcoming exhibitions. We
            host all across Singapore, so come back and vote if we ever stop
            near you!
          </p>
          <p className="text-sm pb-6">
            The finalized design for each exhibition is obtained using
            specialized algorithms in grouping the grid layouts together. For
            more info, see our FAQ page.
          </p>
        </div>
      </div>
      <ExhibitionList />
    </>
  );
}
