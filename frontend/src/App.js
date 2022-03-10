import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Card from "./routes/Card";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/card" element={<Card />}></Route>
        <Route path="/result/:id" element={<Detail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
