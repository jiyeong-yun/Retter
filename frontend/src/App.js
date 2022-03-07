import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Card from "./routes/Card";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/card" element={<Card />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
