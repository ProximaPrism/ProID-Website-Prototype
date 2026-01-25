import { HashRouter as Router, Route, Routes, HashRouter } from "react-router-dom";
import Home from "./pages/home.jsx";
import Vote from "./pages/vote.jsx";
import FAQ from "./pages/faq.jsx";
import Navbar from "./components/navbar.jsx";
import ExhibitionVotePanel from "./pages/exhibition.jsx";

function App() {
  return (
    <>
      <HashRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/exhibitions/:uniqueId" element={<ExhibitionVotePanel />} /> 
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
