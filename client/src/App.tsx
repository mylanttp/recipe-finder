import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import "./App.css";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <div className="appLayout">
    <h1 className="pageTitle">Recipe Finder!</h1>

    <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/quiz" element={<Quiz />} />
    </Routes>
    </div>
  );
}

export default App;
