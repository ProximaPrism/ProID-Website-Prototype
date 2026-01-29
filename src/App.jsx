import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import Vote from "./pages/vote.jsx";
import FAQ from "./pages/faq.jsx";
import Navbar from "./components/navbar.jsx";
import ExhibitionListings from "./pages/listings.jsx";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/exhibitions/:uniqueId" element={<ExhibitionListings />} /> 
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
